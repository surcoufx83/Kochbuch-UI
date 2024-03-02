import { DOCUMENT } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { infoIcon, shareIcon, spinnerIcon } from 'src/app/common/icons';
import { ApiReply, AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { SharedDataService } from 'src/app/svc/shared-data.service';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnDestroy, OnInit {

  loading: boolean = false;
  publishBusy: boolean = false;

  private routeSub?: Subscription;
  private pageviewTimeout: any;
  private recipeId?: number;
  recipe?: Recipe;
  user?: UserAccount;
  isAdmin: boolean = false;
  isOwner: boolean = false;
  inputServingsCount: number = 0;

  infoIcon = infoIcon;
  shareIcon = shareIcon;
  spinnerIcon = spinnerIcon;

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
    private dataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.authService.user.subscribe((user) => this.user = user.id == 0 ? undefined : user);
    this.authService.isAdmin.subscribe((admin) => this.isAdmin = admin);
  }

  public date(value: string | number | Date, form: string = 'PP'): string {
    return this.l10nService.date(value, form);
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  private loadRecipe(includeScroll: boolean = true): void {
    if (!this.recipeId)
      return;
    this.loading = true;
    this.dataService.loadRecipe(this.recipeId).subscribe((value) => {
      if (value === true)
        return;
      if (value === false) {
        // todo notify user
        this.loading = false;
        this.router.navigate(['/']);
        return;
      }
      this.recipe = { ...<Recipe>value };
      this.dataService.setCurrentRecipeId(this.recipe.id);
      this.isOwner = this.user != undefined && this.user.id == this.recipe.owner?.id;
      this.loading = false;
      this.pageviewTimeout = setTimeout(() => {
        this.markAsViewed();
      }, 30000);
      if (includeScroll) {
        setTimeout(() => {
          this.scrollToTop();
        }, 1);
      }
    });
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  markAsViewed(): void {
    if (!this.recipeId)
      return;
    this.authService.post(`recipe/${this.recipeId}/reading`).subscribe(() => { });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
    clearTimeout(this.pageviewTimeout);
    this.recipeId = undefined;
    this.dataService.resetCurrentRecipeId();
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const idmatch = params['id'].match(/^(?<id>\d+)\-?/);
      if (!idmatch)
        return;
      if (+idmatch.groups['id'] !== this.recipeId) {
        this.recipeId = +idmatch.groups['id'];
        this.loadRecipe();
      }
    });
  }

  onEntityChanged(): void {
    this.loadRecipe(false);
  }

  onPublishRecipe(): void {
    if (this.publishBusy || !this.recipe)
      return;
    this.publishBusy = true;
    this.authService.post(`recipe/${this.recipe.id}/publish/internal`, {}).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Accepted || reply.status === HttpStatusCode.NotModified) {
        this.recipe!.socials.sharing.publication.isPublished = {
          internal: true,
          external: false,
        };
        this.recipe!.socials.sharing.publication.when = formatISO(Date.now());
        this.onEntityChanged();
      }
      this.publishBusy = false;
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

  scrollToTop(): void {
    const element = this.document.getElementById('recipe-top-anchor');
    const frame = this.document.getElementById('app-scrollable');
    if (!element || !frame)
      return;
    const y = element.getBoundingClientRect();
    frame.scrollBy({ top: y.top - 100 + window.pageYOffset, behavior: 'smooth' });
  }

}
