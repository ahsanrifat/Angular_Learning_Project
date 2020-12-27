import { Recipe } from './../recipes.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("recipe 01", "test recipe", "https://hips.hearstapps.com/delish/assets/17/39/1506456246-delish-healthy-chicken-casserole-1.jpg"),
    new Recipe("recipe 02", "test recipe", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-taco-lime-shrimp-still006-1527253576.jpeg"),
    new Recipe("recipe 03", "test recipe", "https://cdn.loveandlemons.com/wp-content/uploads/2020/03/baking-recipes-1.jpg"),
    new Recipe("recipe 04", "test recipe", "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2019%2F11%2Fcranberry-salad.jpg"),
  ];
  constructor() { }

  ngOnInit(): void {
  }
  onRecipeSelectedList(selectedRecipe: Recipe) {
    this.recipeWasSelected.emit(selectedRecipe);
    // console.log("On recipe Selected passed to recipe-list component", selectedRecipe);
  }
}


