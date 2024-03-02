import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { collectionBestRecipesIcon, collectionRecentRecipesIcon, menuIcon } from 'src/app/common/icons';
import { ApiReply, AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { RecipeListing } from 'src/app/svc/recipe';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listLength = 25;
  loading = false;
  user: UserAccount | undefined;
  loggedin: boolean | undefined;
  recipes: RecipeListing = { ts: '', count: 0, limit: this.listLength, list: [] };

  barsIcon = menuIcon;
  bestIcon = collectionBestRecipesIcon;
  recentIcon = collectionRecentRecipesIcon;

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
  ) {
    authService.isLoggedIn.subscribe((state) => this.loggedin = state);
    authService.user.subscribe((user) => {
      this.user = user;
    });
    let olddata: string | null = localStorage.getItem('kbCacheHome');
    if (olddata !== null)
      this.recipes = <RecipeListing>JSON.parse(olddata);
  }

  ngOnInit(): void {
    this.loading = true;
    this.authService.get(`recipes/home?count=${this.listLength}`).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Ok) {
        let recipesreply = <RecipeListing>reply.body;
        if (recipesreply.ts !== this.recipes.ts) {
          this.recipes = { ...recipesreply };
          localStorage.setItem('kbCacheHome', JSON.stringify(this.recipes));
        }
      }
      this.loading = false;
    });
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

}
