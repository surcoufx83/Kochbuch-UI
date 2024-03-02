import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularDeviceInformationService } from 'angular-device-information';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './common/alert/alert.component';
import { H3Component } from './common/h3/h3.component';
import { H4Component } from './common/h4/h4.component';
import { H5Component } from './common/h5/h5.component';
import { IconComponent } from './common/icon/icon.component';
import { FooterbarComponent } from './main/footerbar/footerbar.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { AuthService } from './svc/auth.service';
import { L10nService } from './svc/l10n.service';
import { SharedDataService } from './svc/shared-data.service';
import { EditorComponent } from './view/editor/editor.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { LogoutComponent } from './view/logout/logout.component';
import { MyRecipesComponent } from './view/my-recipes/my-recipes.component';
import { RecipeCardCategoriesComponent } from './view/recipe-card-categories/recipe-card-categories.component';
import { RecipeHCardComponent } from './view/recipe-h-card/recipe-h-card.component';
import { RecipeVCardComponent } from './view/recipe-v-card/recipe-v-card.component';
import { HeaderComponent } from './view/recipe/header/header.component';
import { IngredientsComponent } from './view/recipe/ingredients/ingredients.component';
import { ManageComponent } from './view/recipe/manage/manage.component';
import { MobileShortcutsComponent } from './view/recipe/mobile-shortcuts/mobile-shortcuts.component';
import { PicturesComponent } from './view/recipe/pictures/pictures.component';
import { RecipeComponent } from './view/recipe/recipe.component';
import { ItemComponent } from './view/recipe/steps/item/item.component';
import { StepsComponent } from './view/recipe/steps/steps.component';
import { TimeconsumptionComponent } from './view/recipe/timeconsumption/timeconsumption.component';
import { ModalsComponent } from './view/recipe/voting/modals/modals.component';
import { VotingComponent } from './view/recipe/voting/voting.component';
import { StatusNavbarComponent } from './main/status-navbar/status-navbar.component';
import { EditorHeaderComponent } from './view/editor/header/header.component';
import { FormFieldComponent } from './view/editor/form-field/form-field.component';
import { FormTextareaComponent } from './view/editor/form-textarea/form-textarea.component';
import { FormNumberFieldComponent } from './view/editor/form-number-field/form-number-field.component';
import { EditorIngredientsComponent } from './view/editor/ingredients/ingredients.component';
import { AddBtnComponent } from './view/editor/add-btn/add-btn.component';
import { DiscardChangesModalComponent } from './view/editor/discard-changes-modal/discard-changes-modal.component';
import { CreateComponent } from './view/editor/create/create.component';
import { CustomizableAlertComponent } from './common/customizable-alert/customizable-alert.component';
import { AiEditorComponent } from './view/ai-editor/ai-editor.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRecipesComponent } from './view/user-recipes/user-recipes.component';
import { ModernSearchComponent } from './main/navbar/modern-search/modern-search.component';

@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    FooterbarComponent,
    H3Component,
    H4Component,
    H5Component,
    HeaderComponent,
    HomeComponent,
    IconComponent,
    IngredientsComponent,
    ItemComponent,
    LoginComponent,
    LogoutComponent,
    ManageComponent,
    MobileShortcutsComponent,
    ModalsComponent,
    MyRecipesComponent,
    NavbarComponent,
    PicturesComponent,
    RecipeCardCategoriesComponent,
    RecipeComponent,
    RecipeHCardComponent,
    RecipeVCardComponent,
    SidebarComponent,
    StepsComponent,
    TimeconsumptionComponent,
    VotingComponent,
    EditorComponent,
    StatusNavbarComponent,
    EditorHeaderComponent,
    FormFieldComponent,
    FormTextareaComponent,
    FormNumberFieldComponent,
    EditorIngredientsComponent,
    AddBtnComponent,
    DiscardChangesModalComponent,
    CreateComponent,
    CustomizableAlertComponent,
    AiEditorComponent,
    UserRecipesComponent,
    ModernSearchComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AngularDeviceInformationService,
    AuthService,
    L10nService,
    SharedDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
