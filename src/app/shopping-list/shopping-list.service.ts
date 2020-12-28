import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
//
export class ShoppingListService {
  // Event emitter to inform component about the new ingredient adding
  ingredientChangedEvent = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Salt", 5),
  ]
  constructor() { }
  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientChangedEvent.emit(this.ingredients.slice());
  }
  addMultipleIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChangedEvent.emit(this.ingredients.slice());
  }
}
