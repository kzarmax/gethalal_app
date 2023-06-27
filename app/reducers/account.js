import * as types from '../actions/actionsTypes';

const initialState = {
  addresses: [],
  paymentGateways: [],
  paymentMethods: [],
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case types.ACCOUNT.SET_ADDRESSES: {
      return {
        ...state,
        addresses: action.addresses,
      };
    }
    case types.ACCOUNT.SET_PAYMENT_GATEWAYS: {
      return {
        ...state,
        paymentGateways: action.paymentGateways,
      };
    }
    case types.ACCOUNT.SET_PAYMENT_METHODS: {
      return {
        ...state,
        paymentMethods: action.paymentMethods,
      };
    }
    case types.ACCOUNT.SET_POSTCODE: {
      return {
        ...state,
        customerPostcode: action.customerPostcode,
      };
    }
    default:
      return state;
  }
}
