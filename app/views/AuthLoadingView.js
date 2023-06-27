import React from 'react';
import {View, StyleSheet, ActivityIndicator, Image} from 'react-native';
import PropTypes from 'prop-types';

import StatusBar from '../containers/StatusBar';
import {withTheme} from '../theme';
import {COLOR_PRIMARY_500, themes} from '../constants/colors';

import sharedStyles from './Styles';
import images from '../assets/images';

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    height: 115,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: COLOR_PRIMARY_500,
  },
  logoText: {
    maxWidth: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
  },
});

const AuthLoadingView = React.memo(({theme}) => (
  <View style={sharedStyles.container}>
    <StatusBar />
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />
      </View>
      <ActivityIndicator color={COLOR_PRIMARY_500} size="large" />
    </View>
  </View>
));

AuthLoadingView.propTypes = {
  theme: PropTypes.string,
};

export default withTheme(AuthLoadingView);
