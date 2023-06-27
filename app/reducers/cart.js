import * as types from '../actions/actionsTypes';

const initialState = {
  cart: {},
  customerPostcode: {},
  shippingMethod: {},
  coupons: [],
  taxes: [],
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case types.CART.ADD: {
      let newCart = Object.assign({}, state.cart);
      if (state.cart[action.product.id]) {
        let product = {
          ...state.cart[action.product.id],
        };
        product.quantity++;
        newCart[action.product.id] = product;
      } else {
        newCart[action.product.id] = {...action.product, quantity: 1};
      }
      return {
        ...state,
        cart: newCart,
      };
    }
    case types.CART.REMOVE: {
      if (state.cart[action.id]) {
        let newCart = Object.assign({}, state.cart);

        if (newCart[action.id].quantity === 1) {
          delete newCart[action.id];
          return {
            ...state,
            cart: newCart,
          };
        }

        let product = {
          ...state.cart[action.id],
        };
        product.quantity--;
        newCart[action.id] = product;

        return {
          ...state,
          cart: newCart,
        };
      }
      return state;
    }
    case types.CART.CLEAR:
      return {
        ...state,
        cart: {},
        shippingMethod: {},
      };
    case types.CART.SET_POSTCODE:
      return {
        ...state,
        customerPostcode: action.customerPostcode,
      };
    case types.CART.SET_COUPONS:
      return {
        ...state,
        coupons: action.coupons,
      };
    case types.CART.RE_ORDER:
      return {
        ...state,
        cart: action.cart,
      };
    case types.CART.SET_SHIPPING_METHOD:
      return {
        ...state,
        shippingMethod: action.shippingMethod,
      };
    case types.CART.SET_TAXES:
      return {
        ...state,
        taxes: action.taxes,
      };
    default:
      return state;
  }
}
