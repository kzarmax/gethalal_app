import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import WebView from 'react-native-webview';
import {SERVER_BASE_URL} from '../../constants/app';

export default class PayPalPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sent: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
  }

  handleNavigation = event => {
    'handleNavigation' in this.props && this.props.handleNavigation(event);
  };

  handleMessage = e => {
    let data = JSON.parse(e.nativeEvent.data);
    console.log('message', data);
    if (data.status === 'Success' && data.transaction) {
      this.props.success(data.transaction);
    } else {
      this.setState({
        loading: false,
      });
      this.props.failed(data.message);
    }
  };

  passValues = () => {
    let data = {
      amount: 'amount' in this.props ? this.props.amount : null,
      orderID: 'orderID' in this.props ? this.props.orderID : null,
      ProductionClientID:
        'ProductionClientID' in this.props
          ? this.props.ProductionClientID
          : null,
    };
    if (!this.state.sent) {
      this.refs.webview.postMessage(JSON.stringify(data));
      console.log('post message data', data);

      this.setState({
        loading: false,
        sent: true,
      });
    }
  };

  render() {
    return (
      <View
        style={{position: 'absolute', width: '100%', height: '100%', flex: 1}}
      >
        <WebView
          style={{overflow: 'scroll'}}
          source={{uri: SERVER_BASE_URL + '/paypal?time=4'}}
          originWhitelist={['*']}
          mixedContentMode={'always'}
          useWebKit={Platform.OS === 'ios'}
          onError={err => console.log('err', err)}
          onLoadEnd={() => this.passValues()}
          ref="webview"
          thirdPartyCookiesEnabled={true}
          scrollEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          allowUniversalAccessFromFileURLs={true}
          onMessage={this.handleMessage}
          onNavigationStateChange={event => this.handleNavigation(event)}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}
