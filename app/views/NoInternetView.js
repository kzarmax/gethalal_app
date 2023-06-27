import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

import StatusBar from '../containers/StatusBar';
import {withTheme} from '../theme';
import {themes} from '../constants/colors';

import sharedStyles from './Styles';
import images from '../assets/images';
import Button from '../containers/Button';
import I18n from '../i18n';

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 125,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  logoText: {
    maxWidth: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
  },
  noInternetText: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 26,
  },
  noInternetCaption: {
    marginTop: 16,
    fontSize: 12,
    lineHeight: 20,
  },
  tryAgainAction: {
    marginTop: 40,
  },
});

const NoInternetView = React.memo(({theme}) => {
  const [retryConnection, setRetryConnection] = useState();

  const onUpdate = () => {
    setRetryConnection(true);
    setTimeout(() => setRetryConnection(false), 3000);
  };

  return (
    <View style={sharedStyles.container}>
      <StatusBar />
      <View style={styles.mainContainer}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={images.no_internet} style={styles.logo} />
          </View>
          <Text style={styles.noInternetText}>
            {I18n.t('No_internet_connection')}
          </Text>
          <Text style={styles.noInternetCaption}>
            {I18n.t('No_internet_connection_caption')}
          </Text>
          <Text style={styles.tryAgainAction}>
            <Button
              style={styles.actionBtn}
              title={I18n.t('Try_again')}
              type="primary"
              size="W"
              onPress={onUpdate}
              loading={retryConnection}
              theme={theme}
            />
          </Text>
        </View>
      </View>
    </View>
  );
});

NoInternetView.propTypes = {
  theme: PropTypes.string,
};

export default withTheme(NoInternetView);
