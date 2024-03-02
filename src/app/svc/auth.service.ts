import { HttpClient, HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotLoggedInUser, UserAccount } from './user';
import { L10nService } from './l10n.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedIn$.asObservable();

  private isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdmin = this.isAdmin$.asObservable();

  private locale: string = 'de';

  private user$: BehaviorSubject<UserAccount> = new BehaviorSubject<UserAccount>(NotLoggedInUser);
  public user = this.user$.asObservable();

  private ownProfileStorageName = 'kbMyProfile';
  private userSubscription: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private l10nService: L10nService,
  ) {

    this.l10nService.userLocaleSub.subscribe((locale) => this.locale = locale);

    this.user.subscribe((user) => {
      this.isLoggedIn$.next(user.loggedIn ?? false);
      this.isAdmin$.next(user.isAdmin ?? false);
    });

    let olddata: string | null = localStorage.getItem(this.ownProfileStorageName);
    if (olddata !== null) {
      const user: UserAccount = JSON.parse(olddata);
      this.user$.next(user);
    }

    this.isLoggedIn.subscribe((state) => {
      clearTimeout(this.userSubscription);
      if (state == false) {
        localStorage.clear();
        document.cookie.split(';').forEach((cookie) => {
          document.cookie = cookie + "=; expires=" + new Date(0).toUTCString();
        });
      } else {
        localStorage.setItem(this.ownProfileStorageName, JSON.stringify(this.user$.value));
        this.userSubscription = setTimeout(() => {
          this.reloadUserProfile();
        }, 6000);
      }
    });

  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (state.url.match(/\/login\/oauth2\?state=[^&]+&code=[^&]+/)) {
      //console.log('canActivate', state.url, (!this.user$.value.loggedIn || !this.isLoggedIn$.value))
      return (!this.user$.value.loggedIn || !this.isLoggedIn$.value);
    }

    else if (state.url.match(/^\/admin/)) {
      //console.log('canActivate', state.url, (this.isLoggedIn$.value && this.isAdmin$.value))
      return (this.isLoggedIn$.value === true && this.isAdmin$.value === true);
    }

    const recipeMatch = state.url.match(/^\/recipe\/\d+(?<subpage>.*)?/);

    if (recipeMatch) {

      switch (recipeMatch.groups!['subpage']) {

        case undefined:
          //console.log('canActivate', state.url, true)
          return true;

        case '/ai-editor':
        case '/edit':
        case '/new':
          //console.log('canActivate', state.url, (this.isLoggedIn$.value === true))
          return (this.isLoggedIn$.value === true);

      }

    }

    switch (state.url) {

      case '/login':
      case '/login/oauth2':
        //console.log('canActivate', state.url, (!this.user$.value.loggedIn || !this.isLoggedIn$.value))
        return (!this.user$.value.loggedIn || !this.isLoggedIn$.value);

      case '/logout':
      case '/profile':
      case '/recipes/my':
      case '/settings':
      case '/write':
        //console.log('canActivate', state.url, (this.isLoggedIn$.value === true))
        return (this.isLoggedIn$.value === true);
    }

    return true;
  }

  public get(urlpart: string, payload: any = {}): Subject<ApiReply> {
    let reply: Subject<ApiReply> = new Subject<ApiReply>();
    urlpart += urlpart != 'me' ? urlpart.includes('?') ? `&l=${this.locale}` : `?l=${this.locale}` : '';
    this.http.get<HttpResponse<any>>(`/api/${urlpart}`, { headers: {}, observe: 'response' }).subscribe({
      next: (response) => {
        reply.next({ body: response.body, status: response.status });
        reply.complete();
      },
      error: (e: HttpErrorResponse) => {
        reply.next({ body: null, status: e.status });
        reply.complete();
      }
    });
    return reply;
  }

  public loginAccepted(): void {
    this.get(`me`).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Ok) {
        const user = { ...(<UserProfileBody>reply.body).user };
        this.user$.next(user);
      }
      this.router.navigate(['/home']);
    });
  }

  public logout(): void {
    this.post('logout', {}).subscribe((reply) => {
      this.user$.next(NotLoggedInUser);
      location.replace('/');
    });
  }

  private reloadUserProfile(): void {
    let donotReload = false;
    this.get(`me`).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Ok) {
        const usernew = JSON.stringify({ ...(<UserProfileBody>reply.body).user });
        const userold = JSON.stringify(this.user$.value);
        if (usernew != userold) {
          this.user$.next({ ...(<UserProfileBody>reply.body).user });
        }
      } else if (reply.status === HttpStatusCode.Unauthorized) {
        this.logout();
        donotReload = true;
      }
    });
    if (!donotReload) {
      this.userSubscription = setTimeout(() => {
        this.reloadUserProfile();
      }, 60000);
    }
  }

  public post(urlpart: string, payload: any = {}): Subject<ApiReply> {
    let reply: Subject<ApiReply> = new Subject<ApiReply>();
    this.http.post<HttpResponse<any>>(`/api/${urlpart}`, payload, { headers: {}, observe: 'response' }).subscribe({
      next: (response) => {
        reply.next({ body: response.body, status: response.status });
        reply.complete();
      },
      error: (e: HttpErrorResponse) => {
        reply.next({ body: e.error, status: e.status });
        reply.complete();
      }
    });
    return reply;
  }

}

export interface ApiReply {
  status: HttpStatusCode;
  body: any;
}

export interface UserProfileBody {
  user: UserAccount;
}
