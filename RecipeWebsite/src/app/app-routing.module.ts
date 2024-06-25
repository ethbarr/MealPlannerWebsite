import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesGridComponent } from './recipes-grid/recipes-grid.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/meal-planner', pathMatch: 'full' },
  { path: 'meal-planner', component: MealPlannerComponent },
  { path: 'recipes', component: RecipesGridComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: 'my-recipes', component: MyRecipesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'grocery-list', component: GroceryListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

