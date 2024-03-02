import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularDeviceInformationService } from 'angular-device-information';
import { formatISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { addIcon, attentionIcon, deleteIcon, saveIcon, sortDownIcon, sortUpDownIcon, sortUpIcon, spinnerIcon } from 'src/app/common/icons';
import { AuthService } from 'src/app/svc/auth.service';
import { L10nService } from 'src/app/svc/l10n.service';
import { Recipe } from 'src/app/svc/recipe';
import { SharedDataService, urlenc } from 'src/app/svc/shared-data.service';
import { UserAccount } from 'src/app/svc/user';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnDestroy, OnInit {

  loading = false;
  saving = false;
  private routeSub?: Subscription;
  private pageviewTimeout: any;
  private recipeId?: number;
  recipe?: Recipe;
  user?: UserAccount;
  isAdmin: boolean = false;
  isOwner: boolean = false;
  isMobile: boolean;
  isValid: boolean = false;
  isValidated: boolean = false;

  addIcon = addIcon;
  attentionIcon = attentionIcon;
  deleteIcon = deleteIcon;
  saveIcon = saveIcon;
  sortDownIcon = sortDownIcon;
  sortUpDownIcon = sortUpDownIcon;
  sortUpIcon = sortUpIcon;
  spinnerIcon = spinnerIcon;

  editRecipeObject?: Recipe;
  sortIngredientsSwitch: boolean = false;
  ingredientsPerStep: boolean = false;
  hasChanges = false;

  editSent: boolean = false;
  editErrorCode: number = 0;
  editErrorUsererror: boolean = false;
  editErrorMessage: string = '';

  @ViewChild('editorform') editorForm?: ElementRef<HTMLFormElement>;

  constructor(
    private l10nService: L10nService,
    private authService: AuthService,
    private dataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router,
    deviceInfo: AngularDeviceInformationService,
  ) {
    this.authService.user.subscribe((user) => this.user = user.id == 0 ? undefined : user);
    this.authService.isAdmin.subscribe((admin) => this.isAdmin = admin);
    this.isMobile = deviceInfo.isMobile() || deviceInfo.isTablet();
    this.dataService.showUnsavedRecipeChanges.subscribe((state) => this.hasChanges = state);
  }

  addStepPlaceholder(): void {
    if (this.editRecipeObject == undefined)
      return;
    let step = { index: 0, ingredients: [{ id: 0, description: '', quantity: null, unit: { id: 0, name: '', }, }], name: '', userContent: '', timeConsumed: { cooking: null, preparing: null, rest: null, total: null, unit: '', }, };
    this.editRecipeObject.preparation.steps.push(step);
    this.onChangeProperty();
  }

  public date(value: string | number | Date, form: string = 'PP'): string {
    return this.l10nService.date(value, form);
  }

  deleteStep(i: number): void {
    if (!this.editRecipeObject || !this.editRecipeObject.preparation.steps[i])
      return;
    this.editRecipeObject.preparation.steps.splice(i, 1);
    this.onChangeProperty();
  }

  get l10n(): L10nService {
    return this.l10nService;
  }

  ln(content: string, replacements: any[]): string {
    return this.l10nService.ln(content, replacements);
  }

  private loadFromCache(): void {
    const cache: string | null = localStorage.getItem(`kbCacheEditor_${this.recipeId ?? 0}`);
    if (cache != null)
      this.editRecipeObject = JSON.parse(cache);
    else if (this.recipe != undefined)
      this.editRecipeObject = { ...this.recipe };
    if (this.editRecipeObject?.preparation.steps.length === 0)
      this.addStepPlaceholder();
    this.onChangeProperty();
    this.ingredientsPerStep = this.editRecipeObject?.preparation.ingredientsGrouping == 'Steps';
    this.editorForm?.nativeElement.checkValidity();
  }

  private loadRecipe(): void {
    if (!this.recipeId)
      return;
    this.loading = true;
    this.dataService.loadRecipe(this.recipeId).subscribe((value) => {
      if (value === true)
        return;
      if (value === false) {
        // todo notify user
        this.loading = false;
        this.router.navigate(['/']);
        return;
      }
      this.recipe = { ...<Recipe>value };
      this.dataService.setCurrentRecipeId(this.recipe.id);
      this.isOwner = this.user != undefined && this.user.id == this.recipe.owner?.id;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
    clearTimeout(this.pageviewTimeout);
    this.recipeId = undefined;
    this.dataService.resetCurrentRecipeId();
    this.editRecipeObject = undefined;
    this.recipe = undefined;
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        const idmatch = params['id'].match(/^(?<id>\d+)\-?/);
        if (!idmatch)
          return;
        if (+idmatch.groups['id'] !== this.recipeId) {
          this.recipeId = +idmatch.groups['id'];
          this.loadRecipe();
        }
      } else {
        // id must be part of url. If not set, send user home
        this.router.navigate(['/']);
        return;
      }
      this.loadFromCache();
      this.updateCache();
    });
  }

  onChangeIngredientsGrouping(): void {
    if (!this.editRecipeObject)
      return;
    if (this.editRecipeObject.preparation.steps.length == 0)
      this.addStepPlaceholder();
    if (this.editRecipeObject.preparation.ingredientsGrouping == 'None') {
      this.editRecipeObject.preparation.steps[0].ingredients = [...this.editRecipeObject.preparation.ingredients];
      this.editRecipeObject.preparation.ingredients = [];
      this.editRecipeObject.preparation.ingredientsGrouping = 'Steps';
    } else /* Steps */ {
      this.editRecipeObject.preparation.ingredients = [...this.editRecipeObject.preparation.steps[0].ingredients];
      this.editRecipeObject.preparation.steps[0].ingredients = [];
      this.editRecipeObject.preparation.ingredientsGrouping = 'None';
    }
    this.onChangeProperty();
  }

  onChangeProperty() {
    if (!this.editRecipeObject || !this.recipe)
      return;
    this.editRecipeObject.editor = {
      lastedit: formatISO(Date.now()),
      haschanges: false,
    };
    this.recipe.editor = { ...this.editRecipeObject.editor };
    const haschanges = !this.dataService.compareRecipes(this.editRecipeObject, this.recipe);
    this.updateCache();
    this.dataService.unsavedChanges(haschanges ? this.editRecipeObject.name : '');
    this.editRecipeObject.editor.haschanges = haschanges;
  }

  onRevertChanges() {
    localStorage.removeItem(`kbCacheEditor_${this.recipeId ?? 0}`);
    if (this.recipe?.placeholder) {
      this.ngOnDestroy();
      this.router.navigate(['/']);
    }
    else {
      const recipeid = this.recipeId;
      this.ngOnDestroy();
      this.router.navigate(recipeid ? ['/recipe', recipeid] : ['/']);
    }
  }

  onSaveChanges() {
    if (this.saving || this.editRecipeObject == undefined)
      return;
    this.isValid = this.editorForm?.nativeElement.checkValidity() ?? false;
    this.isValidated = true;
    if (!this.isValid)
      return;
    this.saving = true;
    this.dataService.updateRecipe(this.editRecipeObject).subscribe((reply) => {
      this.saving = false;
      this.editSent = true;
      this.editErrorCode = reply[1]?.errorCode;
      this.recipe = { ...reply[1]?.recipe };
      this.editErrorMessage = this.l10n.locale.views.editor.apiResponse[`code-${reply[1]?.errorCode}`];
      this.editErrorUsererror = reply[1]?.userError;
      if (reply[0] === 201 || reply[0] === 202)
        this.onChangeProperty();
    });
  }

  onValidateChanges(): boolean {

    return false;
  }

  updateCache(): void {
    localStorage.setItem(`kbCacheEditor_${this.recipeId ?? 0}`, JSON.stringify(this.editRecipeObject));
  }

  urlenc(value: string): string {
    return urlenc(value);
  }

}