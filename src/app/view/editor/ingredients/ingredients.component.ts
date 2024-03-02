import { Component, EventEmitter, Input, Output } from '@angular/core';
import { addIcon, deleteIcon, sortDownIcon, sortUpIcon } from 'src/app/common/icons';
import { L10nService } from 'src/app/svc/l10n.service';
import { EmptyIngredient, EmptyIngredientUnit, RecipeIngredient } from 'src/app/svc/recipe';

@Component({
  selector: 'app-recipe-editor-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class EditorIngredientsComponent {

  @Input({ required: true }) id!: string;
  @Input({ required: true }) listing!: RecipeIngredient[];
  @Input() showDescriptions: boolean = true;
  @Input({ required: true }) scope!: 'Recipe' | 'Step';
  @Input({ required: true }) sortOn!: boolean;

  @Output() listingChange: EventEmitter<RecipeIngredient[]> = new EventEmitter();

  addIcon = addIcon;
  deleteIcon = deleteIcon;
  sortDownIcon = sortDownIcon;
  sortUpIcon = sortUpIcon;

  constructor(
    private l10nService: L10nService,
  ) { }

  add(): void {
    const item = { ...EmptyIngredient };
    item.unit = { ...EmptyIngredientUnit };
    this.listing.push({ ...item });
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  move(dragFromIndex: number, dragToIndex: number): void {
    const ingredient = this.listing.splice(dragFromIndex, 1)[0];
    this.listing.splice(dragToIndex, 0, ingredient!);
    this.listingChange.emit(this.listing);
  }

  removeAt(i: number): void {
    if (this.listing.length >= i)
      this.listing.splice(i, 1);
    if (this.listing.length === 0)
      this.add();
    this.listingChange.emit(this.listing);
  }

}
