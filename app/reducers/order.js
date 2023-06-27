import * as types from '../actions/actionsTypes';

const initialState = {
  orders: [],
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case types.ORDER.SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case types.ORDER.CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.order],
      };
    case types.ORDER.UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map(o =>
          o.id === action.order.id ? action.order : o,
        ),
      };
    default:
      return state;
  }
}
