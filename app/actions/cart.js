import * as types from './actionsTypes';

export function addToCart(product) {
  return {
    type: types.CART.ADD,
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: types.CART.REMOVE,
    id,
  };
}

export function clearCart() {
  return {
    type: types.CART.CLEAR,
  };
}

export function reOrder(cart) {
  return {
    type: types.CART.RE_ORDER,
    cart,
  };
}

export function setPostcode(customerPostcode) {
  return {
    type: types.CART.SET_POSTCODE,
    customerPostcode,
  };
}

export function setCoupons(coupons) {
  return {
    type: types.CART.SET_COUPONS,
    coupons,
  };
}

export function setShippingMethod(shippingMethod) {
  return {
    type: types.CART.SET_SHIPPING_METHOD,
    shippingMethod,
  };
}

export function setTaxes(taxes) {
  return {
    type: types.CART.SET_TAXES,
    taxes,
  };
}
