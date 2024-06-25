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
    const currentRecipes = this.selectedRecipesSource.getValue();
    this.selectedRecipesSource.next([...currentRecipes, recipe]);
  }

  getSelectedRecipes(): Recipe[] {
    return this.selectedRecipesSource.getValue();
  }
}
