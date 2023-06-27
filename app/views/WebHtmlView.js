import React from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';

import StatusBar from '../containers/StatusBar';
import {withTheme} from '../theme';
import {getAboutUsUrl, getPrivacyUrl, getTermsUrl} from '../constants/app';
import I18n from '../i18n';
import SafeAreaView from '../containers/SafeAreaView';
import {Linking} from 'react-native';

class WebHtmlView extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const param_type = this.props.route.params?.type;
    let title = '';
    let uri = '';
    if (param_type !== null) {
      switch (param_type) {
        case 0:
          title = I18n.t('Terms_conditions');
          uri = getTermsUrl(I18n.locale);
          break;
        case 1:
          title = I18n.t('Privacy_policy');
          uri = getPrivacyUrl(I18n.locale);
          break;
        case 3:
          title = I18n.t('About_us');
          uri = getAboutUsUrl(I18n.locale);
          break;
      }
    }
    this.state = {
      type: param_type ?? 0, // 1: privacy, 0: terms
      title: title,
      uri: uri,
    };
    this.init();
  }

  init = () => {
    const {navigation} = this.props;
    navigation.setOptions({
      title: this.state.title,
    });
  };

  render() {
    const {uri} = this.state;
    console.log('uri', uri);
    return (
      <SafeAreaView>
        <StatusBar />
        <WebView
          ref={r => {
            this.webView = r;
          }}
          originWhitelist={['*']}
          source={{uri}}
          onNavigationStateChange={event => {
            if (this.webview && event.url !== uri) {
              Linking.openURL(event.url);
              return false;
            }
            return true;
          }}
        />
      </SafeAreaView>
    );
  }
}

export default withTheme(WebHtmlView);
