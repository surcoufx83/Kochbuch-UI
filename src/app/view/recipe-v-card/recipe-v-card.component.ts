import { Component, Input, OnInit } from '@angular/core';
import { recipeDateIcon, recipeOpenedIcon, recipeRateIcon, userIcon } from 'src/app/common/icons';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe, RecipeCategoryList } from 'src/app/svc/recipe';
import { SharedDataService, urlenc } from 'src/app/svc/shared-data.service';

@Component({
  selector: 'app-recipe-v-card',
  templateUrl: './recipe-v-card.component.html',
  styleUrls: ['./recipe-v-card.component.scss']
})
export class RecipeVCardComponent implements OnInit {

  @Input() hideOwner: boolean = false;
  @Input() recipe!: Recipe;
  @Input() showCategories: boolean = true;

  categories: RecipeCategoryList[] = [];

  locale = this.l10nService.lang;
  calendarIcon = recipeDateIcon;
  eyeIcon = recipeOpenedIcon;
  voteIcon = recipeRateIcon;
  userIcon = userIcon;

  constructor(
    private l10nService: L10nService,
    private dataService: SharedDataService
  ) {
    this.dataService.categories.subscribe(() => this.loadCategories());
  }

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

  loadCategories(): void {
    if (!this.recipe)
      return;
    this.categories = [];
    let cats: RecipeCategoryList[] = []
    this.recipe.categories.forEach((cata) => {
      const tempcat = this.dataService.getCategory(cata.catid);
      const tempitem = this.dataService.getCategoryItem(cata.catid, cata.itemid);
      if (tempcat == undefined || tempitem == undefined)
        return;
      cats.push({
        cat: {
          id: tempcat.id,
          icon: tempcat.icon,
          l10nname: tempcat.l10nname
        },
        item: {
          id: tempitem.id,
          icon: tempitem.icon,
          l10nname: tempitem.l10nname
        }
      });
    });
    this.categories = cats;
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  urlenc(value: string): string {
    return urlenc(value);
  }

}
