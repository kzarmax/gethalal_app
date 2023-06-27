import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLOR_BLACK_900, themes} from '../../constants/colors';
import CheckBox from '../../containers/CheckBox';
import I18n from '../../i18n';
import GethalalCart from '../../lib/cart';

const styles = StyleSheet.create({
  shippingMethods: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {},
  totalTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: COLOR_BLACK_900,
  },
  totalText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: COLOR_BLACK_900,
  },
});

const ShippingMethods = ({
  shippingMethods,
  taxes,
  onPress,
  activeMethod,
  theme,
}) => {
  if (shippingMethods.length < 1) {
    return null;
  }

  if (shippingMethods.length === 1) {
    return (
      <View style={styles.shippingMethods}>
        <View style={styles.title}>
          <Text style={styles.totalTitle}>{I18n.t('Shipping_method')}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.totalText}>
            {GethalalCart.getShippingLabel(shippingMethods[0], taxes)}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.shippingMethods}>
      <View style={styles.title}>
        <Text style={styles.totalTitle}>{I18n.t('Shipping_method')}</Text>
      </View>
      <View style={styles.content}>
        {shippingMethods.map(sm => (
          <CheckBox
            title={GethalalCart.getShippingLabel(sm, taxes)}
            checked={activeMethod.id === sm.id}
            onPress={() => onPress(sm)}
            onPressIcon={() => onPress(sm)}
            textStyle={{color: themes[theme].bodyText, fontWeight: 'bold'}}
            containerStyle={styles.itemContent}
          />
        ))}
      </View>
    </View>
  );
};

export default ShippingMethods;
