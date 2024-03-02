import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ingredientsIcon, undoIcon } from 'src/app/common/icons';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';

@Component({
  selector: 'app-recipe-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnChanges, OnInit {

  @Input() loading: boolean = false;
  @Input({ required: true }) recipe?: Recipe;
  @Output() servingsChanged = new EventEmitter<number>();

  undoIcon = undoIcon;
  ingredientsIcon = ingredientsIcon;

  busy: boolean = false;

  inputServingsCount: number = 0;
  showGrouped = true;

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

  ngOnChanges(changes: SimpleChanges): void {
    this.inputServingsCount = 0 + this.recipe!.eaterCount;
    this.servingsChanged.emit(this.inputServingsCount);
  }

  ngOnInit(): void {
    this.inputServingsCount = 0 + this.recipe!.eaterCount;
    this.servingsChanged.emit(this.inputServingsCount);
  }

  servingsCountChanged(): void {
    this.servingsChanged.emit(this.inputServingsCount);
  }

}
