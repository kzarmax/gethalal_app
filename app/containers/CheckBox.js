import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  COLOR_GRAY_100,
  COLOR_GRAY_600,
  COLOR_PRIMARY_900,
} from '../constants/colors';
import images from '../assets/images';

const styles = StyleSheet.create({
  verticalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  verticalTitle: {
    marginTop: 12,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '700',
  },
  title: {
    marginLeft: 20,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});

const CheckBox = React.memo(
  ({title, vertical, checked, textStyle, containerStyle, onPress}) => (
    <TouchableOpacity
      style={[
        containerStyle,
        vertical ? styles.verticalContainer : styles.container,
      ]}
      onPress={onPress}
    >
      <Image
        source={checked ? images.check_icon : images.uncheck_icon}
        style={[styles.icon, !checked && {tintColor: '#9D9898'}]}
      />
      {title ? (
        <Text
          style={[
            textStyle,
            vertical ? styles.verticalTitle : styles.title,
            vertical && !checked && {color: COLOR_GRAY_100},
          ]}
        >
          {title}
        </Text>
      ) : null}
    </TouchableOpacity>
  ),
);

CheckBox.propTypes = {
  title: PropTypes.string,
  checked: PropTypes.bool,
  vertical: PropTypes.bool,
  checkedColor: PropTypes.string,
  unCheckedColor: PropTypes.string,
  checkedIcon: PropTypes.string,
  uncheckedIcon: PropTypes.string,
  textStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  onPress: PropTypes.func,
};

export default CheckBox;
