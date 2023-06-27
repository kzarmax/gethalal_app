import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import I18n from '../i18n';
import {COLOR_BLACK_900, COLOR_SEPARATOR} from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 32,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: COLOR_SEPARATOR,
    width: '40%',
  },
  orText: {
    color: COLOR_BLACK_900,
    fontSize: 18,
    lineHeight: 24,
    paddingVertical: 4,
    fontWeight: '500',
  },
});

const OrSeparator = React.memo(({theme}) => {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <Text style={styles.orText}>{I18n.t('OR')}</Text>
      <View style={styles.separator} />
    </View>
  );
});

OrSeparator.propTypes = {
  theme: PropTypes.string,
};

export default OrSeparator;
