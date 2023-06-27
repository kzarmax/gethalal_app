import * as types from './actionsTypes';

export function setCustomer(customer) {
  return {
    type: types.CUSTOMER.SET_CUSTOMER,
    customer,
  };
}

export function setCustomerAddress(address) {
  return {
    type: types.CUSTOMER.SET_CUSTOMER_ADDRESS,
    address,
  };
}

export function setCountries(countries) {
  return {
    type: types.CUSTOMER.SET_COUNTRIES,
    countries,
  };
}
