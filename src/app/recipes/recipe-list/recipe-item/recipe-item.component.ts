import { RecipeService } from './../../recipe.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // goal is to get the recipe from outside. @Input allows us bind this from outside
  @Input() recipe: Recipe;
  // to get the selected recipe event
  // @Output -> to listen to this event from outside
  // @Output() recipeSelected = new EventEmitter<void>();

  // a better way to let know the recipe detail about the selected recipe
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  onSelectRecipe() {
    this.recipeService.recipeSelectedEvent.emit(this.recipe);
    // console.log("----Recipe Item----")
    // console.log(this.recipeService.recipeSelectedEvent);
    // console.log("A Single Recipe Was Clicked", this.recipe);
    // this.recipeService.recipeSelectedEvent.
    //   subscribe(
    //     (recipe: Recipe) => {
    //       console.log("Recipe Selected from Subscribe", recipe)
    //     }
    //   )
  }
}
