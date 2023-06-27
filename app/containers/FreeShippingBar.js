import {Text, View, StyleSheet} from 'react-native';
import I18n from '../i18n';
import {
  COLOR_BLACK,
  COLOR_GRAY_200,
  COLOR_PRIMARY_50,
  COLOR_PRIMARY_900,
} from '../constants/colors';
import React from 'react';

const styles = StyleSheet.create({
  freeShippingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: COLOR_PRIMARY_50,
  },
  progressBarContainer: {
    marginHorizontal: 32,
    height: 6,
    marginVertical: 8,
    backgroundColor: COLOR_GRAY_200,
    position: 'relative',
    borderRadius: 6,
  },
  progressBar: {
    position: 'absolute',
    borderRadius: 6,
    height: 6,
    backgroundColor: COLOR_PRIMARY_900,
  },
  freeShippingLabel: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  freeShippingText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: COLOR_BLACK,
  },
});

const FreeShippingBar = React.memo(
  ({freeShippingPercent, freeShippingRemains}) => {
    return (
      <View style={styles.freeShippingContainer}>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, {width: `${freeShippingPercent}%`}]}
          />
        </View>
        {freeShippingRemains > 0 ? (
          <View style={styles.freeShippingLabel}>
            <Text style={styles.freeShippingText}>{I18n.t('Add')} </Text>
            <Text style={[styles.freeShippingText, {color: COLOR_PRIMARY_900}]}>
              ${freeShippingRemains}{' '}
            </Text>
            <Text style={styles.freeShippingText}>
              {I18n.t('To_cart_for_')}
            </Text>
            <Text style={[styles.freeShippingText, {color: COLOR_PRIMARY_900}]}>
              {I18n.t('Shipping_free')}
            </Text>
          </View>
        ) : (
          <View style={styles.freeShippingLabel}>
            <Text style={styles.freeShippingText}>
              {I18n.t('You_have_got_')}
            </Text>
            <Text style={[styles.freeShippingText, {color: COLOR_PRIMARY_900}]}>
              {I18n.t('Free_shipping')}
            </Text>
            <Text style={styles.freeShippingText}>{I18n.t('Well_done_')}</Text>
          </View>
        )}
      </View>
    );
  },
);

export default FreeShippingBar;
