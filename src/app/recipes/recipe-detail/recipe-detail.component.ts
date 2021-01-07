import { RecipeService } from './../recipe.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe_detail: Recipe;
  id: number;
  constructor(private shoppingListService: ShoppingListService, public route: ActivatedRoute, private recipeService: RecipeService, private mainRoute: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        // adding a + to cast the string into a number
        this.id = +params['id'];
        this.recipe_detail = this.recipeService.getSingleRecipe(this.id);
      })
    // this.route.data.subscribe(value => {

    //   this.id = value.id;
    //   console.log(this.id);
    //   this.recipe_detail = this.recipeService.getSingleRecipe(this.id);
    // });
  }
  addIngredientsToShoppingList() {
    // for (let ingredient of this.recipe_detail.ingredients) {
    //   this.shoppingListService.addIngredient(ingredient);
    // }
    this.shoppingListService.addMultipleIngredients(this.recipe_detail.ingredients);
  }
  onEachRecipeEditClickedRoute() {
    this.recipeService.eachRecipeEditEvent.emit(this.id)
    this.mainRoute.navigate(['edit'], { relativeTo: this.route });
  }

}
