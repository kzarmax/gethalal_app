/**
 * hosokawa
 * 2021/11/2
 */

import * as React from 'react';
import {CommonActions, StackActions} from '@react-navigation/native';

const navigationRef = React.createRef();
const routeNameRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function back() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}

function replace(name, params) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

function getCurrentRoute() {
  return routeNameRef.current;
}

export default {
  navigationRef,
  routeNameRef,
  navigate,
  back,
  replace,
  getCurrentRoute,
};
