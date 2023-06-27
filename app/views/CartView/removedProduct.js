import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_GRAY_400,
  COLOR_GRAY_600,
  COLOR_PRIMARY_500,
  COLOR_WHITE,
  themes,
} from '../../constants/colors';
import I18n from '../../i18n';
import {getPriceText} from '../../utils/string';

const styles = StyleSheet.create({
  productContainer: {
    width: '47%',
    height: 274,
    borderRadius: 8,
    marginBottom: 24,
    padding: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  productBody: {
    marginTop: 8,
    height: 86,
  },
  productText: {
    color: COLOR_BLACK_900,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
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
    marginTop: 2,
  },
  productPrice: {
    color: COLOR_BLACK_900,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    marginTop: 8,
  },
  actionContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: COLOR_PRIMARY_500,
    borderRadius: 8,
    padding: 8,
  },
  actionBtn: {
    color: COLOR_WHITE,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
});

const RemovedProduct = ({onPress, product, onPressRemind, theme}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.productContainer,
        {backgroundColor: themes[theme].backgroundColor},
      ]}
      key={product.id}
    >
      <Image source={{uri: product.image_url}} style={styles.productImage} />
      <View style={styles.productBody}>
        <Text
          style={[styles.productText, {color: themes[theme].bodyText}]}
          numberOfLines={2}
          ellipsizeMode={'tail'}
        >
          {product.title}
        </Text>
        <Text
          style={styles.productSubText}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        >
          {product.sub_title}
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
        <TouchableOpacity onPress={onPressRemind} style={styles.btnContainer}>
          <Text style={styles.actionBtn}>{I18n.t('Remind_me')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default RemovedProduct;
