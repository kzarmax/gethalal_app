import React from 'react';
import {withTheme} from '../../theme';
import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import * as HeaderButton from '../../containers/HeaderButton';
import I18n from '../../i18n';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {COLOR_WHITE, themes} from '../../constants/colors';
import {VectorIcon} from '../../containers/VectorIcon';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import FreeShippingBar from '../../containers/FreeShippingBar';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
} from '../../actions/cart';
import {connect} from 'react-redux';
import images from '../../assets/images';
import {getPriceText, removeTags} from '../../utils/string';

class ProductDetailView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '',
    headerLeft: () => <HeaderButton.CloseModal navigation={navigation} />,
  });

  static propTypes = {};

  constructor(props) {
    super(props);
    const product = this.props.route.params.product;
    this.state = {
      id: product.id,
      image_url: decodeURIComponent(product.images[0]?.src),
      title: product.name,
      sub_title: removeTags(product.short_description),
      unit_price: product.price,
      price: product.price,
      description: removeTags(product.description),
      product: product,
    };
  }

  onPressMinus = () => {
    const {removeFromCart} = this.props;
    const {id} = this.state;
    removeFromCart(id);
  };

  onPressPlus = () => {
    const {addToCart} = this.props;
    const {product} = this.state;
    addToCart(product._raw);
  };

  render() {
    const {cart, theme} = this.props;
    const {id, image_url, title, sub_title, price, description, product} =
      this.state;
    const quantity = cart[id]?.quantity ?? 0;
    const showFreeShipping = false;
    const freeShippingRemains = 0;
    const freeShippingPercent = 100;
    const not_purchasable =
      !product.purchasable || (product.manage_stock && !product.stock_quantity);
    const manufacture_country_data = product.meta_data.find(
      d => d.key === '_manufacture_country',
    );
    const unit_base_data = product.meta_data.find(d => d.key === '_unit_base');

    return (
      <SafeAreaView>
        <StatusBar />
        <ScrollView style={styles.container} {...scrollPersistTaps}>
          <View
            style={[
              styles.imageContainer,
              {backgroundColor: themes[theme].focusedBackground},
            ]}
          >
            <Image source={{uri: image_url}} style={styles.productImage} />
          </View>
          <View style={styles.productBody}>
            <Text
              style={[styles.productText, {color: themes[theme].bodyText}]}
              numberOfLines={2}
              ellipsizeMode={'tail'}
            >
              {title}
            </Text>
            <Text
              style={styles.productSubText}
              numberOfLines={1}
              ellipsizeMode={'tail'}
            >
              {sub_title}
            </Text>
            <Text
              style={[
                styles.productUnitPrice,
                {textAlign: I18n.isRTL ? 'right' : 'auto'},
              ]}
            >
              {getPriceText(product.price_html)}
            </Text>
          </View>
          <View style={styles.cartContainer}>
            <Text
              style={[
                styles.productPrice,
                {textAlign: I18n.isRTL ? 'right' : 'auto'},
              ]}
            >
              {price} €
            </Text>
            <View style={styles.actionContainer}>
              {cart[id] && (
                <>
                  {quantity === 1 ? (
                    <TouchableOpacity
                      onPress={this.onPressMinus}
                      style={styles.action}
                    >
                      <Image
                        source={images.icon_trash}
                        style={styles.actionDeleteButton}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={this.onPressMinus}
                      style={styles.action}
                    >
                      <VectorIcon
                        type={'MaterialCommunityIcons'}
                        name={'minus'}
                        size={20}
                        color={COLOR_WHITE}
                        style={styles.actionButton}
                      />
                    </TouchableOpacity>
                  )}
                  <Text style={styles.productQuantity}>{quantity}</Text>
                </>
              )}
              <TouchableOpacity
                onPress={this.onPressPlus}
                style={not_purchasable ? styles.inactiveAction : styles.action}
                disabled={not_purchasable}
              >
                <VectorIcon
                  type={'MaterialCommunityIcons'}
                  name={'plus'}
                  size={20}
                  color={COLOR_WHITE}
                  style={styles.actionButton}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.productDetail}>
            <Text style={styles.titleText}>{I18n.t('Details')}</Text>
            <Text style={styles.detailContainer}>
              <Text style={styles.countryContainer}>
                <Text style={styles.detailTitle}>{I18n.t('Made_in')}</Text>
                <Text style={styles.countryText}>
                  :{manufacture_country_data?.value ?? ''}
                </Text>
              </Text>
              <Text style={styles.unitContainer}>
                <Text style={styles.detailTitle}> {I18n.t('Unit')}</Text>
                <Text style={styles.unitText}>
                  :{unit_base_data?.value ?? ''}
                </Text>
              </Text>
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.productDescription}>
            <Text style={styles.titleText}>{I18n.t('Description')}</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
        </ScrollView>
        {showFreeShipping && (
          <FreeShippingBar
            freeShippingPercent={freeShippingPercent}
            freeShippingRemains={freeShippingRemains}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  cart: state.cart.cart,
});

const mapDispatchToProps = dispatch => ({
  addToCart: params => dispatch(addToCartAction(params)),
  removeFromCart: params => dispatch(removeFromCartAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(ProductDetailView));
