import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe-service.service';
import { Recipe } from '../models/recipe.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropConnectionsService } from '../services/drag-drop-connections.service';


@Component({
  selector: 'app-recipes-grid',
  templateUrl: './recipes-grid.component.html',
  styleUrls: ['./recipes-grid.component.css']
})
export class RecipesGridComponent implements OnInit {
  recipes: Recipe[] = []; 

  constructor(private recipeService: RecipeService, private dragDropConnectionsService: DragDropConnectionsService) { }

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes(): void {
    this.recipeService.getRecipes().subscribe({
      next: (data: Recipe[]) => {
        this.recipes = data;
        console.log('fetch recipes: ', this.recipes); // Moved inside the next callback
      },
      error: (error) => {
        console.error('Failed to load recipes', error);
      }
      // Optionally, you can add a complete callback here if needed
    });
  }

  drop(event: CdkDragDrop<Recipe[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  getConnectedDropListIds(): string[] {
    return this.dragDropConnectionsService.getConnections();
  }

}

