import { Component, OnInit, ViewChild } from '@angular/core';
import { GroceryListComponent } from '../grocery-list/grocery-list.component'; 


@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.css']
})

export class MealPlannerComponent {
  public listState = 'out';
  public ingredientsMap: Map<string, number> = new Map();

  @ViewChild(GroceryListComponent) groceryList!: GroceryListComponent;

  toggleGroceryList() {
    this.groceryList.toggleList();
  }
}
