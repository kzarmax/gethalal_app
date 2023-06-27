import {combineReducers} from 'redux';
import app from './app';
import login from './login';
import cart from './cart';
import product from './product';
import customer from './customer';
import account from './account';
import order from './order';

export default combineReducers({
  app,
  login,
  cart,
  order,
  product,
  customer,
  account,
});
