import * as types from './actionsTypes';

export function setAddresses(addresses) {
  return {
    type: types.ACCOUNT.SET_ADDRESSES,
    addresses,
  };
}

export function setPaymentGateways(paymentGateways) {
  return {
    type: types.ACCOUNT.SET_PAYMENT_GATEWAYS,
    paymentGateways,
  };
}

export function setPaymentMethods(paymentMethods) {
  return {
    type: types.ACCOUNT.SET_PAYMENT_METHODS,
    paymentMethods,
  };
}
