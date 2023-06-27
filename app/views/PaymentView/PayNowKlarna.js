import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {VectorIcon} from '../../containers/VectorIcon';
import {COLOR_BLACK_900, COLOR_PRIMARY_500} from '../../constants/colors';
import I18n from '../../i18n';
import images from '../../assets/images';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  paymentContainer: {
    padding: 16,
  },
  initContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  initText: {
    color: COLOR_BLACK_900,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    marginLeft: 12,
    flexGrow: 1,
  },
  logoIcon: {
    marginHorizontal: 2,
    width: 40,
    height: 20,
    resizeMode: 'contain',
  },
});

const PayNowKlarna = React.memo(({checked}) => (
  <View style={styles.paymentContainer}>
    <View style={styles.initContainer}>
      <VectorIcon
        type={'MaterialIcons'}
        name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={24}
        color={COLOR_PRIMARY_500}
      />
      <Text style={styles.initText}>{I18n.t('Pay_now_klarna')}</Text>
      <Image source={images.klarna_logo} style={styles.logoIcon} />
    </View>
  </View>
));

PayNowKlarna.prototype = {
  checked: PropTypes.bool,
  theme: PropTypes.string,
};

export default PayNowKlarna;
