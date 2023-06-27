import React, {useState} from 'react';
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
import {getPriceText, removeTags} from '../../utils/string';
import I18n from '../../i18n';

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    height: 140,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    padding: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
    alignSelf: 'center',
  },
  productBody: {
    marginLeft: 16,
    flexGrow: 1,
    flex: 1,
  },
  productContent: {
    height: 74,
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
    fontWeight: '400',
    marginTop: 2,
  },
  productUnitPrice: {
    color: COLOR_GRAY_400,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    marginTop: 4,
  },
  cartContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    color: COLOR_BLACK_900,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    marginTop: 12,
  },
  actionContainer: {
    marginTop: 4,
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

const CartProduct = ({onPress, product, onPressMinus, onPressPlus, theme}) => {
  const not_purchasable =
    !product.purchasable || (product.manage_stock && !product.stock_quantity);
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
        <View style={styles.productContent}>
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
            {removeTags(product.short_description)}
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
        <View style={styles.cartContent}>
          <Text
            style={[
              styles.productPrice,
              {textAlign: I18n.isRTL ? 'right' : 'auto'},
            ]}
          >
            {product.price} €
          </Text>
          <View style={styles.actionContainer}>
            {product && (
              <>
                {product.quantity === 1 ? (
                  <TouchableOpacity
                    onPress={onPressMinus}
                    style={styles.action}
                  >
                    <Image
                      source={images.icon_trash}
                      style={styles.actionDeleteButton}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={onPressMinus}
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
                <Text style={styles.productQuantity}>{product.quantity}</Text>
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartProduct;
