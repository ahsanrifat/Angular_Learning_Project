import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
//
export class ShoppingListService {
  // Event emitter to inform component about the new ingredient adding
  editIngredientEvent = new Subject<number>();
  ingredientChangedEvent = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Salt", 5),
  ]
  constructor() { }
  getIngredients() {
    return this.ingredients.slice();
  }
  getAnIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientChangedEvent.next(this.ingredients.slice());
  }
  addMultipleIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChangedEvent.next(this.ingredients.slice());
  }
  updateAnIngredient(ingredient: Ingredient, index: number) {
    this.ingredients[index] = ingredient;
    this.ingredientChangedEvent.next(this.ingredients.slice());
  }
  deleteAnIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChangedEvent.next(this.ingredients.slice());
  }
}
