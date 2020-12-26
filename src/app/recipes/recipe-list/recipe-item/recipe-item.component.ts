import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // goal is to get the recipe from outside. @Input allows us bind this from outside
  @Input() recipe: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

}
