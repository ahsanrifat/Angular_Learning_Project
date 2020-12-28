
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe_detail: Recipe;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }
  addIngredientsToShoppingList() {
    // for (let ingredient of this.recipe_detail.ingredients) {
    //   this.shoppingListService.addIngredient(ingredient);
    // }
    this.shoppingListService.addMultipleIngredients(this.recipe_detail.ingredients);
  }

}
