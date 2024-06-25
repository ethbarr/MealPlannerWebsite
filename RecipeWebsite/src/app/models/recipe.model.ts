export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  ratings: number;
  isFavorite: boolean;
  thumbnail: string;
}
