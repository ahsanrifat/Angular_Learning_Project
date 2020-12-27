import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe("recipe 01", "test recipe", "https://hips.hearstapps.com/delish/assets/17/39/1506456246-delish-healthy-chicken-casserole-1.jpg"),
    new Recipe("recipe 02", "test recipe", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-taco-lime-shrimp-still006-1527253576.jpeg"),
    new Recipe("recipe 03", "test recipe", "https://cdn.loveandlemons.com/wp-content/uploads/2020/03/baking-recipes-1.jpg"),
    new Recipe("recipe 04", "test recipe", "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2019%2F11%2Fcranberry-salad.jpg"),
  ];
  constructor() { }
  getRecipes() {
    // slice return another object of the array so that main recipe array can not be modified from outside
    return this.recipes.slice();
  }
}
