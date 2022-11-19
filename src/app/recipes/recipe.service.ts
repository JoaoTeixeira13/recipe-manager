import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

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

  constructor(private slService: ShoppingListService) {}

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
    this.slService.addIngredients(ingredients);
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
