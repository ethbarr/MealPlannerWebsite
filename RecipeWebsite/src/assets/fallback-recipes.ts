import { Recipe } from '../app/models/recipe.model'
import { DEFAULT_IMAGE_BASE64 } from './constants';

export const FALLBACK_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'The Slop Bucket',
    description: 'A steaming hot pile of noodles with hot beef sauce...',
    category: 'Main Course',
    ingredients: ['SpaghettiOs', 'flour', 'sugar', 'eggs', 'milk'],
    instructions: ['Boil water', 'Add noodles', 'Mix in sauce'],
    ratings: 5,
    isFavorite: true,
    thumbnail: DEFAULT_IMAGE_BASE64
  },
  {
    id: '2',
    name: 'Franks and Beans',
    description: 'A delicious hotdog slathered in brown mustard with a side of beans...',
    category: 'Main Course',
    ingredients: ['Hotdogs', 'beans', 'mustard'],
    instructions: ['Grill hotdogs', 'Heat beans', 'Serve with mustard'],
    ratings: 4,
    isFavorite: false,
    thumbnail: DEFAULT_IMAGE_BASE64
  },
  {
    id: '3',
    name: 'Dill Pickle Ice Cream',
    description: 'This mud pie recipe is a dynamite version of a favorite dessert made by layering ice cream, chocolate fudge sauce, and cookies!',
    category: 'Dessert',
    ingredients: ['Ice cream', 'chocolate fudge', 'cookies'],
    instructions: ['Layer ice cream', 'Add fudge', 'Top with cookies'],
    ratings: 5,
    isFavorite: true,
    thumbnail: DEFAULT_IMAGE_BASE64
  }
];
