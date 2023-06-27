import {takeLatest, select, put} from 'redux-saga/effects';

import {APP, APP_STATE} from '../actions/actionsTypes';
import {loginSuccess} from '../actions/login';
import {appStart, ROOT_INSIDE, ROOT_NO_CONNECTION} from '../actions/app';

const appHasComeBackToForeground = function* appHasComeBackToForeground() {
  const appRoot = yield select(state => state.app.root);
  // if (appRoot === ROOT_VERIFY_EMAIL) {
  // 	yield firebase.auth().currentUser.reload();
  // 	if(firebase.auth().currentUser.emailVerified){
  // 		const userInfo = yield firebaseSdk.getUser(firebase.auth().currentUser.uid);
  // 		yield put(loginSuccess({...userInfo, emailVerified: true}));
  // 	}
  // }
};

const appHasComeBackToBackground = function* appHasComeBackToBackground() {};

const appHasInActive = function* appHasInActive() {};

const appSetInternetConnection = function* appSetInternetConnection({
  internetConnected,
}) {
  const appRoot = yield select(state => state.app.root);
  if (appRoot === ROOT_INSIDE) {
    console.log('internetConnected', internetConnected);
    if (!internetConnected) {
      yield put(appStart({root: ROOT_NO_CONNECTION}));
    } else {
      yield put(appStart({root: ROOT_INSIDE}));
    }
  }
};

const root = function* root() {
  yield takeLatest(APP_STATE.FOREGROUND, appHasComeBackToForeground);
  yield takeLatest(APP_STATE.BACKGROUND, appHasComeBackToBackground);
  yield takeLatest(APP_STATE.INACTIVE, appHasInActive);
  yield takeLatest(APP.SET_INTERNET_CONNECTION, appSetInternetConnection);
};

export default root;
