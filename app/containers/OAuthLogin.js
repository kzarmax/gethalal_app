import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
// import { Base64 } from 'js-base64';
import Button from './Button';
import I18n from '../i18n';

import {withTheme} from '../theme';
import random from '../utils/random';

class OAuthLogin extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    server: PropTypes.string,
    isSignup: PropTypes.bool.isRequired,
    theme: PropTypes.string,
  };

  onPressApple = () => {
    const {services, server} = this.props;
    const {clientId} = services.apple;
    const endpoint = 'https://appleid.apple.com/auth/authorize';
    const redirect_uri = `${server}/_oauth/apple?close`;
    const scope = 'email';
    const state = this.getOAuthState();
    const params = `?response_type=code&response_mode=form_post&client_id=${clientId}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`;
    this.openOAuth(`${endpoint}${params}`);
  };

  onPressFacebook = () => {
    const {services, server} = this.props;
    const {clientId} = services.facebook;
    const endpoint = 'https://m.facebook.com/v2.9/dialog/oauth';
    const redirect_uri = `${server}/_oauth/facebook?close`;
    const scope = 'email';
    const state = this.getOAuthState();
    const params = `?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}&display=touch`;
    this.openOAuth(`${endpoint}${params}`);
  };

  onPressGoogle = () => {
    const {services, server} = this.props;
    const {clientId} = services.google;
    const endpoint = 'https://accounts.google.com/o/oauth2/auth';
    const redirect_uri = `${server}/_oauth/google?close`;
    const scope = 'email';
    const state = this.getOAuthState();
    const params = `?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}&response_type=code`;
    this.openOAuth(`${endpoint}${params}`);
  };

  getOAuthState = () => {
    const credentialToken = random(43);
    // TODO remove
    return credentialToken;
    // return Base64.encodeURI(JSON.stringify({ loginStyle: 'popup', credentialToken, isCordova: true }));
  };

  openOAuth = url => {
    const {navigation} = this.props;
    navigation.navigate('AuthenticationWebView', {url, authType: 'oauth'});
  };

  renderItem = service => {
    const {isSignup, theme} = this.props;

    const suf = isSignup ? 'Register' : 'Login';
    let icon = '';
    let onPress = () => {};

    switch (service.name) {
      case 'apple':
        onPress = this.onPressApple;
        icon = 'apple_logo';
        break;
      case 'facebook':
        onPress = this.onPressFacebook;
        icon = 'facebook_logo';
        break;
      case 'google':
        onPress = this.onPressGoogle;
        icon = 'google_logo';
        break;
      default:
        break;
    }
    return (
      <Button
        key={service.name}
        icon={icon}
        text={I18n.t(`${suf}_with_${service.name}`)}
        type={service.name}
        oauth
        size="z"
        onPress={onPress}
        style={{marginTop: 16}}
        theme={theme}
      />
    );
  };

  renderServices = () => {
    const {services} = this.props;
    return (
      <View>
        {Object.values(services).map(service => this.renderItem(service))}
      </View>
    );
  };

  render() {
    return this.renderServices();
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withTheme(OAuthLogin));
