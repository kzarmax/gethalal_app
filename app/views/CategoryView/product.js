import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_GRAY_400,
  COLOR_GRAY_600,
  COLOR_GREEN_100,
  COLOR_PRIMARY_500,
  COLOR_WHITE,
  themes,
} from '../../constants/colors';
import {VectorIcon} from '../../containers/VectorIcon';
import images from '../../assets/images';
import {getPriceText} from '../../utils/string';
import I18n from '../../i18n';

const styles = StyleSheet.create({
  productContainer: {
    width: '48%',
    height: 274,
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  productBody: {
    marginTop: 16,
    height: 72,
  },
  productText: {
    color: COLOR_BLACK_900,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
  productSubText: {
    color: COLOR_GRAY_600,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
  productUnitPrice: {
    color: COLOR_GRAY_400,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
  productPrice: {
    color: COLOR_BLACK_900,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    marginTop: 16,
  },
  actionContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  action: {
    backgroundColor: COLOR_PRIMARY_500,
    borderRadius: 17,
  },
  inactiveAction: {
    backgroundColor: COLOR_GREEN_100,
    borderRadius: 17,
  },
  actionButton: {
    padding: 7,
  },
  actionDeleteButton: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    backgroundColor: COLOR_PRIMARY_500,
    borderRadius: 17,
    margin: 7,
  },
  productQuantity: {
    marginHorizontal: 16,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: COLOR_BLACK_900,
  },
});

const Product = ({
  onPress,
  product,
  cartProduct,
  onPressMinus,
  onPressPlus,
  theme,
}) => {
  const not_purchasable =
    !product.purchasable || (product.manage_stock && !product.stock_quantity);
  const brand = product.attributes.find(a => a.name === 'Brand');
  const brand_name = brand ? brand.options.join(',') : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.productContainer,
        {backgroundColor: themes[theme].focusedBackground},
      ]}
      key={product.id}
    >
      <Image
        source={{uri: decodeURIComponent(product.images[0]?.src)}}
        style={styles.productImage}
      />
      <View style={styles.productBody}>
        <Text
          style={[styles.productText, {color: themes[theme].bodyText}]}
          numberOfLines={2}
          ellipsizeMode={'tail'}
        >
          {product.name}
        </Text>
        <Text
          style={styles.productSubText}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        >
          {brand_name}
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
      <Text
        style={[
          styles.productPrice,
          {textAlign: I18n.isRTL ? 'right' : 'auto'},
        ]}
      >
        {product.price} €
      </Text>
      <View style={styles.actionContainer}>
        {cartProduct && (
          <>
            {cartProduct.quantity === 1 ? (
              <TouchableOpacity onPress={onPressMinus} style={styles.action}>
                <Image
                  source={images.icon_trash}
                  style={styles.actionDeleteButton}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={onPressMinus} style={styles.action}>
                <VectorIcon
                  type={'MaterialCommunityIcons'}
                  name={'minus'}
                  size={20}
                  color={COLOR_WHITE}
                  style={styles.actionButton}
                />
              </TouchableOpacity>
            )}
            <Text style={styles.productQuantity}>{cartProduct.quantity}</Text>
          </>
        )}
        <TouchableOpacity
          onPress={onPressPlus}
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
    </TouchableOpacity>
  );
};

export default Product;
