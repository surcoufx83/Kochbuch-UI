import { HttpStatusCode } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularDeviceInformationService } from 'angular-device-information';
import { formatDistanceToNow, formatDuration } from 'date-fns';
import { Subscription } from 'rxjs';
import { attentionIcon, cameraIcon, pictureUploadIcon, privacyIcon, spinnerIcon } from 'src/app/common/icons';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { RecipeEditReply, SharedDataService } from 'src/app/svc/shared-data.service';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-ai-editor',
  templateUrl: './ai-editor.component.html',
  styleUrls: ['./ai-editor.component.scss']
})
export class AiEditorComponent implements OnDestroy, OnInit {

  aiReplyMessage: string = '';
  acceptMimeTypes: string;
  busy: boolean = false;
  isMobile: boolean;
  loading: boolean = false;
  private routeSub?: Subscription;
  private recipeId?: number;
  recipe?: Recipe;
  showStillBusyMessage: boolean = false;
  stillBusyColor: string = 'rgb(20, 21, 20)';
  user?: UserAccount;
  private uploadStart?: number;
  uploadDuration: string = '';
  private userSub?: Subscription;

  attentionIcon = attentionIcon;
  cameraIcon = cameraIcon;
  pictureUploadIcon = pictureUploadIcon;
  privacyIcon = privacyIcon;
  spinnerIcon = spinnerIcon;
  stillBusyIcon = 'far fa-face-smile-beam fa-bounce';

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
    private dataService: SharedDataService,
    private router: Router,
    private route: ActivatedRoute,
    deviceInfo: AngularDeviceInformationService,
  ) {
    this.acceptMimeTypes = this.dataService.acceptedUploadMimetypes.join(',');
    this.userSub = authService.user.subscribe((user) => {
      if (!user.loggedIn)
        this.router.navigate(['/']);
      this.user = user;
    });
    this.isMobile = deviceInfo.isMobile() || deviceInfo.isTablet();
  }

  getRandomRgb(): string {
    const r = Math.floor(Math.random() * 164);
    const g = Math.floor(Math.random() * 164);
    const b = Math.floor(Math.random() * 164);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
    this.userSub?.unsubscribe();
    this.recipeId = undefined;
    this.recipe = undefined;
  }

  ngOnInit(): void { }

  onChangeBusyColor(): void {
    if (!this.busy)
      return;
    this.stillBusyColor = this.getRandomRgb();
    if (this.uploadStart)
      this.uploadDuration = this.getDuration();
    setTimeout(() => {
      this.onChangeBusyColor();
    }, 1000);
  }

  getDuration(): string {
    let timespan = (Date.now() - this.uploadStart!) / 1000;
    let mins = Math.floor(timespan / 60);
    timespan -= mins * 60;
    return `${mins}:${timespan.toFixed(0).padStart(2, '0')} ${this.l10n.locale.common.timeperiod.short.mins}`;
  }

  onChangeFile(event: Event): void {
    if (this.busy)
      return;
    const element: HTMLInputElement = <HTMLInputElement>event.target;
    if (element.files == null || element.files.length == 0)
      return;

    this.busy = true;

    this.aiReplyMessage = '';
    this.uploadStart = Date.now();

    setTimeout(() => {
      this.showStillBusyMessage = this.busy;
      this.onChangeBusyColor();
    }, 5000);

    this.dataService.uploadFileForAiBot(this.recipe, element.files).subscribe((reply: [number, RecipeEditReply]) => {

      if (reply[0] == HttpStatusCode.Created) {
        this.router.navigate(['/recipe', reply[1].recipe.id]);
        return;
      }

      if (reply[1].errorMessage)
        this.aiReplyMessage = reply[1].errorMessage;

      // Clear input. In case of an error user will be able to upload the file again.
      element.value = '';
      this.busy = false;
      this.showStillBusyMessage = false;
    });
  }

}
