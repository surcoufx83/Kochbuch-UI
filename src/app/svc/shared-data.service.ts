import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiReply, AuthService } from './auth.service';
import { L10nService } from './l10n.service';
import { IngredientUnit, Recipe, RecipeCategory, RecipeCategoryItem, RecipeIngredient } from './recipe';
import { ToastrService } from 'ngx-toastr';
import { AngularDeviceInformationService } from 'angular-device-information';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private _acceptedUploadMimetypes: string[] = [
    'image/jpeg',
    'image/png',
  ];
  private _acceptedUploadFilesize: number = 16777216;
  private categories$: BehaviorSubject<CategoriesCache> = new BehaviorSubject<CategoriesCache>({ ts: '', list: {} });
  private categoriesIdCache: { [key: number]: string } = {};
  private categoryItemsIdCache: { [key: number]: [string, string, number] } = {};
  private currentRecipeId$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private editRecipeName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private isMobile: boolean;
  private locale = '';
  private navbarTitle$: BehaviorSubject<string> = new BehaviorSubject<string>(this.l10nService.locale.navbar.title);
  private recipeCache: { [key: number]: Recipe } = {};
  private showUnsavedRecipeChanges$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public categories = this.categories$.asObservable();
  public currentRecipeId = this.currentRecipeId$.asObservable();
  public editRecipeName = this.editRecipeName$.asObservable();
  public navbarTitle = this.navbarTitle$.asObservable();
  public showUnsavedRecipeChanges = this.showUnsavedRecipeChanges$.asObservable();

  constructor(
    private authService: AuthService,
    private l10nService: L10nService,
    private toastr: ToastrService,
    deviceInfo: AngularDeviceInformationService,
  ) {
    this.isMobile = deviceInfo.isMobile() || deviceInfo.isTablet();
    this.l10nService.userLocaleSub.subscribe((locale) => {
      if (locale != this.locale) {
        this.locale = locale;
        this.categories$.next(this.updateCategoriesLocalization(this.categories$.value));
      }
    });
    let olddata: string | null = localStorage.getItem(`kbCacheCategories_${this.locale}`);
    if (olddata !== null)
      this.categories$.next(<CategoriesCache>JSON.parse(olddata));
    this.categories.subscribe((cats) => {
      localStorage.setItem(`kbCacheCategories_${this.locale}`, JSON.stringify(cats))
      this.categoriesIdCache = {};
      this.categoryItemsIdCache = {};
      Object.keys(cats.list).forEach((catkey) => {
        this.categoriesIdCache[cats.list[catkey].id] = catkey;
        Object.keys(cats.list[catkey].items).forEach((itemkey) => {
          this.categoryItemsIdCache[cats.list[catkey].items[itemkey].id] = [
            itemkey,
            catkey,
            cats.list[catkey].id,
          ];
        })
      });
    });
    this.loadCategories();
    this.loadRecipeCache();
  }

  public compareRecipes(a: Recipe, b: Recipe): boolean {
    if (
      !this.compareRecipesStrItem('name', a.name, b.name) ||
      !this.compareRecipesStrItem('description', a.description, b.description) ||
      !this.compareRecipesStrItem('preparation.ingredientsGrouping', a.preparation.ingredientsGrouping, b.preparation.ingredientsGrouping) ||
      !this.compareRecipesStrNumber('eaterCount', a.eaterCount, b.eaterCount) ||
      !this.compareRecipesStrNumber('categories.length', a.categories.length, b.categories.length) ||
      !this.compareRecipesStrNumber('pictures.length', a.pictures.length, b.pictures.length) ||
      !this.compareRecipesStrNumber('preparation.ingredients.length', a.preparation.ingredients.length, b.preparation.ingredients.length) ||
      !this.compareRecipesStrNumber('preparation.steps.length', a.preparation.steps.length, b.preparation.steps.length)
    )
      return false;
    for (let i = 0; i < a.preparation.ingredients.length; i++) {
      if (!this.compareRecipesIngredientItem(i, a.preparation.ingredients[i], b.preparation.ingredients[i]))
        return false;
    }
    for (let i = 0; i < a.preparation.steps.length; i++) {
      if (
        !this.compareRecipesStrItem(`steps-${i}.name`, a.preparation.steps[i].name, b.preparation.steps[i].name) ||
        !this.compareRecipesStrNumber(`steps-${i}.ingredients.length`, a.preparation.steps[i].ingredients.length, b.preparation.steps[i].ingredients.length) ||
        !this.compareRecipesStrNumber(`steps-${i}.timeConsumed.cooking`, a.preparation.steps[i].timeConsumed.cooking, b.preparation.steps[i].timeConsumed.cooking) ||
        !this.compareRecipesStrNumber(`steps-${i}.timeConsumed.preparing`, a.preparation.steps[i].timeConsumed.preparing, b.preparation.steps[i].timeConsumed.preparing) ||
        !this.compareRecipesStrNumber(`steps-${i}.timeConsumed.rest`, a.preparation.steps[i].timeConsumed.rest, b.preparation.steps[i].timeConsumed.rest)
      )
        return false;
      for (let j = 0; j < a.preparation.steps[i].ingredients.length; j++) {
        if (!this.compareRecipesIngredientItem(i, a.preparation.steps[i].ingredients[j], b.preparation.steps[i].ingredients[j]))
          return false;
      }
    }

    return true;
  }

  public get acceptedUploadMimetypes(): string[] {
    return this._acceptedUploadMimetypes;
  }
  public get acceptedUploadFilesize(): number {
    return this._acceptedUploadFilesize;
  }

  private compareRecipesIngredientItem(i: number, a: RecipeIngredient, b: RecipeIngredient): boolean {
    if (
      !this.compareRecipesStrItem(`ingredient-${i}.description`, a.description, b.description) ||
      !this.compareRecipesStrNumber(`ingredient-${i}.quantity`, a.quantity, b.quantity) ||
      !this.compareRecipesStrItem(`ingredient-${i}.unit.name`, a.unit.name, b.unit.name)
    )
      return false;
    return true;
  }

  private compareRecipesStrItem(key: string, a: string, b: string): boolean {
    if (a.toLocaleLowerCase() !== b.toLocaleLowerCase()) {
      return false;
    }
    return true;
  }

  private compareRecipesStrNumber(key: string, a: number | null, b: number | null): boolean {
    if (a !== b) {
      return false;
    }
    return true;
  }

  createRecipe(): Subject<Recipe | boolean> {
    let subject = new Subject<Recipe | boolean>();
    this.authService.post('recipe/create', {}).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Created) {
        subject.next(<Recipe>reply.body.recipe);
        this.recipeCache[(<Recipe>reply.body.recipe).id] = <Recipe>reply.body.recipe;
        this.saveRecipeCache();
      }
      else
        subject.next(false);
      subject.complete();
    });
    return subject;
  }

  public getCategory(key: string | number): RecipeCategory | undefined {
    if (typeof key == 'string')
      return this.categories$.value.list[key];
    if (this.categoriesIdCache[key] == undefined)
      return undefined;
    return this.categories$.value.list[this.categoriesIdCache[key]];
  }

  public getCategoryItem(catkey: string | number | undefined, itemkey: string | number): RecipeCategoryItem | undefined {
    if (catkey == undefined) {
      if (typeof itemkey == 'string')
        return undefined;
      if (this.categoryItemsIdCache[itemkey] == undefined)
        return undefined;
      return this.getCategoryItem(this.categoryItemsIdCache[itemkey][1], this.categoryItemsIdCache[itemkey][0]);
    }
    let cat = this.getCategory(catkey);
    if (cat == undefined)
      return undefined;
    if (typeof itemkey == 'string')
      return cat.items[itemkey];
    if (this.categoryItemsIdCache[itemkey] == undefined)
      return undefined;
    return cat.items[this.categoryItemsIdCache[itemkey][0]];
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  loadCategories(): void {
    this.authService.get(`categories`).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Ok) {
        const replyobj = <CategoriesCache>reply.body;
        if (replyobj.ts != this.categories$.value.ts) {
          this.categories$.next(this.updateCategoriesLocalization(replyobj));
        }
      }
    });
  }

  loadRecipe(id: number): BehaviorSubject<Recipe | boolean> {
    let subject = new BehaviorSubject<Recipe | boolean>(this.recipeCache[id] != undefined ? this.recipeCache[id] : true);
    this.authService.get(`recipe/${id}`).subscribe((reply: ApiReply) => {
      if (reply.status === HttpStatusCode.Ok) {
        subject.next(<Recipe>reply.body);
        this.recipeCache[(<Recipe>reply.body).id] = <Recipe>reply.body;
        this.saveRecipeCache();
      }
      else
        subject.next(false);
      subject.complete();
    });
    return subject;
  }

  private loadRecipeCache(): void {
    const cache: string | null = sessionStorage.getItem('kbCacheRecipes');
    if (cache != null)
      this.recipeCache = JSON.parse(cache);
  }

  precheckFileinputForUpload(
    reason: 'pictureForRecipeGallery' | 'pictureForAiRecipeGeneration',
    element: HTMLInputElement,
    recipe: Recipe | undefined,
    errorTitle: string,
  ): boolean | null {
    if (recipe == undefined || element.files == null || element.files.length == 0)
      return null;
    for (let i = 0; i < element.files.length; i++) {
      const file = element.files[i];
      if (file.type == '' || !this._acceptedUploadMimetypes.includes(file.type)) {
        this.showWarningToast(errorTitle, this.ln(this.l10n.locale.views.recipe.pictureUpload.apiResponse[`code-${element.files.length == 1 ? 12 : 13}`], [`${i + 1}`]))
        return false;
      }
      if (file.size <= 0 || file.size > this.acceptedUploadFilesize) {
        this.showWarningToast(errorTitle, this.ln(this.l10n.locale.views.recipe.pictureUpload.apiResponse[`code-${element.files.length == 1 ? 10 : 11}`], [`${i + 1}`]))
        return false;
      }
    }
    return true;
  }

  resetCurrentRecipeId(): void {
    this.currentRecipeId$.next(null);
    this.unsavedChanges('');
  }

  private saveRecipeCache(): void {
    sessionStorage.setItem(`kbCacheRecipes`, JSON.stringify(this.recipeCache));
  }

  setCurrentRecipeId(id: number): void {
    this.currentRecipeId$.next(id);
  }

  showDangerToast(title: string, message: string): void {
    this.toastr.error(message, title, { positionClass: 'toast-top-center' });
  }

  showSuccessToast(title: string, message: string): void {
    this.toastr.success(message, title, { positionClass: 'toast-top-center' });
  }

  showWarningToast(title: string, message: string): void {
    this.toastr.warning(message, title, { positionClass: 'toast-top-center' });
  }

  unsavedChanges(recipeName: string): void {
    this.showUnsavedRecipeChanges$.next(recipeName !== '');
    this.editRecipeName$.next(recipeName);
  }

  updateCategoriesLocalization(cachein: CategoriesCache): CategoriesCache {
    let cacheout = { ...cachein };
    if (this.locale == '')
      return cacheout;
    Object.keys(cacheout.list).forEach((catkey) => {
      if (this.l10nService.locale.views.recipe.categories[catkey] == undefined) {
        console.warn(`Missing localisation for category ${catkey}`);
        return;
      }
      cacheout.list[catkey].l10nname = this.l10nService.locale.views.recipe.categories[catkey].name;
      Object.keys(cacheout.list[catkey].items).forEach((itemkey) => {
        if (this.l10nService.locale.views.recipe.categories[catkey].items[itemkey] == undefined) {
          console.warn(`Missing localisation for category ${catkey}.${itemkey}`);
          return;
        }
        cacheout.list[catkey].items[itemkey].l10nname = this.l10nService.locale.views.recipe.categories[catkey].items[itemkey];
      });
    });
    return cacheout;
  }

  updateRecipe(recipe: Recipe): Subject<[number, RecipeEditReply]> {
    let subject = new Subject<[number, RecipeEditReply]>();
    this.authService.post(`recipe/${recipe.id}/edit`, { recipe: recipe }).subscribe((reply: ApiReply) => {
      subject.next([reply.status, <RecipeEditReply>reply.body]);
      this.recipeCache[(<RecipeEditReply>reply.body).recipe.id] = (<RecipeEditReply>reply.body).recipe;
      this.saveRecipeCache();
      subject.complete();
    });
    return subject;
  }

  uploadFileForAiBot(recipe: Recipe | undefined, files: FileList): Subject<[number, RecipeEditReply]> {
    let subject = new Subject<[number, RecipeEditReply]>();
    let formData = new FormData();
    Array.from(files).forEach((file, i) => {
      formData.append(`file-${i}`, file, file.name);
    })
    this.authService.post((recipe ? `recipe/ai/scan/${recipe.id}` : `recipe/ai/scan`), formData).subscribe((reply: ApiReply) => {
      subject.next([reply.status, <RecipeEditReply>reply.body]);
      if (reply.status == HttpStatusCode.Accepted)
        this.recipeCache[(<RecipeEditReply>reply.body).recipe.id] = (<RecipeEditReply>reply.body).recipe;
      subject.complete();
    });
    return subject;
  }

  uploadFiles(recipe: Recipe, files: FileList): Subject<[number, RecipeEditReply]> {
    let subject = new Subject<[number, RecipeEditReply]>();
    let formData = new FormData();
    Array.from(files).forEach((file, i) => {
      formData.append(`file-${i}`, file, file.name);
    })
    this.authService.post(`recipe/${recipe.id}/picture/add`, formData).subscribe((reply: ApiReply) => {
      subject.next([reply.status, <RecipeEditReply>reply.body]);
      if (reply.status == HttpStatusCode.Accepted)
        this.recipeCache[(<RecipeEditReply>reply.body).recipe.id] = (<RecipeEditReply>reply.body).recipe;
      subject.complete();
    });
    return subject;
  }

}

export function urlenc(value: string): string {
  return value.replace(/[^A-Za-z0-9_äöüÄÖÜßẞ]/g, '-').split('-').filter((value) => value != '').join('-');
}

export interface CategoriesCache {
  list: { [key: string]: RecipeCategory };
  ts: string;
}

export interface RecipeEditReply {
  errorCode: number;
  errorMessage?: string;
  recipe: Recipe;
  userError: boolean;
}

export interface UserSettings {
  locale: string;
}
