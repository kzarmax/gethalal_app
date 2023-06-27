/**
 * hosokawa
 * 2021/11/4
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
import {withSafeAreaInsets} from 'react-native-safe-area-context';

import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  setShippingMethod as setShippingMethodAction,
} from '../../actions/cart';
import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import styles from './styles';
import {COLOR_BLACK_900, themes} from '../../constants/colors';
import {withTheme} from '../../theme';
import CartProduct from './cartProduct';
import I18n from '../../i18n';
import shareStyles from '../Styles';
import images from '../../assets/images';
import {VectorIcon} from '../../containers/VectorIcon';
import RemovedProduct from './removedProduct';
import Button from '../../containers/Button';
import {showToast} from '../../lib/info';
import GethalalSdk from '../../lib/gethalalSdk';
import ShippingMethods from './shippingMethods';
import GethalalCart from '../../lib/cart';

class CartView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('My_cart'),
  });

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showStockDlg: false,
      shippingMethods: [],
      availableShippingMethods: [],
    };
  }

  componentDidMount() {
    const zone_id = this.props.customerPostcode.zone_id;
    if (!isNaN(zone_id)) {
      this.setState({loading: true});
      GethalalSdk.getAPICall(`/wc/v2/shipping/zones/${zone_id}/methods`, {})
        .then(res => {
          this.setState({loading: false, shippingMethods: res});
          setTimeout(() => this.calculateCart(), 100);
        })
        .catch(err => {
          console.log('error', err);
          this.setState({loading: false});
        });
    }
  }

  onPressPlus = product => {
    const {addToCart} = this.props;
    addToCart(product);
  };

  onPressMinus = product => {
    const {removeFromCart} = this.props;
    removeFromCart(product.id);
  };

  onPressRemind = product => {};

  onPressProduct = product => {
    this.props.navigation.navigate('ProductDetail', {product: product});
  };

  onGoToHome = () => {
    this.props.navigation.popToTop();
  };

  setShippingMethod = method => {
    if (this.props.shippingMethod.id !== method.id) {
      this.props.setShippingMethod(method);
    }
  };

  calculateCart = () => {
    const {cart} = this.props;
    const {shippingMethods} = this.state;

    let enableFreeShipping = true;
    Object.values(cart).forEach(c => {
      if (!c.free_shipping) {
        enableFreeShipping = false;
      }
    });

    // Check Free Shipping
    const availableShippingMethods = shippingMethods.filter(
      m =>
        m.enabled &&
        (enableFreeShipping ||
          (!enableFreeShipping && m.method_id !== 'free_shipping')),
    );

    console.log('available', availableShippingMethods);
    if (availableShippingMethods.length > 0) {
      this.setShippingMethod(availableShippingMethods[0]);
    }

    this.setState({availableShippingMethods});
  };

  onCheckout = () => {
    const {isAuthenticated} = this.props;
    if (!isAuthenticated) {
      showToast(I18n.t('please_login_first'));
      this.props.navigation.replace('Login');
      return;
    }
    if (this.props.addresses.length > 0) {
      this.props.navigation.replace('MyAddress', {is_cart: true});
    } else {
      this.props.navigation.replace('NewAddress', {is_cart: true});
    }
  };

  render() {
    const {height, cart: stateCart, shippingMethod, taxes, theme} = this.props;
    const {showStockDlg, availableShippingMethods} = this.state;
    const cart = Object.values(stateCart);
    let items_total = 0;
    let items_count = 0;
    let items_taxes = 0;

    cart.forEach(c => {
      items_total += c.quantity * c.price;
      items_count += c.quantity;
    });
    const shipping_cost = GethalalCart.getShippingCost(shippingMethod, taxes);
    console.log('shipping method', shippingMethod, shipping_cost);
    const sub_total = items_total + items_taxes + shipping_cost;

    return (
      <SafeAreaView>
        <StatusBar />
        {/*<RNSafeAreaView style={{backgroundColor: themes[theme].headerBackground}}>*/}
        {/*    <View style={styles.headerBar}>*/}
        {/*        <HeaderButton.Back navigation={navigation}/>*/}
        {/*        <Text style={styles.headerTitle}>{I18n.t('My_cart')}</Text>*/}
        {/*        <View style={{width: 80}}/>*/}
        {/*    </View>*/}
        {/*</RNSafeAreaView>*/}
        {cart.length > 0 ? (
          <>
            <ScrollView
              style={[
                styles.container,
                {backgroundColor: themes[theme].backgroundColor},
              ]}
              {...scrollPersistTaps}
            >
              <View
                style={[
                  styles.topHeaderBar,
                  {backgroundColor: themes[theme].headerBackground},
                ]}
              >
                <View style={styles.totalRow}>
                  <Text style={styles.totalTitle}>
                    {I18n.t('Items_total', {number: items_count})}
                  </Text>
                  <Text style={styles.totalText}>
                    {items_total.toFixed(2)}€
                  </Text>
                </View>
                <ShippingMethods
                  shippingMethods={availableShippingMethods}
                  onPress={this.setShippingMethod}
                  activeMethod={shippingMethod}
                  taxes={taxes}
                  theme={theme}
                />
                {/*<View style={[styles.totalRow, {marginTop: 8}]}>*/}
                {/*  <Text style={styles.totalTitle}>{I18n.t('Taxes')}:</Text>*/}
                {/*  <Text style={styles.totalText}>*/}
                {/*    {items_taxes.toFixed(2)}€*/}
                {/*  </Text>*/}
                {/*</View>*/}
                {/*{*/}
                {/*    is_set_zipcode?*/}
                {/*    <View style={[styles.totalRow, {marginTop: 8}]}>*/}
                {/*        <Text style={styles.totalTitle}>{I18n.t('Shipping_fees')}:</Text>*/}
                {/*        <Text style={shipping_fee > 0?styles.totalText:styles.freeText}>{shipping_fee > 0? shipping_fee:'Free'}</Text>*/}
                {/*    </View>*/}
                {/*        :*/}
                {/*    <TouchableOpacity onPress={() => {}} style={[styles.addZipCode, {marginTop: 8}]}>*/}
                {/*        <Text style={styles.addZipCodeText}>{I18n.t('Add_you_zipcode_for_free')} </Text>*/}
                {/*        <Text style={styles.freeText}> {I18n.t('Free_shipping')}</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*}*/}
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
              <View style={styles.productsContainer}>
                {cart.map(c => (
                  <CartProduct
                    key={c.id}
                    product={c}
                    onPress={() => this.onPressProduct(c)}
                    onPressMinus={() => this.onPressMinus(c)}
                    onPressPlus={() => this.onPressPlus(c)}
                    theme={theme}
                  />
                ))}
              </View>
            </ScrollView>
            <View style={styles.submitBtn}>
              <Button
                title={I18n.t('Checkout')}
                type="primary"
                size="W"
                onPress={this.onCheckout}
                theme={theme}
              />
            </View>
          </>
        ) : (
          <View
            style={[
              styles.container,
              {
                backgroundColor: themes[theme].backgroundColor,
                alignItems: 'center',
                paddingHorizontal: 24,
              },
            ]}
          >
            <Image source={images.cart_icon} style={styles.cartIcon} />
            <Text style={styles.emptyText}>{I18n.t('Your_cart_is_empty')}</Text>
            <Button
              title={I18n.t('Shop_now')}
              type="primary"
              size="W"
              onPress={this.onGoToHome}
              theme={theme}
            />
          </View>
        )}
        <Modal
          transparent
          onDismiss={() => this.setState({showStockDlg: false})}
          visible={showStockDlg}
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
                {height: height > 800 ? 728 : '90%'},
              ]}
            >
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => this.setState({showStockDlg: false})}
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
              <Text style={styles.modalTitle}>
                {I18n.t('Items_out_of_stock')}
              </Text>
              <Text style={styles.modalSubTitle}>
                {I18n.t('Removed_from_cart')}
              </Text>
              <ScrollView
                style={styles.modalScrollContainer}
                {...scrollPersistTaps}
              >
                <View style={styles.modalProductsContainer}>
                  {cart.map(c => (
                    <RemovedProduct
                      key={c.id}
                      product={c}
                      onPress={() => this.onPressProduct(c)}
                      onPressRemind={() => this.onPressRemind(c)}
                      theme={theme}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  cart: state.cart.cart,
  customerPostcode: state.cart.customerPostcode,
  addresses: state.account.addresses,
  shippingMethod: state.cart.shippingMethod,
  taxes: state.cart.taxes,
});

const mapDispatchToProps = dispatch => ({
  addToCart: params => dispatch(addToCartAction(params)),
  removeFromCart: params => dispatch(removeFromCartAction(params)),
  setShippingMethod: params => dispatch(setShippingMethodAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(withSafeAreaInsets(CartView)));
