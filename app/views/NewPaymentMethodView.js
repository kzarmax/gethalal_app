/**
 * hosokawa
 * 2021/12/11
 */

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import I18n from '../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../theme';
import SafeAreaView from '../containers/SafeAreaView';
import StatusBar from '../containers/StatusBar';
import {COLOR_BLACK_900, themes} from '../constants/colors';
import sharedStyles from './Styles';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import CardInput from '../containers/CardInput';
import ActivityIndicator from '../containers/ActivityIndicator';
import {createPaymentMethod} from '@stripe/stripe-react-native';
import GethalalSdk from '../lib/gethalalSdk';
import {showToast} from '../lib/info';
import {connect} from 'react-redux';
import {setPaymentMethods as setPaymentMethodsAction} from '../actions/account';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mainContainer: {
    flexGrow: 1,
  },
  pageTitle: {
    marginTop: 16,
    fontSize: 18,
    lineHeight: 24,
    color: COLOR_BLACK_900,
  },
});

class NewPaymentMethodView extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      title: I18n.t('Payment_method'),
      // headerRight: () => (
      //   <HeaderButton.Delete navigation={navigation} onPress={this.onDelete} />
      // ),
    });
  }

  onSaveCard = ({name, card, is_default}) => {
    const {user} = this.props;

    console.log('card info', name, card);
    if (card.complete) {
      this.setState({isLoading: true});
      createPaymentMethod({
        type: 'Card',
        billingDetails: {
          email: user.email,
          name: name,
        },
      })
        .then(src => {
          const {paymentMethod} = src;
          console.log(src, src);
          const updates = {
            cardDetails: card,
            name: name,
            payment_method_id: paymentMethod.id,
            is_default: is_default ? 1 : 0,
          };
          GethalalSdk.postAPICall(GethalalSdk.SET_PAYMENT_METHOD, updates)
            .then(response => {
              if (response.success) {
                this.props.setPaymentMethods(response.paymentMethods);
                this.setState({isLoading: false});
                this.props.navigation.replace('PaymentMethod');
              } else {
                showToast(response.error);
                this.setState({isLoading: false});
              }
            })
            .catch(() => {
              showToast(I18n.t('error_card_register_failed'));
              this.setState({isLoading: false});
            });
        })
        .catch(() => {
          showToast(I18n.t('error_card_register_failed'));
          this.setState({isLoading: false});
        });
    }
  };

  render() {
    const {customer, theme} = this.props;
    const {isLoading} = this.state;

    return (
      <SafeAreaView style={sharedStyles.container}>
        <StatusBar />
        {isLoading && (
          <ActivityIndicator size={'large'} theme={theme} absolute />
        )}
        <View
          style={[
            styles.container,
            {backgroundColor: themes[theme].backgroundColor},
          ]}
          {...scrollPersistTaps}
        >
          <View style={styles.mainContainer}>
            <Text style={styles.pageTitle}>{I18n.t('Add_new_card')}</Text>
            <CardInput
              billingName={customer.first_name ?? ''}
              onSave={this.onSaveCard}
              theme={theme}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
  customer: state.customer.customer,
});

const mapDispatchToProps = dispatch => ({
  setPaymentMethods: params => dispatch(setPaymentMethodsAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(NewPaymentMethodView));
