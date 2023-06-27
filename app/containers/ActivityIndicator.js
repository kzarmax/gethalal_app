/**
 * hosokawa
 * 2021/11/2
 */

import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {COLOR_PRIMARY_500} from '../constants/colors';

const styles = StyleSheet.create({
  indicator: {
    padding: 16,
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100000,
  },
});

const RCActivityIndicator = ({theme, absolute, ...props}) => (
  <ActivityIndicator
    style={[styles.indicator, absolute && styles.absolute]}
    color={COLOR_PRIMARY_500}
    {...props}
  />
);

RCActivityIndicator.propTypes = {
  theme: PropTypes.string,
  absolute: PropTypes.bool,
  props: PropTypes.object,
};

RCActivityIndicator.defaultProps = {
  theme: 'dark',
};

export default RCActivityIndicator;
