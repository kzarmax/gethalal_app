import * as types from '../actions/actionsTypes';

const initialState = {
  customer: {},
  countries: [],
};

export default function customer(state = initialState, action) {
  switch (action.type) {
    case types.CUSTOMER.SET_CUSTOMER: {
      return {
        ...state,
        customer: action.customer,
      };
    }
    case types.CUSTOMER.SET_CUSTOMER_ADDRESS: {
      return {
        ...state,
        customer: {
          ...state.customer,
          billing: action.address,
          shipping: action.address,
        },
      };
    }
    case types.CUSTOMER.SET_COUNTRIES: {
      return {
        ...state,
        countries: action.countries,
      };
    }
    default:
      return state;
  }
}
