import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarService } from '../services/calendar.service'; // Adjust the import path as necessary
import { Recipe } from '../models/recipe.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})

export class GroceryListComponent implements OnInit, OnDestroy {
  @Input() ingredientsMap: Map<string, number> = new Map();
  public listState = 'out';
  private recipesSubscription: Subscription = new Subscription;

  constructor(private calendarService: CalendarService) { }

  ngOnDestroy() {
    if (this.recipesSubscription) {
      this.recipesSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.recipesSubscription = this.calendarService.selectedRecipes$.subscribe(recipes => {
      this.aggregateIngredients(recipes);
    });
  }

  aggregateIngredients(recipes: Recipe[]) {
    // Reset ingredientsMap for fresh calculation
    this.ingredientsMap = new Map<string, number>();

    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        // If the ingredient is already in the map, increment its count
        if (this.ingredientsMap.has(ingredient)) {
          let currentCount = this.ingredientsMap.get(ingredient) || 0;
          this.ingredientsMap.set(ingredient, currentCount + 1);
        } else {
          // Adding a new ingredient with a count of 1
          this.ingredientsMap.set(ingredient, 1);
        }
      });
    });

    // At this point, ingredientsMap contains all ingredients across all recipes
    // with their respective counts. This data can now be used to update the view.
  }

  toggleList() {
    this.listState = this.listState === 'out' ? 'in' : 'out';
  }
}

