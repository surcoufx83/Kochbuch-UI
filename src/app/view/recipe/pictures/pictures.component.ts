import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { galleryIcon, pictureIcon, pictureUploadIcon, spinnerIcon } from 'src/app/common/icons';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe, RecipePicture } from 'src/app/svc/recipe';
import { SharedDataService, urlenc } from 'src/app/svc/shared-data.service';

@Component({
  selector: 'app-recipe-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent {

  @Input() loading: boolean = false;
  @Input({ required: true }) recipe?: Recipe;
  @Input({ required: true }) isAdmin!: boolean;
  @Input({ required: true }) isOwner!: boolean;
  @Input({ required: true }) userId?: number;
  @Output() imageDeleted = new EventEmitter();
  @Output() imageUploaded = new EventEmitter();
  @ViewChild('carousel') carousel?: ElementRef<HTMLElement>;
  @ViewChild('carouselnext') carouselNextPicture?: ElementRef<HTMLElement>;
  @ViewChild('modalopener') openDeletionBtn?: ElementRef<HTMLElement>;
  @ViewChild('dismissDeletionBtn') closeDeletionBtn?: ElementRef<HTMLElement>;

  acceptMimeTypes: string;
  acceptedUploadFilesize: number;
  busy: boolean = false;
  deletionSaveError: boolean = false;
  pictureToDelete?: RecipePicture;

  galleryIcon = galleryIcon;
  pictureIcon = pictureIcon;
  pictureUploadIcon = pictureUploadIcon;
  spinnerIcon = spinnerIcon;

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
    private dataService: SharedDataService,
  ) {
    this.acceptMimeTypes = this.dataService.acceptedUploadMimetypes.join(',');
    this.acceptedUploadFilesize = this.dataService.acceptedUploadFilesize;
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

  onChangeFile(event: Event): void {
    const element: HTMLInputElement = <HTMLInputElement>event.target;
    const checkresult = this.dataService.precheckFileinputForUpload('pictureForRecipeGallery', element, this.recipe, this.l10n.locale.views.recipe.pictureUpload.uploadFailedToastTitle);
    if (this.busy || this.recipe == undefined || checkresult == null)
      return;

    if (checkresult === false) {
      element.value = '';
    }

    this.busy = true;

    this.dataService.uploadFiles(this.recipe, element.files!).subscribe((reply) => {
      switch (reply[0]) {

        case HttpStatusCode.Accepted:
          // Picture uploaded
          this.dataService.showSuccessToast(
            this.l10n.locale.views.recipe.pictureUpload.uploadSuccessToastTitle,
            element.files!.length === 1 ? this.l10n.locale.views.recipe.pictureUpload.uploadSuccessfullSn : this.l10n.locale.views.recipe.pictureUpload.uploadSuccessfullPl
          );
          this.imageUploaded.emit();
          break;

        case HttpStatusCode.NotModified:
          // Maybe notify user but this should never occur...
          break;

        case HttpStatusCode.NotFound:
        case HttpStatusCode.InternalServerError:
          this.dataService.showDangerToast(
            this.l10n.locale.views.recipe.pictureUpload.uploadFailedToastTitle,
            this.l10n.locale.views.recipe.pictureUpload.apiResponse[`code-${reply[1].errorCode}`]
          );
          break;

        case HttpStatusCode.BadRequest:
        case HttpStatusCode.NotModified:
          this.dataService.showWarningToast(
            this.l10n.locale.views.recipe.pictureUpload.uploadFailedToastTitle,
            this.l10n.locale.views.recipe.pictureUpload.apiResponse[`code-${reply[1].errorCode}`]
          );
          break;

      }

      // Clear input. In case of an error user will be able to upload the file again.
      element.value = '';
      this.busy = false;
    });
  }

  onDeletePicture(): void {
    if (this.busy || !this.pictureToDelete || !this.recipe)
      return;
    this.busy = true;
    this.authService.post(`recipe/${this.recipe.id}/picture/${this.pictureToDelete.id}/delete`).subscribe((reply) => {
      if (reply.status == HttpStatusCode.Accepted) {
        this.imageDeleted.emit();
        this.deletionSaveError = false;
        setTimeout(() => {
          this.closeDeletionBtn?.nativeElement.click();
          this.pictureToDelete = undefined;
        }, 1);
      }
      else
        this.deletionSaveError = true;
      this.busy = false;
    });
  }

  prepareDelete(picture: RecipePicture): void {
    this.pictureToDelete = picture;

    setTimeout(() => {
      this.openDeletionBtn?.nativeElement.click();
    }, 1);
  }

  urlenc(value: string): string {
    return urlenc(value);
  }

}
