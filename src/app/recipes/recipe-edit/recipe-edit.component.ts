import { Ingredient } from './../../shared/ingredient.model';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  selectedRecipeIndex: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.selectedRecipeIndex = +params['id'];
          this.editMode = params['id'] != null;
          console.log(this.editMode)
          this.initForm();
        }
      );
  }
  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getSingleRecipe(this.selectedRecipeIndex);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup(
              {
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl
                  (
                    ingredient.amount,
                    [
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/)
                    ]
                  )
              }
            )
          )
        }
      }
    }
    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeIngredients
      }
    );
  }
  onSubmit() {
    const formRecipe =
      new Recipe
        (
          this.recipeForm.value.name,
          this.recipeForm.value.description,
          this.recipeForm.value.imagePath,
          this.recipeForm.value.ingredients
        )
    if (!this.editMode) {
      this.recipeService.addNewRecipe(formRecipe);
      this.editMode = false;
      this.recipeForm.reset();
    } else {
      this.recipeService.editRecipe(formRecipe, this.selectedRecipeIndex);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(
          null,
          [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ]
        )
      })
    )
  }
  onDeleteIngredient(ingredientIndex: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingredientIndex);
  }
}
