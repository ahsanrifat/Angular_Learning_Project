import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Apple", 5),
    new Ingredient("Apple", 5),
    new Ingredient("Apple", 5),
  ];
  constructor() { }
  getIngredients() {
    return this.ingredients.slice();
  }
}
