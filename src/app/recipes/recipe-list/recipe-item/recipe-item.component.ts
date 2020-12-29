import { Component, OnInit, Input } from '@angular/core';
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
  @Input() index: number;
  // a better way to let know the recipe detail about the selected recipe
  constructor() { }

  ngOnInit(): void {
  }

}
