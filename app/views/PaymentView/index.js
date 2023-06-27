/**
 * hosokawa
 * 2021/11/5
 */

import React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import styles from './styles';
import {themes} from '../../constants/colors';
import {withTheme} from '../../theme';
import I18n from '../../i18n';
import shareStyles from '../Styles';
import CheckoutHeader from '../../containers/CheckoutHeader';
import ExDatePicker from '../../containers/ExDatePicker';
import TextInput from '../../containers/TextInput';
import CreditCardPayment from './CreditCardPayment';
import PaypalPayment from './PaypalPayment';
import PayNowKlarna from './PayNowKlarna';
import CashOnDelivery from './CashOnDelivery';
import Button from '../../containers/Button';
import KeyboardView from '../../containers/KeyboardView';
import sharedStyles from '../Styles';
import CardActionSheet from '../../containers/CardActionSheet';
import DateActionSheet from '../../containers/DateActionSheet';
import images from '../../assets/images';
import ActivityIndicator from '../../containers/ActivityIndicator';
import GethalalSdk from '../../lib/gethalalSdk';
import {addOrder as addOrderAction} from '../../actions/order';
import {clearCart as clearCartAction} from '../../actions/cart';
import DirectBankTransfer from './DirectBankTransfer';
import {showToast} from '../../lib/info';
import {date_str_format, DATE_STRING_FORMAT} from '../../utils/datetime';
import GethalalCart from '../../lib/cart';
import {BRAINTREE_TOKEN, PAYPAL_CLIENT_ID} from '../../constants/app';
import PayPalPay from './PaypalPay';

class PaymentView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Checkout'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);

    const accountPaymentMethod =
      props.paymentMethods.cc?.find(method => method.is_default) ?? false;
    this.state = {
      loading: false,
      delivery_date: {date: null, cycle: 0, time: 0},
      accountPaymentMethod,
      showPayError: null,
      checkedPayment: null,
      couponApplying: false,
      couponCode: '',
      coupon: null,
      order: null,
      paypalOrder: null,
    };

    // Actions
    this.options = [];
  }

  componentDidMount() {
    const activePaymentGateways = this.props.paymentGateways.filter(
      p => p.enabled && !p.needs_setup,
    );
    if (activePaymentGateways.length > 0) {
      // TODO Stripe payment method
      if (
        activePaymentGateways[0].id === 'stripe' &&
        (!this.props.paymentMethods.cc ||
          this.props.paymentMethods.cc.length === 0) &&
        activePaymentGateways.length > 1
      ) {
        this.setState({checkedPayment: activePaymentGateways[1]});
      } else {
        this.setState({checkedPayment: activePaymentGateways[0]});
      }
    }
  }

  onPay = () => {
    if (this.state.order) {
      this.payOrder();
      return;
    }

    const {addresses, shippingMethod, taxes, customer, cart} = this.props;
    const {
      checkedPayment,
      accountPaymentMethod,
      delivery_date,
      couponCode,
      coupon,
    } = this.state;

    const accountAddress = addresses.find(address => address.is_default);

    if (
      !accountAddress ||
      !customer.id ||
      !checkedPayment ||
      (checkedPayment.id === 'stripe' && !accountPaymentMethod)
    ) {
      return;
    }

    if (!delivery_date.date) {
      showToast(I18n.t('please_select_delivery_date'));
      return;
    }

    if (couponCode && coupon == null) {
      showToast(I18n.t('please_input_valid_coupon'));
      return;
    }

    const line_items = Object.values(cart).map(item => ({
      product_id: item.id,
      name: item.name,
      quantity: item.quantity,
    }));

    const order = {
      customer_id: customer.id,
      billing: customer.billing,
      shipping: customer.shipping,
      line_items: line_items,
      payment_method: checkedPayment.id,
      payment_method_title: checkedPayment.title,
      meta_data: [
        {
          key: 'delivery_date',
          value: date_str_format(delivery_date.date, DATE_STRING_FORMAT),
        },
        {key: 'delivery_cycle', value: delivery_date.cycle},
        {key: 'delivery_time', value: delivery_date.time},
      ],
      set_paid: true,
      coupon_lines: couponCode
        ? [
            {
              code: coupon.code,
              discount: coupon.amount,
              discount_type: coupon.discount_type,
              individual_use: coupon.individual_use,
              exclude_sale_items: coupon.exclude_sale_items,
              minimum_amount: coupon.minimum_amount,
            },
          ]
        : [],
      shipping_lines: shippingMethod.id
        ? [
            {
              method_id: shippingMethod.id,
              method_title: shippingMethod.title,
              total: GethalalCart.getShippingCost(shippingMethod, taxes),
            },
          ]
        : [],
    };

    if (checkedPayment.id === 'stripe') {
      order['wc-stripe-payment-token'] = accountPaymentMethod.id;
      delete order.set_paid;
    } else if (checkedPayment.id === 'ppcp-gateway') {
      delete order.set_paid;
    }

    this.setState({loading: true});
    GethalalSdk.postAPICall(GethalalSdk.CREATE_ORDER, {...order}, true)
      .then(response => {
        if (response.code) {
          this.setState({loading: false, showPayError: response.message});
        } else {
          this.setState({order: response});
          this.payOrder();
        }
      })
      .catch(error => {
        this.setState({loading: false});
        this.setState({showPayError: error?.message});
      });
  };

  payOrder = () => {
    const {checkedPayment, accountPaymentMethod, order} = this.state;
    if (!order) {
      return;
    }

    if (checkedPayment.id === 'stripe') {
      // Stripe Pay
      GethalalSdk.postAPICall(GethalalSdk.STRIPE_PAY, {
        order_id: order.id,
        payment_method: 'stripe',
        payment_token: accountPaymentMethod.id,
      })
        .then(res => {
          if (res.code === 200) {
            this.goToComplete(order);
          } else {
            showToast(I18n.t('error_stripe_pay'));
            this.setState({loading: false});
          }
        })
        .catch(err => {
          showToast(I18n.t('error_stripe_pay'));
          this.setState({loading: false});
        });
    } else if (checkedPayment.id === 'ppcp-gateway') {
      // Paypal Pay
      this.setState({paypalOrder: order});
    } else {
      // Direct Pay
      this.goToComplete(order);
    }
  };

  onPaypalPaySuccess = transaction => {
    console.log('transaction', transaction);
    if (transaction.status === 'COMPLETED') {
      GethalalSdk.postAPICall(GethalalSdk.PAYPAL_PAY, {
        order_id: this.state.paypalOrder.id,
        transaction_id: transaction.id,
      })
        .then(res => {
          if (res.code === 200) {
            this.goToComplete(this.state.paypalOrder);
          } else {
            showToast(I18n.t('error_paypal_pay'));
            this.setState({paypalOrder: null, loading: false});
          }
        })
        .catch(err => {
          showToast(I18n.t('error_paypal_pay'));
          this.setState({paypalOrder: null, loading: false});
        });
    } else {
      this.setState({paypalOrder: null, loading: false});
    }
  };

  goToComplete = order => {
    const {addOrder, clearCart, navigation} = this.props;
    addOrder(order);
    clearCart();
    navigation.replace('OrderComplete', {order: order});
  };

  onApplyCoupon = () => {
    this.setState({couponApplying: true});
    GethalalSdk.getAPICall(GethalalSdk.GET_COUPONS_ENDPOINT, {
      code: this.state.couponCode,
    })
      .then(response => {
        if (response.length > 0) {
          this.setState({coupon: response[0], couponApplying: false});
          this.couponInput.blur();
        } else {
          this.setState({couponApplying: false});
        }
      })
      .catch(error => {
        showToast(I18n.t('error_coupon_code'));
        this.setState({couponApplying: false});
      });
  };

  onAddCard = () => {
    if (this.bottomSheet) {
      this.bottomSheet.show();
    }
  };

  onSaveCard = ({name, card}) => {
    console.log('card info', name, card);
  };

  render() {
    const {
      cart: cartProp,
      paymentGateways,
      shippingMethod,
      taxes,
      customer,
      theme,
    } = this.props;
    const {
      delivery_date,
      loading,
      couponCode,
      coupon,
      showPayError,
      checkedPayment,
      couponApplying,
      paypalOrder,
    } = this.state;
    const cart = Object.values(cartProp);

    let items_total = 0;
    let items_count = 0;
    let items_taxes = 0;

    cart.forEach(c => {
      items_total += c.quantity * c.price;
      items_count += c.quantity;
    });

    const shipping_cost = GethalalCart.getShippingCost(shippingMethod, taxes);
    const sub_total = items_total + items_taxes + shipping_cost;

    const activePaymentGateways = paymentGateways.filter(
      p => p.enabled && !p.needs_setup,
    );

    console.log('gateways', activePaymentGateways, checkedPayment);

    return (
      <KeyboardView
        contentContainerStyle={sharedStyles.container}
        keyboardVerticalOffset={128}
      >
        <StatusBar />
        <SafeAreaView>
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: themes[theme].backgroundColor},
            ]}
            {...scrollPersistTaps}
          >
            <CheckoutHeader step={1} theme={theme} />
            <View style={styles.cardContainer}>
              {/*<View style={styles.donateContainer}>*/}
              {/*  <Image source={images.donate} style={styles.donateIcon} />*/}
              {/*  <View style={styles.donateTextContainer}>*/}
              {/*    <View style={styles.donateRow}>*/}
              {/*      <Text style={styles.donateText}>*/}
              {/*        {I18n.t('For_every_purchase')}{' '}*/}
              {/*      </Text>*/}
              {/*      <Text style={styles.donateCurrency}> 50$ </Text>*/}
              {/*      <Text style={styles.donateText}>*/}
              {/*        {' '}*/}
              {/*        {I18n.t('Get_halal')}*/}
              {/*      </Text>*/}
              {/*    </View>*/}
              {/*    <View style={styles.donateRow}>*/}
              {/*      <Text style={styles.donateText}>*/}
              {/*        {I18n.t('Will_donate')}{' '}*/}
              {/*      </Text>*/}
              {/*      <Text style={styles.donateCurrency}> 10$ </Text>*/}
              {/*      <Text style={styles.donateText}>*/}
              {/*        {' '}*/}
              {/*        {I18n.t('To_chairty')}*/}
              {/*      </Text>*/}
              {/*    </View>*/}
              {/*  </View>*/}
              {/*</View>*/}
              <Text style={styles.cardTitle}>{I18n.t('Purchase_summary')}</Text>
              <View style={[styles.totalRow, {marginTop: 16}]}>
                <Text style={styles.totalTitle}>
                  {I18n.t('Items_total', {number: items_count})}
                </Text>
                <Text style={styles.totalText}>{items_total.toFixed(2)}€</Text>
              </View>
              {/*<View style={[styles.totalRow, {marginTop: 8}]}>*/}
              {/*  <Text style={styles.totalTitle}>{I18n.t('Taxes')}:</Text>*/}
              {/*  <Text style={styles.totalText}>{items_taxes}€</Text>*/}
              {/*</View>*/}
              <View style={[styles.totalRow, {marginTop: 8}]}>
                <Text style={styles.totalTitle}>
                  {I18n.t('Shipping_fees')}:
                </Text>
                <Text
                  style={shipping_cost > 0 ? styles.totalText : styles.freeText}
                >
                  {shipping_cost > 0
                    ? GethalalCart.getShippingLabel(shippingMethod, taxes)
                    : 'Free'}
                </Text>
              </View>
              <View style={[shareStyles.separator, {marginVertical: 16}]} />
              <View style={styles.totalRow}>
                <Text style={[styles.totalTitle, {fontWeight: '500'}]}>
                  {I18n.t('Total')}{' '}
                  <Text style={styles.inclusive}>
                    ({I18n.t('Inclusive_of_vat')})
                  </Text>
                  :
                </Text>
                <Text style={[styles.totalText, {fontWeight: '500'}]}>
                  {sub_total.toFixed(2)}€
                </Text>
              </View>
            </View>
            <View style={styles.cardContainer}>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.cardTitle}>{I18n.t('Delivery_date')}</Text>
                {!delivery_date.date && (
                  <Image
                    source={images.warringIcon}
                    style={styles.warningLogo}
                  />
                )}
              </View>
              <ExDatePicker
                containerStyle={styles.selectStyle}
                inputStyle={{
                  backgroundColor: themes[theme].auxiliaryBackground,
                }}
                value={delivery_date}
                onOpenPicker={() => {
                  if (this.dateBottomSheet) {
                    this.dateBottomSheet.show();
                  }
                }}
                theme={theme}
              />
            </View>
            <View style={styles.cardContainer}>
              {couponApplying && (
                <ActivityIndicator theme={theme} absolute size={'large'} />
              )}
              <Text style={styles.cardTitle}>{I18n.t('Apply_coupon')}</Text>
              <TextInput
                inputRef={e => {
                  this.couponInput = e;
                }}
                placeholder={I18n.t('Enter_coupon_code')}
                returnKeyType="next"
                keyboardType="default"
                textContentType="oneTimeCode"
                onChangeText={value => this.setState({couponCode: value})}
                theme={theme}
              />
              {couponCode.length > 0 && !coupon && (
                <TouchableOpacity
                  style={styles.applyCouponBtn}
                  onPress={this.onApplyCoupon}
                >
                  <Text style={styles.applyCouponBtnText}>
                    {I18n.t('Apply')}
                  </Text>
                </TouchableOpacity>
              )}
              {coupon && (
                <Text style={styles.applyText}>{I18n.t('Applied')}</Text>
              )}
            </View>
            <View style={[styles.cardContainer, {marginBottom: 32}]}>
              <Text style={styles.cardTitle}>{I18n.t('Payment_method')}</Text>
              {activePaymentGateways.map(g => {
                switch (g.id) {
                  case 'ppcp-gateway':
                    return (
                      <PaypalPayment
                        checked={checkedPayment?.id === 'ppcp-gateway'}
                        onSelect={() => this.setState({checkedPayment: g})}
                        theme={theme}
                      />
                    );
                  case 'bacs':
                    return (
                      <DirectBankTransfer
                        checked={checkedPayment?.id === 'bacs'}
                        onSelect={() => this.setState({checkedPayment: g})}
                        theme={theme}
                      />
                    );
                  case 'cod':
                    return (
                      <CashOnDelivery
                        checked={checkedPayment?.id === 'cod'}
                        onSelect={() => this.setState({checkedPayment: g})}
                        theme={theme}
                      />
                    );
                  case 'klarna':
                    return (
                      <PayNowKlarna
                        checked={checkedPayment?.id === 'klarna'}
                        onSelect={() => this.setState({checkedPayment: g})}
                        theme={theme}
                      />
                    );
                  case 'stripe':
                    return (
                      <CreditCardPayment
                        checked={checkedPayment?.id === 'stripe'}
                        onSelect={() => this.setState({checkedPayment: g})}
                        onAddCard={this.onAddCard}
                        onSaveCard={this.onSaveCard}
                        theme={theme}
                      />
                    );
                }
              })}
            </View>
          </ScrollView>
          <View
            style={[
              styles.submitBtn,
              {backgroundColor: themes[theme].focusedBackground},
            ]}
          >
            <Button
              title={I18n.t('Pay_money', {number: sub_total.toFixed(2)})}
              type="primary"
              size="W"
              onPress={this.onPay}
              loading={loading}
              theme={theme}
            />
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
          <DateActionSheet
            sheetRef={ref => (this.dateBottomSheet = ref)}
            hideActionSheet={() => {
              if (this.dateBottomSheet) {
                this.dateBottomSheet.close();
              }
            }}
            onDone={delivery_date => {
              this.setState({delivery_date: delivery_date});
              if (this.dateBottomSheet) {
                this.dateBottomSheet.close();
              }
            }}
            onCancel={() => {
              if (this.dateBottomSheet) {
                this.dateBottomSheet.close();
              }
            }}
            theme={theme}
          />
          {paypalOrder && (
            <PayPalPay
              amount={paypalOrder.total}
              orderID={paypalOrder.id}
              ProductionClientID={PAYPAL_CLIENT_ID}
              success={this.onPaypalPaySuccess}
              failed={a => {
                console.log('failed', a);
                this.setState({paypalOrder: null, loading: false});
              }}
            />
          )}
          <Modal
            transparent
            onDismiss={() => this.setState({showPayError: null})}
            visible={!!showPayError}
          >
            <View
              style={[
                styles.modalContainer,
                {backgroundColor: themes[theme].modalBackground},
              ]}
            >
              <View
                style={[
                  styles.modalContent,
                  {backgroundColor: themes[theme].focusedBackground},
                ]}
              >
                <View style={styles.errorLogoContainer}>
                  <Image
                    source={images.payErrorIcon}
                    style={styles.errorLogo}
                  />
                </View>
                <Text style={styles.modalSubTitle}>
                  {showPayError ?? I18n.t('Payment_error_label')}
                </Text>
                <View style={styles.tryAgainAction}>
                  <Button
                    style={styles.actionBtn}
                    title={I18n.t('Try_again')}
                    type="white"
                    size="W"
                    onPress={() => {
                      this.setState({showPayError: null});
                    }}
                    theme={theme}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </KeyboardView>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart,
  customer: state.customer.customer,
  addresses: state.account.addresses,
  paymentGateways: state.account.paymentGateways,
  paymentMethods: state.account.paymentMethods,
  shippingMethod: state.cart.shippingMethod,
  taxes: state.cart.taxes,
});

const mapDispatchToProps = dispatch => ({
  addOrder: params => dispatch(addOrderAction(params)),
  clearCart: params => dispatch(clearCartAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(PaymentView));
