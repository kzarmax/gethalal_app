import * as types from './actionsTypes';

export function setOrders(orders) {
  return {
    type: types.ORDER.SET_ORDERS,
    orders,
  };
}

export function addOrder(order) {
  return {
    type: types.ORDER.CREATE_ORDER,
    order,
  };
}

export function updateOrder(order) {
  return {
    type: types.ORDER.UPDATE_ORDER,
    order,
  };
}
