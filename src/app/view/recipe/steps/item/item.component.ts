import { Component, Input, OnInit } from '@angular/core';
import { ingredientsIcon, timeConsumptionIcon } from 'src/app/common/icons';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe, RecipeStep } from 'src/app/svc/recipe';

@Component({
  selector: 'app-recipe-step-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input({ required: true }) step!: RecipeStep;
  @Input({ required: true }) inputServingsCount!: number;
  @Input({ required: true }) recipe!: Recipe;

  ingredientsIcon = ingredientsIcon;
  timeConsumptionIcon = timeConsumptionIcon;

  prepareTime: number = 0;
  restTime: number = 0;
  cookingTime: number = 0;
  totalTime: number = 0;
  timeUnits: string = 'minutes';

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
  ) { }

  dec(
    value: number,
    minFractionDigits: number = 0,
    maxFractionDigits: number | undefined = undefined
  ): string {
    return this.l10nService.dec(value, minFractionDigits, maxFractionDigits);
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  ngOnInit(): void {
    this.prepareTime = this.step.timeConsumed.preparing ?? 0;
    this.restTime = this.step.timeConsumed.rest ?? 0;
    this.cookingTime = this.step.timeConsumed.cooking ?? 0;
    this.totalTime = this.step.timeConsumed.total ?? 0;
    this.timeUnits = this.step.timeConsumed.unit;
  }

  public time(value: number, unit: string): string {
    return this.l10nService.time(value, unit);
  }

}
