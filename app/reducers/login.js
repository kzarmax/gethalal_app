import * as types from '../actions/actionsTypes';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  isFirstLogin: false,
  user: {},
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case types.APP.INIT:
      return initialState;
    case types.LOGIN.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.data.user,
      };
    case types.LOGOUT:
      return initialState;
    case types.USER.SET:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
        },
      };
    case types.LOGIN.FIRST_LOGIN:
      return {
        ...state,
        isFirstLogin: action.isFirstLogin,
      };
    default:
      return state;
  }
}
