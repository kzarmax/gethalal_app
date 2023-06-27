import React from 'react';
import PropTypes from 'prop-types';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import Navigation from './lib/Navigation';
import {getActiveRouteName, navigationTheme} from './utils/navigation';
import {ROOT_NO_CONNECTION, setRoute} from './actions/app';

// Stacks
import {ThemeContext} from './theme';
import InsideStack from './stacks/InsideStack';
import {store} from './lib/createStore';
import NoInternetView from './views/NoInternetView';

// App
const Stack = createStackNavigator();
const App = React.memo(({root, isMasterDetail}) => {
  const {theme} = React.useContext(ThemeContext);
  const navTheme = navigationTheme(theme);

  React.useEffect(() => {
    const state = Navigation.navigationRef.current?.getRootState();
    Navigation.routeNameRef.current = getActiveRouteName(state);
  }, []);

  if (!root) {
    return null;
  }

  return (
    <NavigationContainer
      theme={navTheme}
      ref={Navigation.navigationRef}
      onStateChange={state => {
        const routeName = getActiveRouteName(state);
        store.dispatch(setRoute(routeName));
        Navigation.routeNameRef.current = routeName;
      }}
    >
      <Stack.Navigator
        screenOptions={{headerShown: false, animationEnabled: false}}
      >
        <>
          {root === ROOT_NO_CONNECTION ? (
            <Stack.Screen name="NoInternet" component={NoInternetView} />
          ) : null}
          <Stack.Screen name="InsideStack" component={InsideStack} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
});
const mapStateToProps = state => ({
  root: state.app.root,
  isMasterDetail: state.app.isMasterDetail,
});

App.propTypes = {
  root: PropTypes.string,
  isMasterDetail: PropTypes.bool,
};

const AppContainer = connect(mapStateToProps)(App);
export default AppContainer;
