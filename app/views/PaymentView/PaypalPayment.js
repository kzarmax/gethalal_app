import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

const PaypalPayment = React.memo(({checked, onSelect}) => (
  <View style={styles.paymentContainer}>
    <TouchableOpacity onPress={onSelect} style={styles.initContainer}>
      <VectorIcon
        type={'MaterialIcons'}
        name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={24}
        color={COLOR_PRIMARY_500}
      />
      <Text style={styles.initText}>{I18n.t('Pay_with_paypal')}</Text>
      <Image source={images.paypal_logo} style={styles.logoIcon} />
    </TouchableOpacity>
  </View>
));

PaypalPayment.prototype = {
  checked: PropTypes.bool,
  theme: PropTypes.string,
};

export default PaypalPayment;