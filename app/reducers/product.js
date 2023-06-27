import * as types from '../actions/actionsTypes';

const initialState = {
  lastUpdated: {},
  categories: [],
};

export default function product(state = initialState, action) {
  switch (action.type) {
    case types.PRODUCT.SET_PRODUCTS_LAST_UPDATED: {
      return {
        ...state,
        lastUpdated: {
          ...state.lastUpdated,
          ...action.lastUpdated,
        },
      };
    }
    case types.PRODUCT.SET_CATEGORIES: {
      return {
        ...state,
        categories: action.categories,
      };
    }
    default:
      return state;
  }
}
