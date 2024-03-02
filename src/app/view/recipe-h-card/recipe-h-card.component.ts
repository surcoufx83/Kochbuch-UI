import { Component, Input } from '@angular/core';
import { recipeOpenedIcon, recipeRateIcon, userIcon } from 'src/app/common/icons';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { urlenc } from 'src/app/svc/shared-data.service';

@Component({
  selector: 'app-recipe-h-card',
  templateUrl: './recipe-h-card.component.html',
  styleUrls: ['./recipe-h-card.component.scss']
})
export class RecipeHCardComponent {

  @Input() recipe!: Recipe;
  @Input() subtitle!: string;

  locale = this.l10nService.lang;
  eyeIcon = recipeOpenedIcon;
  voteIcon = recipeRateIcon;
  userIcon = userIcon;

  constructor(
    private l10nService: L10nService
  ) { }

  get l10n(): L10nService {
    return this.l10nService;
  }

  date(value: string | number | Date, form: string): string {
    return this.l10nService.date(value, form);
  }

  dec(value: number, minFractionDigits: number = 0, maxFractionDigits: number | undefined = undefined): string {
    return this.l10nService.dec(value, minFractionDigits, maxFractionDigits);
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  urlenc(value: string): string {
    return urlenc(value);
  }

}
