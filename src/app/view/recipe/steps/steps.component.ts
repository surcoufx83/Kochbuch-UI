import { Component, Input, OnInit } from '@angular/core';
import { stepsIcon } from 'src/app/common/icons';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';

@Component({
  selector: 'app-recipe-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  @Input({ required: true }) inputServingsCount!: number;
  @Input({ required: true }) recipe?: Recipe;

  stepsIcon = stepsIcon;

  busy: boolean = false;

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

  ngOnInit(): void { }


}
