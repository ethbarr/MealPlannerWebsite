// recipe-card.component.ts
import { Component, Input } from '@angular/core';
import { DEFAULT_IMAGE_BASE64 } from '../../assets/constants';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() recipe: any;
  @Input() disableNavigation: boolean = false;

  defaultImage: string = DEFAULT_IMAGE_BASE64;
  imageHasError: boolean = false;

  onImageError(event: Event) {
    if (!this.imageHasError) {
      console.log('Image load error, using default image:', this.defaultImage);
      (event.target as HTMLImageElement).src = this.defaultImage;
      this.imageHasError = true; // Prevent further retries
    }
  }

  toggleFavorite() {
    this.recipe.isFavorite = !this.recipe.isFavorite;
  }
}
