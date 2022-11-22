import { Ingredient } from '../shared/ingredient.module';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 13)],
};

export function shoppingListReducer(state = initialState, action) {}
