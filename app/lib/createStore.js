/**
 * hosokawa
 * 2021/11/2
 */

import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';

// import analytics from '@react-native-firebase/analytics';

import reducers from '../reducers';
import sagas from '../sagas';
import applyAppStateMiddleware from './appStateMiddleware';
import AsyncStorage from '@react-native-community/async-storage';

let sagaMiddleware;
let enhancers;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['product', 'cart'],
};

if (__DEV__) {
  const reduxImmutableStateInvariant =
    require('redux-immutable-state-invariant').default();
  const Reactotron = require('reactotron-react-native').default;
  sagaMiddleware = createSagaMiddleware({
    sagaMonitor: Reactotron.createSagaMonitor(),
  });

  enhancers = compose(
    applyAppStateMiddleware(),
    applyMiddleware(reduxImmutableStateInvariant),
    applyMiddleware(sagaMiddleware),
    Reactotron.createEnhancer(),
  );
} else {
  sagaMiddleware = createSagaMiddleware();
  enhancers = compose(
    applyAppStateMiddleware(),
    applyMiddleware(sagaMiddleware),
  );
}

// analytics().setAnalyticsCollectionEnabled(true);

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, enhancers);
export const persistor = persistStore(store);

sagaMiddleware.run(sagas);
