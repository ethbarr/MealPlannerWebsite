import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private selectedRecipesSource = new BehaviorSubject<Recipe[]>([]);
  selectedRecipes$ = this.selectedRecipesSource.asObservable();

  constructor() { }

  addRecipeToCalendar(recipe: Recipe): void {
    console.log('Adding recipe to calendar:', recipe);
    const currentRecipes = this.selectedRecipesSource.getValue();
    this.selectedRecipesSource.next([...currentRecipes, recipe]);
    console.log('Added recipe to calendar:');
  }

  getSelectedRecipes(): Recipe[] {
    return this.selectedRecipesSource.getValue();
  }
}
