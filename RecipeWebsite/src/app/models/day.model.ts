import { Recipe } from './recipe.model';
export interface Day {
  name: string;
  meals: {
    breakfast: Recipe[];
    lunch: Recipe[];
    dinner: Recipe[];
    snack: Recipe[];
  };
}
