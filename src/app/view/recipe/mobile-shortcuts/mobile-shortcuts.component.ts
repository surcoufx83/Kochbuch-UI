import { Component, Inject, Input } from '@angular/core';
import { galleryIcon, ingredientsIcon, stepsIcon } from 'src/app/common/icons';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-recipe-mobile-shortcuts',
  templateUrl: './mobile-shortcuts.component.html',
  styleUrls: ['./mobile-shortcuts.component.scss']
})
export class MobileShortcutsComponent {

  @Input() loading: boolean = false;
  @Input() recipe?: Recipe;

  galleryIcon = galleryIcon;
  ingredientsIcon = ingredientsIcon;
  stepsIcon = stepsIcon;

  constructor(
    private l10nService: L10nService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  scrollTo(anchor: string): void {
    const element = this.document.getElementById(anchor);
    const frame = this.document.getElementById('app-scrollable');
    if (!element || !frame)
      return;
    const y = element.getBoundingClientRect();
    frame.scrollBy({ top: y.top - 68 + window.pageYOffset, behavior: 'smooth' });
  }

}
