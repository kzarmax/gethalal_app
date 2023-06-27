import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image, Text} from 'react-native';
import I18n from '../i18n';
import images from '../assets/images';
import CheckBox from './CheckBox';
import {
  COLOR_BLACK_900,
  COLOR_GRAY_400,
  COLOR_GREEN_400,
  themes,
} from '../constants/colors';
import {SHIPMENTS_ORDER_STATES} from '../constants/app';
import {date_str_format} from '../utils/datetime';

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    marginTop: 12,
    position: 'relative',
  },
  backLine: {
    left: 20,
    right: 20,
    top: 10,
    bottom: 0,
    position: 'absolute',
  },
  backLineImage: {
    height: 4,
    alignSelf: 'flex-start',
    width: '33%',
    resizeMode: 'contain',
  },
  itemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemContainer: {
    alignItems: 'center',
  },
  itemIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'white',
    resizeMode: 'contain',
  },
  itemText: {
    marginTop: 20,
    fontWeight: '500',
    color: COLOR_BLACK_900,
    fontSize: 14,
    lineHeight: 18,
  },
  activeLine1: {
    left: 20,
    right: 20,
    top: 10,
    bottom: 0,
    position: 'absolute',
  },
  activeLine2: {
    left: 20,
    right: 20,
    top: 10,
    bottom: 0,
    position: 'absolute',
  },
  activeLineImage1: {
    height: 4,
    width: '33%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  activeLineImage2: {
    height: 4,
    width: '33%',
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  itemDate: {
    color: COLOR_BLACK_900,
    fontSize: 12,
    lineHeight: 14,
    marginTop: 8,
  },
  itemTime: {
    color: COLOR_GRAY_400,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 8,
  },
});

const TrackOrderHeader = React.memo(({shipments, theme}) => {
  let step = 0;
  let shipment = null;
  if (shipments && shipments.length > 0) {
    shipment = shipments[shipments.length - 1];
    const shipments_status = shipment.status;
    step = Object.keys(SHIPMENTS_ORDER_STATES).indexOf(shipments_status) + 1;
  }

  return (
    <View
      style={[
        styles.headerContainer,
        {backgroundColor: themes[theme].headerBackground},
      ]}
    >
      <View style={styles.backLine}>
        <Image
          source={step > 0 ? images.active_line : images.dot_line}
          style={styles.backLineImage}
        />
      </View>
      <View style={styles.activeLine1}>
        <Image
          source={step > 1 ? images.active_line : images.dot_line}
          style={styles.activeLineImage1}
        />
      </View>
      <View style={styles.activeLine2}>
        <Image
          source={step > 2 ? images.active_line : images.dot_line}
          style={styles.activeLineImage2}
        />
      </View>
      <View style={styles.itemsContainer}>
        <View style={styles.itemContainer}>
          {step > 0 ? (
            <>
              <Image source={images.check_icon} style={styles.itemIcon} />
              <Text style={styles.itemText}>{I18n.t('Placed')}</Text>
              <Text style={styles.itemDate}>
                {date_str_format(shipment.date_created_gmt, 'ddd, D')}
              </Text>
              <Text style={styles.itemTime}>
                {date_str_format(shipment.date_created_gmt, 'hh:mm a')}
              </Text>
            </>
          ) : (
            <>
              <Image source={images.uncheck_icon} style={styles.itemIcon} />
              <Text style={styles.itemText}>{I18n.t('Placed')}</Text>
            </>
          )}
        </View>
        <View style={styles.itemContainer}>
          {step > 1 ? (
            <>
              <Image source={images.check_icon} style={styles.itemIcon} />
              <Text style={styles.itemText}>{I18n.t('Preparing')}</Text>
              <Text style={styles.itemDate}>
                {date_str_format(shipment.date_created_gmt, 'ddd, D')}
              </Text>
              <Text style={styles.itemTime}>
                {date_str_format(shipment.date_created_gmt, 'hh:mm a')}
              </Text>
            </>
          ) : (
            <>
              <Image source={images.uncheck_icon} style={styles.itemIcon} />
              <Text style={styles.itemText}>{I18n.t('Preparing')}</Text>
            </>
          )}
        </View>
        <View style={styles.itemContainer}>
          {step > 2 ? (
            <>
              <Image source={images.check_icon} style={styles.itemIcon} />
              <Text style={styles.itemText}>{I18n.t('Shipping')}</Text>
              <Text style={styles.itemDate}>
                {date_str_format(shipment.date_sent, 'ddd, D')}
              </Text>
              <Text style={styles.itemTime}>
                {date_str_format(shipment.date_sent, 'hh:mm a')}
              </Text>
            </>
          ) : (
            <>
              <Image source={images.uncheck_icon} style={styles.itemIcon} />
              <Text style={styles.itemText}>{I18n.t('Shipping')}</Text>
            </>
          )}
        </View>
        <View style={styles.itemContainer}>
          {step > 3 ? (
            <>
              <Image source={images.check_icon} style={styles.itemIcon} />
              <Text style={styles.itemText}>{I18n.t('Delivered')}</Text>
              <Text style={styles.itemDate}>
                {date_str_format(shipment.est_delivery_date, 'ddd, D')}
              </Text>
              <Text style={styles.itemTime}>
                {date_str_format(shipment.est_delivery_date, 'hh:mm a')}
              </Text>
            </>
          ) : (
            <>
              <Image source={images.uncheck_icon} style={styles.itemIcon} />
              <Text style={styles.itemText}>{I18n.t('Delivered')}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
});

CheckBox.propTypes = {
  step: PropTypes.number,
  theme: PropTypes.string,
};

export default TrackOrderHeader;
