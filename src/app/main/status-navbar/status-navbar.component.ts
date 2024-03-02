import { Component } from '@angular/core';
import { L10nService } from 'src/app/svc/l10n.service';
import { SharedDataService } from 'src/app/svc/shared-data.service';

@Component({
  selector: 'app-status-navbar',
  templateUrl: './status-navbar.component.html',
  styleUrls: ['./status-navbar.component.scss']
})
export class StatusNavbarComponent {

  hasChanges = false;

  constructor(
    private l10nService: L10nService,
    private dataService: SharedDataService,
  ) {
    this.dataService.showUnsavedRecipeChanges.subscribe((state) => this.hasChanges = state);
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

}
