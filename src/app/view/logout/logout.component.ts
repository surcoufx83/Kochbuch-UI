import { Component } from '@angular/core';
import { spinnerIcon } from 'src/app/common/icons';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  spinnerIcon = spinnerIcon;

  constructor(
    private l10nService: L10nService,
    private auth: AuthService
  ) {
    auth.logout();
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

}
