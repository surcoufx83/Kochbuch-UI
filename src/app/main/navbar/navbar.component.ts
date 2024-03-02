import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { aiIcon, collectionIcon, kitchenIcon, menuIcon, recipeNewIcon, searchIcon, spinnerIcon, userAdminIcon, userIcon, userLoginIcon, userLogoutIcon, userProfileIcon, userSettingsIcon } from 'src/app/common/icons';
import { ApiReply, AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { SharedDataService } from 'src/app/svc/shared-data.service';
import { UserAccount } from 'src/app/svc/user';
import { ModernSearchComponent } from './modern-search/modern-search.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  aiIcon = aiIcon;
  appIcon = kitchenIcon;
  adminIcon = userAdminIcon;
  barsIcon = menuIcon;
  loginIcon = userLoginIcon;
  logoutIcon = userLogoutIcon;
  myRecipesIcon = collectionIcon;
  newIcon = recipeNewIcon;
  profileIcon = userProfileIcon;
  searchIcon = searchIcon;
  settingsIcon = userSettingsIcon;
  userIcon = userIcon;

  title: string = '';
  loggedin: boolean = false;
  admin: boolean = false;
  user?: UserAccount;

  @ViewChild('searchTooltip') searchTooltip?: ModernSearchComponent;
  @ViewChild('toggleButton') toggleButton?: ElementRef;

  searchDesktopGotFocus: boolean = false;
  searchMobileGotFocus: boolean = false;
  searchPhrase: string = '';
  showSearchModal: boolean = false;

  busy = false;
  cloudIcon = userLogoutIcon;
  spinnerIcon = spinnerIcon;

  constructor(
    private authService: AuthService,
    private dataService: SharedDataService,
    private l10nService: L10nService,
    private router: Router,
  ) {
    dataService.navbarTitle.subscribe((title) => this.title = title);
    authService.isLoggedIn.subscribe((state) => this.loggedin = state);
    authService.isAdmin.subscribe((state) => this.admin = state);
    authService.user.subscribe((user) => this.user = user);
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  onChangeSearchText(event: string): void {
    this.showSearchModal = this.searchPhrase != '';
    this.searchTooltip?.onChangePhrase(this.searchPhrase);
  }

  onClickMobileLink(): void {
    this.toggleButton?.nativeElement?.click()
  }

  onRunSearch(): void {
    if (this.searchPhrase == '')
      return;
    this.router.navigate(['/search', this.searchPhrase], { queryParams: { t: Math.floor(Date.now() / 1000) } });
  }

  onStartLogin(): void {
    if (this.busy)
      return;
    this.busy = true;
    this.authService.get(`oauth2/params`).subscribe((response: ApiReply) => {
      if (response.status === HttpStatusCode.Ok) {
        location.replace(response.body['params']['url']);
      }
      else
        this.busy = false;
    });
  }

}