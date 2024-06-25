import { Recipe } from './recipe.model';

export interface Meal {
  name: string;
  recipes: Recipe[];
}
