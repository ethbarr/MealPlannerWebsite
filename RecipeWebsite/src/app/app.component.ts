import { Component, OnInit } from '@angular/core';
import { RecipeService } from './services/recipe-service.service';
import { Recipe } from './models/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (data: Recipe[]) => {
        this.recipes = data;
      },
      error: (error: any) => console.error('Failed to fetch recipes', error)
    });
  }

  toggleFavorite(recipe: Recipe): void {
    recipe.isFavorite = !recipe.isFavorite;
  }
}
