import { Component } from '@angular/core';
import { L10nService } from 'src/app/svc/l10n.service';

@Component({
  selector: 'app-footerbar',
  templateUrl: './footerbar.component.html',
  styleUrls: ['./footerbar.component.scss']
})
export class FooterbarComponent {

  currentYear = new Date().getFullYear();
  locales: string[] = [];

  constructor(private l10nService: L10nService) {
    this.locales = this.l10nService.supportedLocales;
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  switchTo(locale: string) {
    this.l10nService.switchTo(locale);
  }

}
