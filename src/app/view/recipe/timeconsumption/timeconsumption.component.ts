import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { cookMealIcon, prepareMealIcon, restMealIcon, timeConsumptionIcon } from 'src/app/common/icons';

@Component({
  selector: 'app-recipe-timeconsumption',
  templateUrl: './timeconsumption.component.html',
  styleUrls: ['./timeconsumption.component.scss']
})
export class TimeconsumptionComponent implements OnInit {

  @Input() loading: boolean = false;
  @Input() recipe?: Recipe;

  busy: boolean = false;

  prepareMealIcon = prepareMealIcon;
  restMealIcon = restMealIcon;
  cookMealIcon = cookMealIcon;
  timeConsumptionIcon = timeConsumptionIcon;

  prepareTime: number = 0;
  prepareTimeRel: number = 1;
  prepareTimeUnit: string = 'minutes';
  restTime: number = 0;
  restTimeRel: number = 1;
  restTimeUnit: string = 'minutes';
  cookingTime: number = 0;
  cookingTimeRel: number = 1;
  cookingTimeUnit: string = 'minutes';

  totalTime: number = 0;
  totalTimeUnit: string = 'minutes';

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
    this.prepareTime = this.recipe!.preparation.timeConsumed.preparing;
    this.restTime = this.recipe!.preparation.timeConsumed.rest;
    this.cookingTime = this.recipe!.preparation.timeConsumed.cooking;
    this.prepareTimeUnit = this.recipe!.preparation.timeConsumed.unit;
    this.restTimeUnit = this.recipe!.preparation.timeConsumed.unit;
    this.cookingTimeUnit = this.recipe!.preparation.timeConsumed.unit;
    this.totalTimeUnit = this.recipe!.preparation.timeConsumed.unit;
    this.prepareTimeRel = Math.floor(this.prepareTime / this.recipe!.preparation.timeConsumed.total * 100);
    this.restTimeRel = Math.floor(this.restTime / this.recipe!.preparation.timeConsumed.total * 100);
    this.cookingTimeRel = Math.floor(this.cookingTime / this.recipe!.preparation.timeConsumed.total * 100);
    const dif = 100 - (this.prepareTimeRel + this.restTimeRel + this.cookingTimeRel);
    this.prepareTimeRel += dif / 3;
    this.restTimeRel += dif / 3;
    this.cookingTimeRel += dif / 3;
    this.totalTime = this.prepareTime + this.restTime + this.cookingTime;
  }

  public time(value: number, unit: string, short: boolean = true, exact: boolean = false): string {
    return this.l10nService.time(value, unit, short, exact);
  }

}
