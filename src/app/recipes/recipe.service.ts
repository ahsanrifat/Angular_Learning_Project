import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Recipe } from './recipes.model';

@Injectable()
// { providedIn: 'root' }
export class RecipeService {
  observeRecipeArrayChangeEvent = new EventEmitter();
  // recipeSelectedEvent = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe("Nutty Sweet Delish", "test recipe",
      "https://hips.hearstapps.com/delish/assets/17/39/1506456246-delish-healthy-chicken-casserole-1.jpg",
      [new Ingredient("Nuts", 5), new Ingredient("Milk", 10), new Ingredient("Cream", 2)]),
    new Recipe("Soya Pron Stick", "test recipe",
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-taco-lime-shrimp-still006-1527253576.jpeg",
      [new Ingredient("Sauce", 5), new Ingredient("Pron", 5), new Ingredient("Oil", 5)]),
    new Recipe("Brownie Blast", "test recipe",
      "https://cdn.loveandlemons.com/wp-content/uploads/2020/03/baking-recipes-1.jpg",
      [new Ingredient("Flour", 5), new Ingredient("Coco powder", 5), new Ingredient("Sugar", 5)]),
    new Recipe("Fruit Salsa", "test recipe",
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2019%2F11%2Fcranberry-salad.jpg",
      [new Ingredient("Strawberry", 5), new Ingredient("Mango", 5), new Ingredient("Pine Apple", 5)]),
  ];
  constructor() { }
  getRecipes() {
    // slice return another object of the array so that main recipe array can not be modified from outside
    return this.recipes.slice();
  }
  getSingleRecipe(index: number) {
    return this.recipes[index];
  }
  addNewRecipe(newRecipe: Recipe) {
    // console.log(newRecipe)
    this.recipes.push(newRecipe);
    this.observeRecipeArrayChangeEvent.emit();
  }
  editRecipe(editedRecipe: Recipe, index: number) {
    this.recipes[index] = editedRecipe;
    this.observeRecipeArrayChangeEvent.emit();
  }
  deleteRecipe(deleteRecipe: Recipe) {

  }
}
