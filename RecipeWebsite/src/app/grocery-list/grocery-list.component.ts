import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service'; // Adjust the import path as necessary
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  ingredientsMap: Map<string, number> = new Map();

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.aggregateIngredients();
  }

  aggregateIngredients(): void {
    const recipes: Recipe[] = this.calendarService.getSelectedRecipes(); // Fetch scheduled recipes
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (this.ingredientsMap.has(ingredient)) {
          this.ingredientsMap.set(ingredient, this.ingredientsMap.get(ingredient)! + 1);
        } else {
          this.ingredientsMap.set(ingredient, 1);
        }
      });
    });
  }
}

