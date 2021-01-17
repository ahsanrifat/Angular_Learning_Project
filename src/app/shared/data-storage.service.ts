import { RecipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipes.model';
import { map, take, tap } from "rxjs/operators"
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthServiceService,
  ) { }

  storeRecipes() {
    let token: string = null;
    this.authService.currentUserSubject.pipe(take(1)).subscribe(res => {
      token = res.token;
    })
    const recipeArray = this.recipeService.getRecipes();
    // let token:string =null;
    this.http.put
      (
        'https://angular-course-db-7d61d-default-rtdb.firebaseio.com/recipes.json?auth=' + token,
        // {
        //   params: new HttpParams().set('auth', token)
        // },
        recipeArray
      )
      .subscribe
      (
        (response) => { console.log(response) }
      )
  }
  fetchRecipes() {
    let token: string = null;
    this.authService.currentUserSubject.pipe(take(1)).subscribe(res => {
      token = res.token;
    })
    return this.http.get<Recipe[]>
      (
        'https://angular-course-db-7d61d-default-rtdb.firebaseio.com/recipes.json',
        {
          params: new HttpParams().set('auth', token)
        }
      )
      .pipe
      (
        map(recipeArray => {
          return (<Recipe[]>recipeArray).map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          }
          )
        }
        ),
        tap(recipes => { this.recipeService.setRecipeArray(recipes); })
      )
    // return this.http.get('https://angular-course-db-7d61d-default-rtdb.firebaseio.com/recipes.json');

    // .subscribe
    // (
    //   (recipeArray) => {
    //     this.recipeService.setRecipeArray(recipeArray);
    //   }
    // )
  }
}
