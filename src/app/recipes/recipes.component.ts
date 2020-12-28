import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    console.log(this.recipeService.getRecipes());
    this.recipeService.recipeSelectedEvent.
      subscribe(
        (recipe: Recipe) => {
          this.selectedRecipe = recipe;
        }
      )

  }
}
