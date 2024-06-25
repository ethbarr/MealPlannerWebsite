import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FALLBACK_RECIPES } from '../../assets/fallback-recipes';
import { Recipe } from '../models/recipe.model'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://localhost:7060/recipes';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(error => {
        console.error('API request failed, loading fallback recipes', error);
        return of(FALLBACK_RECIPES);
      })
    );
  }

  getRecipeById(id: string): Observable<Recipe> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      catchError(this.handleError<Recipe>(`getRecipeById id=${id}`))
    );
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Recipe>(this.apiUrl, recipe, httpOptions).pipe(
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
