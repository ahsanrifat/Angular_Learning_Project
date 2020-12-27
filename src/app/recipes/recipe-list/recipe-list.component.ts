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
    new Recipe("recipe 02", "test recipe", "https://hips.hearstapps.com/delish/assets/17/39/1506456246-delish-healthy-chicken-casserole-1.jpg"),
    new Recipe("recipe 03", "test recipe", "https://hips.hearstapps.com/delish/assets/17/39/1506456246-delish-healthy-chicken-casserole-1.jpg"),
    new Recipe("recipe 04", "test recipe", "https://hips.hearstapps.com/delish/assets/17/39/1506456246-delish-healthy-chicken-casserole-1.jpg"),
  ];
  constructor() { }

  ngOnInit(): void {
  }
  onRecipeSelectedList(selectedRecipe: Recipe) {
    this.recipeWasSelected.emit(selectedRecipe);
    // console.log("On recipe Selected passed to recipe-list component", selectedRecipe);
  }
}


