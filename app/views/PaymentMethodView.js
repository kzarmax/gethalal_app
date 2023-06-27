/**
 * hosokawa
 * 2021/11/8
 */

import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import I18n from '../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../theme';
import SafeAreaView from '../containers/SafeAreaView';
import StatusBar from '../containers/StatusBar';
import {COLOR_BLACK_900, COLOR_PRIMARY_500, themes} from '../constants/colors';
import sharedStyles from './Styles';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import images from '../assets/images';
import CardActionSheet from '../containers/CardActionSheet';
import RemoveCardModal from '../containers/RemoveCardModal';
import {connect} from 'react-redux';
import {createPaymentMethod} from '@stripe/stripe-react-native';
import GethalalSdk from '../lib/gethalalSdk';
import {showToast} from '../lib/info';
import ActivityIndicator from '../containers/ActivityIndicator';
import {setPaymentMethods as setPaymentMethodsAction} from '../actions/account';
import {VectorIcon} from '../containers/VectorIcon';
import CardInput from '../containers/CardInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mainContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  activeItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR_PRIMARY_500,
    padding: 16,
    marginBottom: 16,
  },
  itemHeader: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLogoIcon: {
    width: 38,
    height: 24,
    resizeMode: 'contain',
  },
  cardNumberText: {
    marginLeft: 8,
    color: COLOR_BLACK_900,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
  },
  deleteBtn: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  addAction: {
    marginTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addActionIcon: {
    marginLeft: 12,
  },
  addActionText: {
    marginLeft: 8,
    color: COLOR_PRIMARY_500,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
  },
});

class PaymentMethodView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Payment_method'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      removeItem: null,
      isLoading: false,
      payment_methods: [
        {id: 1, type: 'master', last4: '7793'},
        {id: 1, type: 'master', last4: '7793'},
      ],
    };
  }

  onPressItem = item => {
    if (!item.is_default && item.actions.default) {
      this.setState({isLoading: true});
      GethalalSdk.postAPICall(GethalalSdk.SET_DEFAULT_PAYMENT_METHOD, {
        token_id: item.id,
      })
        .then(response => {
          const {setPaymentMethods} = this.props;
          this.setState({isLoading: false});

          console.log('response', response);
          if (response.success) {
            setPaymentMethods(response.paymentMethods);
          }
        })
        .catch(err => {
          showToast(I18n.t('error_card_register_failed'));
          this.setState({isLoading: false});
        });
    }
  };

  onDeletePayment = item => {
    this.setState({isLoading: true});
    GethalalSdk.postAPICall(GethalalSdk.REMOVE_PAYMENT_METHOD, {
      token_id: item.id,
    })
      .then(response => {
        console.log('response', response);
        if (response.success) {
          this.props.setPaymentMethods(response.paymentMethods);
          if ((response.paymentMethods.cc?.length ?? 0) === 0) {
            this.props.navigation.replace('NewPaymentMethod');
          }
        } else {
          showToast(response.error);
        }
        this.setState({isLoading: false});
      })
      .catch(() => {
        showToast(I18n.t('error_card_register_failed'));
        this.setState({isLoading: false});
        this.setState({removeItem: item});
      });
  };

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
            payment_method_id: paymentMethod.id,
            is_default: is_default ? 1 : 0,
          };
          GethalalSdk.postAPICall(GethalalSdk.SET_PAYMENT_METHOD, updates)
            .then(response => {
              if (response.success) {
                this.props.setPaymentMethods(response.paymentMethods);
                this.setState({isLoading: false});
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

  onConfirmRemove = item => {
    if (this.state.removeItem) {
    }
    this.setState({removeItem: null});
  };

  onAdd = () => {
    if (this.bottomSheet) {
      this.bottomSheet.show();
    }
  };

  renderItem = ({item}) => {
    const {theme} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.onPressItem(item)}
        style={[
          item.is_default ? styles.activeItemContainer : styles.itemContainer,
          {backgroundColor: themes[theme].focusedBackground},
        ]}
      >
        <View style={styles.itemHeader}>
          <Image source={images.master_card_logo} style={styles.cardLogoIcon} />
          <Text style={styles.cardNumberText}>
            {item.method.brand}...{item.method.last4}
          </Text>
        </View>
        {item.actions.delete.url && (
          <TouchableOpacity onPress={() => this.onDeletePayment(item)}>
            <Image source={images.trash} style={styles.deleteBtn} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const {paymentMethods, customer, theme} = this.props;
    const {removeItem, isLoading} = this.state;
    const payment_methods = paymentMethods.cc ?? [];
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
            <View>
              <FlatList
                style={{width: '100%'}}
                data={payment_methods}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
              />
            </View>
            <TouchableOpacity onPress={this.onAdd} style={styles.addAction}>
              <VectorIcon
                type={'MaterialCommunityIcons'}
                name={'plus'}
                style={styles.addActionIcon}
                size={28}
                color={COLOR_PRIMARY_500}
              />
              <Text style={styles.addActionText}>
                {I18n.t('Add_a_new_card')}
              </Text>
            </TouchableOpacity>
          </View>
          <CardActionSheet
            sheetRef={ref => (this.bottomSheet = ref)}
            hideActionSheet={() => {
              if (this.bottomSheet) {
                this.bottomSheet.close();
              }
            }}
            billingName={customer.first_name ?? ''}
            onSaveCard={this.onSaveCard}
            theme={theme}
          />
          <RemoveCardModal
            showRemoveConfirm={removeItem}
            onRemove={this.onConfirmRemove}
            onCancel={() => {
              this.setState({removeItem: null});
            }}
            theme={theme}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
  paymentMethods: state.account.paymentMethods,
  customer: state.customer.customer,
});

const mapDispatchToProps = dispatch => ({
  setPaymentMethods: params => dispatch(setPaymentMethodsAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(PaymentMethodView));
