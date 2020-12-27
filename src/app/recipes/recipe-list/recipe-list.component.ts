import { Recipe } from './../recipes.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeService]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
  onRecipeSelectedList(selectedRecipe: Recipe) {
    this.recipeWasSelected.emit(selectedRecipe);
    // console.log("On recipe Selected passed to recipe-list component", selectedRecipe);
  }
}


