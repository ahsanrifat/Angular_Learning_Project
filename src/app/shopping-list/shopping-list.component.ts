import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  private igChangeSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientChangedEvent
      .subscribe((ingredients: Ingredient[]) => {
        // console.log("Changed Ingredient Array");
        this.ingredients = ingredients;
      });
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
  onEditItem(index: number) {
    this.shoppingListService.editIngredientEvent.next(index)
  }
  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  //   // working fine
  //   // console.log("Got new ingredient from child shopping edit comp", ingredient);
  // }
}
