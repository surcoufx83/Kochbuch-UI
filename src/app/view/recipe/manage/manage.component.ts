import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { format, formatISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { privateRecipeIcon, publicRecipeIcon, shareIcon, sharedRecipeIcon, spinnerIcon } from 'src/app/common/icons';
import { ApiReply, AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { urlenc } from 'src/app/svc/shared-data.service';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-recipe-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

  @ViewChild('closeDeleteRecipeBtn1') closeDeletionBtn?: ElementRef;

  @Input() loading: boolean = false;
  @Input() recipe?: Recipe;
  @Output() entityChanged: EventEmitter<any> = new EventEmitter();

  privateRecipeIcon = privateRecipeIcon;
  sharedRecipeIcon = sharedRecipeIcon;
  publicRecipeIcon = publicRecipeIcon;
  shareIcon = shareIcon;
  spinnerIcon = spinnerIcon;

  deleteBusy: boolean = false;
  deletionSaveError: boolean = false;
  publishPrivateBusy: boolean = false;
  publishSharedBusy: boolean = false;
  publishGlobalBusy: boolean = false;
  user?: UserAccount;
  isAdmin: boolean = false;
  isOwner: boolean = true;

  routerSubscription?: Subscription;

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.user.subscribe((user) => {
      this.user = user.id == 0 ? undefined : user;
      this.isOwner = this.recipe?.owner?.id == this.user?.id;
    });
    this.authService.isAdmin.subscribe((admin) => (this.isAdmin = admin));
    // User router subscription to close modals on navigation event
    this.routerSubscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.closeDeletionBtn?.nativeElement.click();
      }
    });
  }

  public date(value: string | number | Date, form: string = 'PP'): string {
    return this.l10nService.date(value, form);
  }

  dec(
    value: number,
    minFractionDigits: number = 0,
    maxFractionDigits: number | undefined = undefined
  ): string {
    return this.l10nService.dec(value, minFractionDigits, maxFractionDigits);
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isOwner = this.recipe?.owner?.id == this.user?.id;
  }

  onDeleteRecipe(): void {
    if (this.deleteBusy || !this.recipe)
      return;
    this.deleteBusy = true;
    this.authService.post(`recipe/${this.recipe.id}/delete`, {}).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Accepted) {
        location.replace('/');
      }
      else {
        this.deletionSaveError = true;
        this.deleteBusy = false;
      }
    });
  }

  onPublishRecipe(target: 'private' | 'internal' | 'external'): void {
    if (this.publishPrivateBusy || this.publishSharedBusy || this.publishGlobalBusy || !this.recipe)
      return;
    this.publishPrivateBusy = target === 'private';
    this.publishSharedBusy = target === 'internal';
    this.publishGlobalBusy = target === 'external';
    this.authService.post(`recipe/${this.recipe.id}/publish/${target}`, {}).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Accepted || reply.status === HttpStatusCode.NotModified) {
        this.recipe!.socials.sharing.publication.isPublished = {
          internal: target === 'internal',
          external: target === 'external',
        };
        this.recipe!.socials.sharing.publication.when = formatISO(Date.now());
        this.entityChanged.emit();
      }
      this.publishPrivateBusy = this.publishSharedBusy = this.publishGlobalBusy = false;
    });
  }

  onShare(): void {
    const url = window.location.href;
    navigator.share({
      url: window.location.href,
      title: this.ln(this.l10n.locale.views.recipe.manage.publicVisbility.shareSubjectTitle, [this.recipe?.name, this.recipe?.owner?.name]),
      text: this.ln(this.l10n.locale.views.recipe.manage.publicVisbility.shareSubjectText, [this.recipe?.name, this.recipe?.owner?.name]),
    });
  }

  urlenc(value: string): string {
    return urlenc(value);
  }

}
