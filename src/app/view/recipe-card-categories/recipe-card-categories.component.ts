import { Component, Input } from '@angular/core';
import { RecipeCategoryList } from 'src/app/svc/recipe';

@Component({
  selector: 'app-recipe-card-categories',
  templateUrl: './recipe-card-categories.component.html',
  styleUrls: ['./recipe-card-categories.component.scss']
})
export class RecipeCardCategoriesComponent {
  
  @Input() categories: RecipeCategoryList[] = [];

}
