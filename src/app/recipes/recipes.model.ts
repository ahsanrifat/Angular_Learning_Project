import { Ingredient } from "../shared/ingredient.model";

// we define how a single recipe looks like
export class Recipe {

  constructor(public name: string, public description: string, public imagePath: string, public ingredients: Ingredient[]) {
  }
}


