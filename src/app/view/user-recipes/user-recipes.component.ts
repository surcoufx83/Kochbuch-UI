import { HttpStatusCode } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiReply, AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { RecipeListing, UserRecipeListing } from 'src/app/svc/recipe';
import { SharedDataService } from 'src/app/svc/shared-data.service';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent implements OnDestroy, OnInit {

  listLength = 100;
  loaded = false;
  loading = false;
  loggedin: boolean | undefined;
  recipes: RecipeListing = { ts: '', count: 0, limit: this.listLength, list: [] };
  private routeSub?: Subscription;
  user?: UserAccount;
  userName?: string = '';
  private userId?: number;

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
    private dataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  private loadUserRecipes(): void {
    if (this.userId == undefined)
      return;
    this.loading = true;
    this.authService.get(`recipes/user?id=${this.userId}&count=${this.listLength}`).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Ok) {
        let recipesreply = <UserRecipeListing>reply.body;
        this.recipes = recipesreply;
        this.user = recipesreply.user;
      }
      else if (reply.status == HttpStatusCode.NotFound) {
        this.router.navigate(['/']);
      }
      this.loading = false;
      this.loaded = true;
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const idmatch = params['id'].match(/^(?<id>\d+)\-(?<name>[^/]+)/);
      if (!idmatch)
        return;
      this.userId = +idmatch.groups['id'];
      this.userName = idmatch.groups['name'];
      this.loadUserRecipes();
    });
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

}