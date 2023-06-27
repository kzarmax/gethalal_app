import {put, takeLatest} from 'redux-saga/effects';

import * as types from '../actions/actionsTypes';
import {setUser} from '../actions/login';
import GethalalSdk from '../lib/gethalalSdk';
import {setCountries, setCustomer} from '../actions/customer';
import {
  setAddresses,
  setPaymentGateways,
  setPaymentMethods,
} from '../actions/account';
import {setCoupons, setPostcode} from '../actions/cart';
import Moment from 'moment';

const handleLoginSuccess = function* handleLoginSuccess({data}) {
  Moment.locale('en');

  yield put(setUser(data));

  const paymentGateways = yield GethalalSdk.fetchData(
    GethalalSdk.GET_PAYMENT_GATEWAYS_ENDPOINT,
    {},
  );
  yield put(setPaymentGateways(paymentGateways));
  const addresses = yield GethalalSdk.fetchData(
    GethalalSdk.GET_ADDRESSES_ENDPOINT,
    {},
  );
  yield put(setAddresses(addresses));
  const postCode = yield GethalalSdk.fetchData(GethalalSdk.GET_POSTCODE, {});
  yield put(setPostcode(postCode));
  const paymentMethods = yield GethalalSdk.fetchData(
    GethalalSdk.GET_PAYMENT_METHODS,
    {},
  );
  yield put(setPaymentMethods(paymentMethods));
  const countries = yield GethalalSdk.fetchData(GethalalSdk.GET_COUNTRIES, {});
  yield put(setCountries(countries));
  // const orders = yield GethalalSdk.fetchData(GethalalSdk.GET_ORDERS_ENDPOINT, {});
  // yield put(setOrders(orders));
};

const handleLogout = function* handleLogout() {
  yield put(setCustomer({}));
  yield put(setAddresses([]));
  yield put(setPaymentMethods([]));
};

const handleSetUser = function* handleSetUser({user}) {};

const root = function* root() {
  yield takeLatest(types.LOGIN.SUCCESS, handleLoginSuccess);
  yield takeLatest(types.LOGOUT, handleLogout);
  yield takeLatest(types.USER.SET, handleSetUser);
};
export default root;
