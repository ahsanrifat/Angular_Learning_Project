import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // child view reference to get the data from template
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  // Emit event to pass name and amount to shopping-list (parent component)
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  selectedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.editIngredientEvent
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.selectedItemIndex = index;
          this.editedItem = this.shoppingListService.getAnIngredient(index);
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      )
  }
  ngAfterViewInit() { }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onAddItem(form: NgForm) {
    const data = (form.value)
    // declare something constant if you are not planning to change something
    // const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    // this.ingredientAdded.emit(newIngredient);
    // Working Fine
    // console.log("New Ingredient shopping edit comp", newIngredient);

    const newIngredient = new Ingredient(data['name'], data['amount']);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(newIngredient);
    } else {
      this.shoppingListService.updateAnIngredient(newIngredient, this.selectedItemIndex);
      this.editMode = false;
      this.shoppingListForm.reset();
    }
  }
  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }
  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteAnIngredient(this.selectedItemIndex);
      this.editMode = false;
      this.shoppingListForm.reset();
    }
  }
}
