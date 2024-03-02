import { HttpStatusCode } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { kitchenIcon, collectionIcon, recipeNewIcon, recipeRandomIcon, searchIcon, pictureIcon, aiIcon } from 'src/app/common/icons';
import { ApiReply, AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {

  appIcon = kitchenIcon;
  myRecipesIcon = collectionIcon;
  newIcon = recipeNewIcon;
  aiIcon = aiIcon;
  randomRecipeIcon = recipeRandomIcon;
  searchIcon = searchIcon;

  loggedin: boolean = false;
  loadingRandom: boolean = false;
  user?: UserAccount;

  sub1?: Subscription;
  sub2?: Subscription;

  constructor(
    private authService: AuthService,
    private l10nService: L10nService,
    private router: Router
  ) {
    this.sub1 = authService.isLoggedIn.subscribe((state) => this.loggedin = state);
    this.sub2 = authService.user.subscribe((user) => this.user = user);
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ngOnDestroy(): void {
    if (this.sub1)
      this.sub1.unsubscribe();
    if (this.sub2)
      this.sub2.unsubscribe();
  }

  loadRandomRecipe(): void {
    if (this.loadingRandom)
      return;
    this.loadingRandom = true;
    this.authService.get(`random`).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Ok) {
        this.router.navigate(['/recipe', `${reply.body['id']}-${this.urlenc(reply.body['name'])}`]);
      }
      this.loadingRandom = false;
    });
  }

  urlenc(value: string): string {
    return value.replace(/[^A-Za-z0-9_äöüÄÖÜßẞ]/g, '-');
  }

}
