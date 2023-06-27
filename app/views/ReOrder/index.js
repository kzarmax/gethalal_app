/**
 * hosokawa
 * 2021/11/5
 */

import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
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
import Button from '../../containers/Button';
import images from '../../assets/images';
import {ORDER_STATES} from '../../constants/app';
import {reOrder as reOrderAction} from '../../actions/cart';
import GethalalSdk from '../../lib/gethalalSdk';
import {showToast} from '../../lib/info';

class ReOrderView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Order'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const order = props.route.params?.order;
    this.state = {
      loading: false,
      order: order,
    };
  }

  onReOrder = () => {
    const {order} = this.state;
    const {reOrder} = this.props;
    this.setState({loading: true});
    GethalalSdk.getAPICall(GethalalSdk.GET_REORDER_ITEMS, {order_id: order.id})
      .then(res => {
        console.log('reorder', res);
        if (res.success) {
          reOrder(res.items);
          this.props.navigation.popToTop();
          setTimeout(() => this.props.navigation.navigate('Cart'), 100);
        } else {
          showToast('error_no_products');
        }
        this.setState({loading: false});
      })
      .catch(err => {
        showToast(err);
        this.setState({loading: false});
      });
  };

  render() {
    const {theme} = this.props;
    const {order, loading} = this.state;
    let items_total = 0;
    order.line_items.forEach(i => (items_total += Number(i.total)));
    const orderState = ORDER_STATES[order.status];

    return (
      <SafeAreaView>
        <StatusBar />
        <ScrollView
          style={[
            styles.container,
            {backgroundColor: themes[theme].backgroundColor},
          ]}
          {...scrollPersistTaps}
        >
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{I18n.t('Order_information')}</Text>
            <View style={[styles.cardRow, {justifyContent: 'space-between'}]}>
              <Text style={styles.cardText}>{I18n.t('Order_status_')}</Text>
              <Text
                style={[
                  styles.itemState,
                  {
                    color: orderState.color,
                    backgroundColor: orderState.background,
                  },
                ]}
              >
                {orderState.title}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>
                {I18n.t('Order_id_', {id: '1234-123'})}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>
                {I18n.t('Order_date_', {date: 'thus,12 oct 2021'})}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>{I18n.t('Payment_method')}:</Text>
              <Image source={images.icon_cash} style={styles.paymentIcon} />
              <Text style={styles.paymentText}>{I18n.t('Paid_in_cash')}</Text>
            </View>
            {order.coupon_lines.length > 0 && (
              <View style={styles.cardRow}>
                <Text style={styles.cardText}>
                  {I18n.t('Coupon_', {coupon: 'Get Halal50'})}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{I18n.t('Delivery_location')}</Text>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>
                {I18n.t('Customer_name_', {name: order.shipping.first_name})}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>
                {I18n.t('Customer_location_', {
                  location: order.shipping.address_1,
                })}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>
                {I18n.t('Customer_address_', {
                  address: order.shipping.address_2,
                })}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>
                {I18n.t('Customer_city_zip_code_', {
                  value: order.shipping.postcode,
                })}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>
                {I18n.t('Customer_mobile_', {mobile: order.shipping.phone})}
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{I18n.t('Payment_detail')}</Text>
            {order.line_items.map(oi => (
              <>
                <View key={oi.id} style={styles.orderItem}>
                  <Text style={styles.orderItemQuantity}>{oi.quantity} x </Text>
                  <View style={styles.orderItemContent}>
                    <Text
                      style={styles.orderItemText}
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                    >
                      {oi.name}
                    </Text>
                    <Text style={styles.orderItemUnit}>({oi.unit})</Text>
                  </View>
                  <Text style={styles.orderItemPrice}>
                    {oi.price}
                    {order.currency_symbol}
                  </Text>
                </View>
                <View style={[shareStyles.separator, {marginVertical: 4}]} />
              </>
            ))}
            <View style={[styles.totalRow, {marginTop: 4}]}>
              <Text style={styles.cardText}>
                {I18n.t('Sub_total', {number: 10})}
              </Text>
              <Text style={styles.cardText}>
                {items_total.toFixed(2)}
                {order.currency_symbol}
              </Text>
            </View>
            <View style={[styles.totalRow, {marginTop: 16}]}>
              <Text style={styles.cardText}>{I18n.t('Delivery')}</Text>
              <Text
                style={
                  order.shipping_total > 0 ? styles.cardText : styles.freeText
                }
              >
                {order.shipping_total > 0
                  ? `${order.shipping_total}${order.currency_symbol}`
                  : 'Free'}
              </Text>
            </View>
            <View style={[shareStyles.separator, {marginVertical: 8}]} />
            <View style={[styles.totalRow, {marginTop: 8}]}>
              <Text style={[styles.cardText, {fontWeight: '500'}]}>
                {I18n.t('Total')}
              </Text>
              <Text style={[styles.cardText, {fontWeight: '500'}]}>
                {order.total}
                {order.currency_symbol}
              </Text>
            </View>
          </View>
          <View style={styles.submitBtn}>
            <Button
              title={I18n.t('Re_order')}
              type="primary"
              size="W"
              onPress={this.onReOrder}
              loading={loading}
              theme={theme}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  reOrder: params => dispatch(reOrderAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(ReOrderView));
