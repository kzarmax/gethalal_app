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
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import styles from './styles';
import {
  COLOR_BLACK_900,
  COLOR_GRAY_300,
  COLOR_PRIMARY_500,
  COLOR_WHITE,
  themes,
} from '../../constants/colors';
import {withTheme} from '../../theme';
import I18n from '../../i18n';
import shareStyles from '../Styles';
import Button from '../../containers/Button';
import images from '../../assets/images';
import TrackOrderHeader from '../../containers/TrackOrderHeader';
import {VectorIcon} from '../../containers/VectorIcon';
import {CsSelect} from '../../containers/CsSelect';
import {isIOS} from '../../utils/deviceInfo';
import {date_str_format} from '../../utils/datetime';
import ActivityIndicator from '../../containers/ActivityIndicator';
import GethalalSdk from '../../lib/gethalalSdk';
import {showToast} from '../../lib/info';

class OrderDetailView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Order'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const order = this.props.route.params.order;
    this.state = {
      cancelling: false,
      showCancelDlg: false,
      reason_type: 'other',
      order,
      reasonText: '',
      showCancelled: false,
    };
    this.reasons = [
      {value: 'other', text: I18n.t('Other')},
      {value: 'no_need', text: I18n.t('No_longer_need_order')},
      {value: 'price_high', text: I18n.t('Price_high')},
    ];
  }

  onCancelOrder = () => {
    this.setState({showCancelDlg: true});
  };

  onCancelPerform = () => {
    this.setState({showCancelDlg: false, cancelling: true});
    GethalalSdk.getAPICall(GethalalSdk.CANCEL_ORDER, {
      order_id: this.state.order.id,
    })
      .then(res => {
        console.log('cancel order', res);
        if (res.success) {
          this.props.navigation.pop();
          this.setState({showCancelled: true, cancelling: false});
        } else {
          showToast(res.error);
          this.setState({cancelling: false});
        }
      })
      .catch(err => {
        showToast(err);
        this.setState({cancelling: false});
      });
  };

  renderButtons = () => {
    const {theme} = this.props;
    const {reasonText} = this.state;
    const is_cancellable = reasonText.length > 0;
    if (isIOS) {
      return (
        <View style={styles.actionContainer}>
          <Button
            title={I18n.t('Yes_cancel_order')}
            type="primary"
            size="W"
            onPress={this.onCancelPerform}
            disabled={!is_cancellable}
            theme={theme}
          />
          <Button
            title={I18n.t('No_cancel_order')}
            type="white"
            size="W"
            onPress={() =>
              this.setState({showCancelDlg: false, reasonText: ''})
            }
            theme={theme}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.actionContainer}>
          <TouchableHighlight
            onPress={is_cancellable ? this.onCancelPerform : () => {}}
            style={[
              styles.androidButton,
              {
                backgroundColor: is_cancellable
                  ? COLOR_PRIMARY_500
                  : COLOR_GRAY_300,
              },
            ]}
            underlayColor={'transparent'}
            activeOpacity={0.5}
          >
            <Text style={[styles.androidButtonText, {color: COLOR_WHITE}]}>
              {I18n.t('Yes_cancel_order')}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() =>
              this.setState({showCancelDlg: false, reasonText: ''})
            }
            style={[
              styles.androidButton,
              {backgroundColor: COLOR_WHITE, marginTop: 16},
            ]}
            underlayColor={'transparent'}
            activeOpacity={0.5}
          >
            <Text
              style={[styles.androidButtonText, {color: COLOR_PRIMARY_500}]}
            >
              {I18n.t('No_cancel_order')}
            </Text>
          </TouchableHighlight>
        </View>
      );
    }
  };

  render() {
    const {theme} = this.props;
    const {showCancelDlg, order, reason_type, showCancelled, cancelling} =
      this.state;
    let items_total = 0;
    order.line_items.forEach(i => (items_total += Number(i.total)));

    return (
      <SafeAreaView>
        <StatusBar />
        {cancelling && (
          <ActivityIndicator size={'large'} absolute theme={theme} />
        )}
        <ScrollView
          style={[
            styles.container,
            {backgroundColor: themes[theme].backgroundColor},
          ]}
          {...scrollPersistTaps}
        >
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{I18n.t('Track_order')}</Text>
            <TrackOrderHeader theme={theme} shipments={order.shipments} />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{I18n.t('Order_information')}</Text>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>
                {I18n.t('Order_id_', {id: order.id})}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>
                {I18n.t('Order_date_', {
                  date: date_str_format(
                    order.date_created_gmt,
                    'ddd, d MMM YYYY',
                  ),
                })}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>{I18n.t('Payment_method')}:</Text>
              <Image source={images.icon_cash} style={styles.paymentIcon} />
              <Text style={styles.paymentText}>
                {order.payment_method_title}
              </Text>
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
                    {oi.total}
                    {order.currency_symbol}
                  </Text>
                </View>
                <View style={[shareStyles.separator, {marginVertical: 4}]} />
              </>
            ))}
            <View style={[styles.totalRow, {marginTop: 4}]}>
              <Text style={styles.totalText}>
                {I18n.t('Sub_total', {number: 10})}
              </Text>
              <Text style={styles.totalText}>
                {items_total.toFixed(2)}
                {order.currency_symbol}
              </Text>
            </View>
            <View style={[styles.totalRow, {marginTop: 16}]}>
              <Text style={styles.totalText}>{I18n.t('Delivery')}</Text>
              <Text
                style={
                  order.shipping_total > 0 ? styles.totalText : styles.freeText
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
          {/* TODO Disable cancellation */}
          {/*<View  style={styles.submitBtn}>*/}
          {/*    <Button*/}
          {/*        title={I18n.t('Cancel_your_order', {number: 7763})}*/}
          {/*        type="primary"*/}
          {/*        size="W"*/}
          {/*        onPress={this.onCancelOrder}*/}
          {/*        theme={theme}*/}
          {/*    />*/}
          {/*</View>*/}
        </ScrollView>
        <Modal
          transparent
          onDismiss={() => this.setState({showCancelDlg: false})}
          visible={showCancelDlg}
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
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => this.setState({showCancelDlg: false})}
                >
                  <VectorIcon
                    type={'MaterialCommunityIcons'}
                    name={'close'}
                    size={24}
                    style={styles.closeIcon}
                    color={COLOR_BLACK_900}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalTitle}>{I18n.t('Why_you_cancel')}</Text>
              <CsSelect
                options={this.reasons}
                theme={theme}
                value={reason_type}
                onChange={value => this.setState({reason_type: value})}
              />
              <TextInput
                inputRef={e => {
                  this.reasonCommentInput = e;
                }}
                style={styles.modalTextInput}
                placeholder={I18n.t('Please_cancel_reason')}
                returnKeyType="send"
                multiline
                textContentType="oneTimeCode"
                onChangeText={text => this.setState({reasonText: text.trim()})}
                onSubmitEditing={() => {
                  this.onCancelPerform();
                }}
                theme={theme}
              />
              {this.renderButtons()}
            </View>
          </View>
        </Modal>
        <Modal
          transparent
          onDismiss={() => this.setState({showCancelled: false})}
          visible={showCancelled}
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
              <View style={styles.cancelContent}>
                <Image
                  source={images.order_success}
                  style={styles.successLogo}
                />
                <Text style={styles.modalSubTitle}>
                  {I18n.t('Order_cancel_success')}
                </Text>
                <View style={styles.tryAgainAction}>
                  <Button
                    style={styles.actionBtn}
                    title={I18n.t('Done')}
                    type="primary"
                    size="W"
                    onPress={() => {
                      this.setState({showCancelled: false});
                    }}
                    theme={theme}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

export default withTheme(OrderDetailView);
