import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { favouriteIcon, userIcon } from 'src/app/common/icons';
import { AuthService, ApiReply } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { RecipeListing } from 'src/app/svc/recipe';
import { SharedDataService } from 'src/app/svc/shared-data.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent implements OnInit {

  listLength = 100;
  loaded = false;
  loading = false;
  loggedin: boolean | undefined;
  recipes: RecipeListing = { ts: '', count: 0, limit: this.listLength, list: [] };

  favouriteIcon = favouriteIcon;
  userIcon = userIcon;

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
    private dataService: SharedDataService
  ) {
    authService.isLoggedIn.subscribe((state) => this.loggedin = state);
    let olddata: string | null = localStorage.getItem('kbCacheMyRecipes');
    if (olddata !== null) {
      this.recipes = <RecipeListing>JSON.parse(olddata);
      this.loaded = true;
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.authService.get(`recipes/my?count=${this.listLength}`).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Ok) {
        let recipesreply = <RecipeListing>reply.body;
        if (recipesreply.ts !== this.recipes.ts) {
          this.recipes = recipesreply;
          localStorage.setItem('kbCacheMyRecipes', JSON.stringify(this.recipes));
        }
      }
      this.loading = false;
      this.loaded = true;
    });
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

}