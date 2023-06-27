/**
 * hosokawa
 * 2021/11/2
 */

import React from 'react';
import {Dimensions} from 'react-native';
import {Provider} from 'react-redux';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';

import {defaultTheme, subscribeTheme} from './utils/theme';
import {store, persistor} from './lib/createStore';
import {ThemeContext} from './theme';
import {DimensionsContext} from './dimensions';

import AppContainer from './AppContainer';
import InAppNotification from './containers/InAppNotification';
import Toast from './containers/Toast';
import debounce from './utils/debounce';
import {appInit, setInternetConnection} from './actions/app';
import * as NetInfo from '@react-native-community/netinfo';
import {StripeProvider} from '@stripe/stripe-react-native/src/components/StripeProvider';
import {MERCHANT_ID, STRIPE_PUBLISHABLE_KEY} from './constants/app';

export default class Root extends React.Component {
  constructor(props) {
    super(props);

    this.init();
    const {width, height, scale, fontScale} = Dimensions.get('window');

    this.state = {
      theme: defaultTheme(),
      width,
      height,
      scale,
      fontScale,
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.onDimensionsChange);
    this.unsubscribeNetInfo = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      const connected = store.getState()?.app?.internetConnected ?? false;
      if (connected !== state.isConnected) {
        store.dispatch(setInternetConnection(state.isConnected));
      }
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange);
    if (this.unsubscribeNetInfo) {
      this.unsubscribeNetInfo();
    }
  }

  init = async () => {
    store.dispatch(appInit());
  };

  onDimensionsChange = debounce(
    ({window: {width, height, scale, fontScale}}) => {
      this.setDimensions({
        width,
        height,
        scale,
        fontScale,
      });
    },
  );

  setTheme = (newTheme = {}) => {
    // change theme state
    this.setState({theme: newTheme}, () => {
      const {theme} = this.state;
      // subscribe to Appearance changes
      subscribeTheme(theme);
    });
  };

  setDimensions = ({width, height, scale, fontScale}) => {
    this.setState({
      width,
      height,
      scale,
      fontScale,
    });
  };

  render() {
    const {theme, width, height, scale, fontScale} = this.state;

    return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeContext.Provider
              value={{
                theme,
                setTheme: this.setTheme,
              }}
            >
              <DimensionsContext.Provider
                value={{
                  width,
                  height,
                  scale,
                  fontScale,
                  setDimensions: this.setDimensions,
                }}
              >
                <StripeProvider
                  publishableKey={STRIPE_PUBLISHABLE_KEY}
                  merchantIdentifier={MERCHANT_ID}
                >
                  <AppContainer />
                  <InAppNotification />
                  <Toast />
                </StripeProvider>
              </DimensionsContext.Provider>
            </ThemeContext.Provider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
