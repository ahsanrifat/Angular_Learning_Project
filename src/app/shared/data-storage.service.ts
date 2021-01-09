import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipeArray = this.recipeService.getRecipes();
    this.http.put
      (
        'https://angular-course-db-7d61d-default-rtdb.firebaseio.com/recipes.json',
        recipeArray
      )
      .subscribe
      (
        (response) => { console.log(response) }
      )
  }
  fetchRecipes() {
    this.http.get<Recipe[]>
      (
        'https://angular-course-db-7d61d-default-rtdb.firebaseio.com/recipes.json'
      )
      .subscribe
      (
        (recipeArray) => {
          this.recipeService.setRecipeArray(recipeArray);
        }
      )
  }
}
