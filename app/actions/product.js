import * as types from './actionsTypes';

export function setProductsLastUpdated(lastUpdated) {
  return {
    type: types.PRODUCT.SET_PRODUCTS_LAST_UPDATED,
    lastUpdated,
  };
}

export function setCategories(categories) {
  return {
    type: types.PRODUCT.SET_CATEGORIES,
    categories,
  };
}
