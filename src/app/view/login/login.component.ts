import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { attentionIcon, spinnerIcon, userCloudIcon } from 'src/app/common/icons';
import { ApiReply, AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  busy = false;
  loginFailed = false;
  waitForBackend = false;

  attentionIcon = attentionIcon;
  cloudIcon = userCloudIcon;
  spinnerIcon = spinnerIcon;

  constructor(
    private l10nService: L10nService,
    private auth: AuthService,
    route: ActivatedRoute,
  ) {
    route.queryParamMap.subscribe((params) => {
      if (params.has('code') && params.has('state')) {
        this.waitForBackend = true;
        this.auth.post(`oauth2/submit`, {
          'code': params.get('code'),
          'state': params.get('state'),
        }).subscribe((response: ApiReply) => {
          if (response.status === HttpStatusCode.Accepted)
            this.auth.loginAccepted();
          else if (response.status === HttpStatusCode.Unauthorized) {
            this.loginFailed = true;
            this.busy = false;
            this.waitForBackend = false;
          }
        });
      }
      else {
        this.busy = false;
        this.waitForBackend = false;
      }
    });
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  startLogin(): void {
    if (this.busy)
      return;
    this.busy = true;
    this.auth.get(`oauth2/params`).subscribe((response: ApiReply) => {
      if (response.status === HttpStatusCode.Ok) {
        location.replace(response.body['params']['url']);
      }
    });
  }

}
