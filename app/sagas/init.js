import {put, takeLatest} from 'redux-saga/effects';
import RNBootSplash from 'react-native-bootsplash';
import {APP} from '../actions/actionsTypes';
import {appReady, appStart, ROOT_INSIDE, ROOT_LOADING} from '../actions/app';
import {
  NO_FIRST_APP_LOGIN,
  JWT_ACCESS_TOKEN,
  LOCALIZATION_ID,
} from '../constants/keys';
import {loginSuccess, setFirstLogin} from '../actions/login';
import AsyncStorage from '@react-native-community/async-storage';
import GethalalSdk from '../lib/gethalalSdk';
import {setCategories} from '../actions/product';
import {setCustomer} from '../actions/customer';
import {PER_PAGE_CATEGORIES} from '../constants/app';
import I18n, {isRTL} from '../i18n';
import {I18nManager} from 'react-native';
import {setTaxes} from '../actions/cart';
import RNRestart from 'react-native-restart';
import {getAllCategoryIds} from '../lib/database/utils';

const restore = function* restore() {
  yield put(appReady({}));
  const no_first_login = yield AsyncStorage.getItem(NO_FIRST_APP_LOGIN);
  if (!no_first_login) {
    yield put(setFirstLogin(true));
  }

  yield put(appStart({root: ROOT_LOADING}));

  try {
    const categories = yield GethalalSdk.fetchData(
      GethalalSdk.GET_CATEGORIES_ENDPOINT,
      {per_page: PER_PAGE_CATEGORIES, orderby: 'slug', hide_empty: 'true'},
    );
    yield put(setCategories(categories));
  } catch (e) {}

  try {
    let taxes = yield GethalalSdk.fetchData(GethalalSdk.GET_TAXES, {});
    taxes = taxes.filter(tax => tax.country === 'DE');
    yield put(setTaxes(taxes));
  } catch (e) {}

  const access_token = yield AsyncStorage.getItem(JWT_ACCESS_TOKEN);
  if (access_token) {
    GethalalSdk.setToken(access_token);
    try {
      const user = yield GethalalSdk.getUser();

      const customer = yield GethalalSdk.fetchSingleData(
        GethalalSdk.GET_CUSTOMERS_ENDPOINT,
        user.id,
      );
      yield put(setCustomer(customer));

      yield put(appStart({root: ROOT_INSIDE}));

      yield put(loginSuccess(user));
    } catch (e) {
      yield AsyncStorage.removeItem(JWT_ACCESS_TOKEN);
    }
  }

  yield GethalalSdk.fetchAllProducts();
  yield put(appStart({root: ROOT_INSIDE}));
};

const start = function* start() {
  const localization_id = yield AsyncStorage.getItem(LOCALIZATION_ID);
  if (localization_id) {
    console.log('set locale', localization_id);
    I18n.locale = localization_id;
    const isRtl = isRTL(localization_id);
    I18nManager.forceRTL(isRtl);
    I18nManager.swapLeftAndRightInRTL(isRtl);
    I18n.isRTL = isRtl;

    // IOS RTL Bug
    if ((!I18nManager.isRTL && isRtl) || (!isRtl && I18nManager.isRTL)) {
      RNRestart.Restart();
      return;
    }
  }
  RNBootSplash.hide();
};

const root = function* root() {
  yield takeLatest(APP.INIT, restore);
  yield takeLatest(APP.READY, start);
};
export default root;
