import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.eachRecipeEditEvent
      .subscribe((index: number) => {
        this.editMode = true;
        this.id = index;
        this.initForm();
      })
    if (!this.editMode) {
      this.initForm();
    }
  }
  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";

    if (this.editMode) {
      const recipe = this.recipeService.getSingleRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      console.log(recipeName, recipeImagePath, recipeDescription);
    }
    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName),
        'imagePath': new FormControl(recipeImagePath),
        'description': new FormControl(recipeDescription)
      }
    );
  }
  onSubmit() {
    console.log(this.recipeForm)
  }
}
