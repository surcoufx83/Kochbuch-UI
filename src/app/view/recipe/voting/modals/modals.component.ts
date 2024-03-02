import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { recipeRateIcon, infoIcon } from 'src/app/common/icons';
import { AuthService, ApiReply } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { urlenc } from 'src/app/svc/shared-data.service';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-recipe-voting-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnChanges, OnInit, OnDestroy {

  @ViewChild('dismissBtn') dismissBtn?: ElementRef;
  @ViewChild('dismissDeletionBtn') dismissDeletionBtn?: ElementRef;
  @ViewChild('closeDeletionBtn') closeDeletionBtn?: ElementRef;

  @Input() loading: boolean = false;
  @Input() recipe?: Recipe;
  @Output() entityChanged: EventEmitter<any> = new EventEmitter();

  busy: boolean = false;
  user?: UserAccount;
  isAdmin: boolean = false;
  isOwner: boolean = true;

  recipeRateIcon = recipeRateIcon;
  infoIcon = infoIcon;

  voteCooked: number = -1;
  voteDifficulty: number = 0;
  voteHearts: number = 0;

  alreadyVoted: boolean = false;
  cookedTimes: number = 0;
  cookedLast: string | null = null;

  votingSaveError: boolean = false;
  deletionSaveError: boolean = false;
  deleteCookedRecordsToo: boolean = true;

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
        this.dismissBtn?.nativeElement.click();
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

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.isOwner = this.recipe?.owner?.id == this.user?.id;
    if (this.recipe && this.recipe.socials.myvotes) {
      if (this.recipe.socials.myvotes.cooked.length > 0) {
        const cooked = this.recipe.socials.myvotes.cooked.sort((a, b) =>
          a.when > b.when ? -1 : a.when < b.when ? 1 : 0
        );
        this.cookedTimes = this.recipe.socials.myvotes.cooked.length;
        this.cookedLast = cooked[0].when;
      }
      if (this.recipe.socials.myvotes.rating.voted) {
        this.voteDifficulty = this.recipe.socials.myvotes.rating.value;
        this.alreadyVoted = true;
      }
      if (this.recipe.socials.myvotes.voting.voted) {
        this.voteHearts = this.recipe.socials.myvotes.voting.value;
        this.alreadyVoted = true;
      }
    }
  }

  /*
    Deletes the users recent votes for the current recipe.
    After deletion the back button of the delete modal is clicked so the user is back in the vote modal.
  */
  onDeleteRecord(): void {
    if (this.busy) return;
    this.busy = true;
    this.authService
      .post(`vote/${this.recipe?.id}/delete`, {
        includeCookedRecords: this.deleteCookedRecordsToo,
      })
      .subscribe((reply: ApiReply) => {
        if (reply.status === HttpStatusCode.Accepted) {
          this.deletionSaveError = false;
          this.alreadyVoted = false;
          this.voteDifficulty = 0;
          this.voteHearts = 0;
          if (this.deleteCookedRecordsToo) {
            this.cookedLast = null;
            this.cookedTimes = 0;
          }
          this.entityChanged.emit();
          setTimeout(() => {
            this.closeDeletionBtn?.nativeElement.click();
          }, 2);
        } else this.deletionSaveError = true;
        this.busy = false;
      });
  }

  /*
    This method is called when the user submits a new vote for the recipe.
    If he does not enter any values, nothing happens.
  */
  onSubmitVote(): void {
    if (this.busy)
      return;
    if (this.voteCooked === -1 && this.voteDifficulty === 0 && this.voteHearts === 0) {
      this.dismissBtn?.nativeElement.click();
      return;
    }
    this.busy = true;
    this.authService
      .post(`vote/${this.recipe?.id}`, {
        cooked: this.voteCooked,
        difficulty: this.voteDifficulty,
        hearts: this.voteHearts,
      })
      .subscribe((reply: ApiReply) => {
        if (reply.status === HttpStatusCode.Accepted) {
          this.votingSaveError = false;
          this.alreadyVoted = true;
          this.entityChanged.emit();
          setTimeout(() => {
            this.dismissBtn?.nativeElement.click();
          }, 2);
        }
        else if (reply.status !== HttpStatusCode.NotModified)
          this.votingSaveError = true;
        this.busy = false;
      });
  }

  urlenc(value: string): string {
    return urlenc(value);
  }

}
