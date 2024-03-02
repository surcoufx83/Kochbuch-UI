import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { AngularDeviceInformationService } from 'angular-device-information';
import { searchIcon, spinnerIcon, userIcon, userSettingsIcon } from 'src/app/common/icons';
import { ApiReply, AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { urlenc } from 'src/app/svc/shared-data.service';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-modern-search',
  templateUrl: './modern-search.component.html',
  styleUrls: ['./modern-search.component.scss']
})
export class ModernSearchComponent {

  @Input() phrase: string = '';

  @Output() onLeaveSearch = new EventEmitter();

  searchIcon = searchIcon;
  spinnerIcon = spinnerIcon;
  userIcon = userIcon;
  userSettingsIcon = userSettingsIcon;

  isMobile: boolean = true;

  searchSectionIngredients: boolean = true;
  searchSectionRecipes: boolean = true;
  searchSectionUser: boolean = true;

  searchDebounce?: number;
  searchBusy: boolean = false;
  searchCompleted: boolean = false;
  searchLimit: number = 100;
  searchResults: SearchResult = { ts: '', count: 0, limit: this.searchLimit, recipes: [], user: [] };

  settingsOpen: boolean = false;

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
    deviceInfo: AngularDeviceInformationService,
  ) {
    this.isMobile = deviceInfo.isMobile() || deviceInfo.isTablet();
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  onChangeFilter(e?: HTMLButtonElement) {
    e?.blur();
    this.onChangePhrase(this.phrase, true);
  }

  onChangePhrase(newphrase: string, skipcheck: boolean = false): void {
    newphrase = newphrase.trim();
    if (this.phrase == newphrase && !skipcheck)
      return;

    this.phrase = newphrase;
    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => {
      this.searchResults = { ts: '', count: 0, limit: this.searchLimit, recipes: [], user: [] };
      if (this.phrase == '')
        return;
      this.searchBusy = true;
      this.searchCompleted = false;
      this.authService.post(`search?count=${this.searchLimit}&query=${encodeURIComponent(this.phrase)}&fr=${this.searchSectionRecipes ? 1 : 0}&fu=${this.searchSectionUser ? 1 : 0}&fi=${this.searchSectionIngredients ? 1 : 0}`).subscribe((reply: ApiReply) => {
        if (reply.status === HttpStatusCode.Ok) {
          let recipesreply = <SearchResult>reply.body;
          if (recipesreply.ts !== this.searchResults.ts) {
            recipesreply.recipes = recipesreply.recipes.sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1);
            this.searchResults = { ...recipesreply };
          }
        }
        this.searchCompleted = true;
        this.searchBusy = false;
      });
    }, 500);

  }

  urlenc(value: string): string {
    return urlenc(value);
  }

}

export interface SearchResult {
  count: number;
  limit: number;
  recipes: Recipe[];
  user: UserAccount[];
  ts: string;
}
