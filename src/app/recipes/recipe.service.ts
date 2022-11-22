import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.module';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Mousaka',
  //     'Layers of Tomato and cheese',
  //     'https://www.themediterraneandish.com/wp-content/uploads/2021/10/moussaka-recipe-75.jpg',
  //     [
  //       new Ingredient('eggplant', 3),
  //       new Ingredient('tomatoes', 8),
  //       new Ingredient('cheese', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Mousaka Revamped',
  //     "Ashanti's Moussaka",
  //     'https://www.themediterraneandish.com/wp-content/uploads/2021/10/moussaka-recipe-75.jpg',
  //     [
  //       new Ingredient('eggplant', 3),
  //       new Ingredient('tomatoes', 8),
  //       new Ingredient('cheese', 1),
  //       new Ingredient("Ashanti's essence", 1),
  //       new Ingredient('muscat', 2),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromShoppingList.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
