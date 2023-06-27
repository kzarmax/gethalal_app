const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const defaultTypes = [REQUEST, SUCCESS, FAILURE];
function createRequestTypes(base, types = defaultTypes) {
  const res = {};
  types.forEach(type => (res[type] = `${base}_${type}`));
  return res;
}

export const APP = createRequestTypes('APP', [
  'START',
  'READY',
  'INIT',
  'INIT_LOCAL_SETTINGS',
  'SET_MASTER_DETAIL',
  'SET_ROUTE',
  'SET_INTERNET_CONNECTION',
]);
export const APP_STATE = createRequestTypes('APP_STATE', [
  'FOREGROUND',
  'BACKGROUND',
  'INACTIVE',
]);

// Login events
export const LOGIN = createRequestTypes('LOGIN', [
  ...defaultTypes,
  'RESET',
  'FIRST_LOGIN',
]);
export const USER = createRequestTypes('USER', ['SET']);
export const LOGOUT = 'LOGOUT';
export const CART = createRequestTypes('CART', [
  'ADD',
  'REMOVE',
  'CLEAR',
  'SET_POSTCODE',
  'SET_COUPONS',
  'RE_ORDER',
  'SET_SHIPPING_METHOD',
  'SET_TAXES',
]);
export const ORDER = createRequestTypes('ORDER', [
  'SET_ORDERS',
  'CREATE_ORDER',
  'UPDATE_ORDER',
  'DELETE_ORDER',
]);
export const PRODUCT = createRequestTypes('PRODUCT', [
  'SET_PRODUCTS_LAST_UPDATED',
  'SET_CATEGORIES',
]);
export const CUSTOMER = createRequestTypes('CUSTOMER', [
  'SET_CUSTOMER',
  'SET_CUSTOMER_ADDRESS',
  'SET_COUNTRIES',
]);
export const ACCOUNT = createRequestTypes('ACCOUNT', [
  'SET_ADDRESSES',
  'SET_PAYMENT_GATEWAYS',
  'SET_PAYMENT_METHODS',
]);
