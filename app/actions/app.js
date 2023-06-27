import {APP} from './actionsTypes';

export const ROOT_INSIDE = 'inside';
export const ROOT_LOADING = 'loading';
export const ROOT_NO_CONNECTION = 'no_internet';

export function appStart({root, ...args}) {
  return {
    type: APP.START,
    root,
    ...args,
  };
}

export function appReady() {
  return {
    type: APP.READY,
  };
}

export function appInit() {
  return {
    type: APP.INIT,
  };
}

export function appInitLocalSettings() {
  return {
    type: APP.INIT_LOCAL_SETTINGS,
  };
}

export function setMasterDetail(isMasterDetail) {
  return {
    type: APP.SET_MASTER_DETAIL,
    isMasterDetail,
  };
}

export function setRoute(routeName) {
  return {
    type: APP.SET_ROUTE,
    routeName,
  };
}

export function setInternetConnection(internetConnected) {
  return {
    type: APP.SET_INTERNET_CONNECTION,
    internetConnected,
  };
}
