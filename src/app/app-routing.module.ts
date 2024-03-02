import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './svc/auth.guard';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { LogoutComponent } from './view/logout/logout.component';
import { MyRecipesComponent } from './view/my-recipes/my-recipes.component';
import { RecipeComponent } from './view/recipe/recipe.component';
import { EditorComponent } from './view/editor/editor.component';
import { CreateComponent } from './view/editor/create/create.component';
import { AiEditorComponent } from './view/ai-editor/ai-editor.component';
import { UserRecipesComponent } from './view/user-recipes/user-recipes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'login/oauth2', component: LoginComponent, canActivate: [authGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
  { path: 'recipe/ai-scanner', component: AiEditorComponent, canActivate: [authGuard] },
  { path: 'recipe/edit/:id', component: EditorComponent, canActivate: [authGuard] },
  { path: 'recipe/gallery/:id', component: RecipeComponent, canActivate: [authGuard] },
  { path: 'recipe/new', component: CreateComponent, canActivate: [authGuard] },
  { path: 'recipe/:id', component: RecipeComponent, canActivate: [authGuard] },
  { path: 'recipes/my', component: MyRecipesComponent, canActivate: [authGuard] },
  { path: 'recipes/user/:id', component: UserRecipesComponent, canActivate: [authGuard] },
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [authGuard] },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
