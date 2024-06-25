import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RecipeService } from './services/recipe-service.service';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipesGridComponent } from './recipes-grid/recipes-grid.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    RecipesGridComponent,
    AddRecipeComponent,
    RecipeDetailComponent,
    NavbarComponent,
    MyRecipesComponent,
    CalendarComponent,
    MealPlannerComponent,
    GroceryListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule
  ],
  providers: [RecipeService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
