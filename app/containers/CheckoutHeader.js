import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image, Text} from 'react-native';
import I18n from '../i18n';
import images from '../assets/images';
import CheckBox from './CheckBox';
import {COLOR_GRAY_200, COLOR_PRIMARY_500, themes} from '../constants/colors';

const styles = StyleSheet.create({
  headerContainer: {
    height: 82,
    paddingVertical: 12,
    position: 'relative',
  },
  backLine: {
    marginTop: 16,
  },
  backLineImage: {
    height: 4,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  itemsContainer: {
    position: 'absolute',
    left: 0,
    top: 12,
    bottom: 12,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
  },
  itemIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  itemText: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  activeLine1: {
    left: 52,
    right: 32,
    top: 28,
    bottom: 12,
    position: 'absolute',
  },
  activeLine2: {
    left: 32,
    right: 52,
    top: 28,
    bottom: 12,
    position: 'absolute',
  },
  activeLineImage1: {
    height: 4,
    width: '50%',
    resizeMode: 'contain',
  },
  activeLineImage2: {
    height: 4,
    width: '50%',
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
});

const CheckoutHeader = React.memo(({step = 0, theme}) => (
  <View
    style={[
      styles.headerContainer,
      {backgroundColor: themes[theme].headerBackground},
    ]}
  >
    <View style={styles.backLine}>
      <Image source={images.checkout_line} style={styles.backLineImage} />
    </View>
    {step > 0 && (
      <View style={styles.activeLine1}>
        <Image source={images.line_active} style={styles.activeLineImage1} />
      </View>
    )}
    {step > 1 && (
      <View style={styles.activeLine2}>
        <Image source={images.line_active} style={styles.activeLineImage2} />
      </View>
    )}
    <View style={styles.itemsContainer}>
      <View style={styles.itemContainer}>
        <Image source={images.location} style={styles.itemIcon} />
        <Text style={[styles.itemText, {color: COLOR_PRIMARY_500}]}>
          {I18n.t('My_address')}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={step > 0 ? images.credit_card_active : images.credit_card}
          style={styles.itemIcon}
        />
        <Text
          style={[
            styles.itemText,
            {color: step > 0 ? COLOR_PRIMARY_500 : COLOR_GRAY_200},
          ]}
        >
          {I18n.t('Payment')}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={
            step > 1 ? images.order_complete_active : images.order_complete
          }
          style={styles.itemIcon}
        />
        <Text
          style={[
            styles.itemText,
            {color: step > 1 ? COLOR_PRIMARY_500 : COLOR_GRAY_200},
          ]}
        >
          {I18n.t('Order_placed')}
        </Text>
      </View>
    </View>
  </View>
));

CheckBox.propTypes = {
  step: PropTypes.number,
  theme: PropTypes.string,
};

export default CheckoutHeader;
