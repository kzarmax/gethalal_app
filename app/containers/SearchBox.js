import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';

import sharedStyles from '../views/Styles';
import {withTheme} from '../theme';
import {COLOR_BLACK, COLOR_GRAY_100, themes} from '../constants/colors';
import {VectorIcon} from './VectorIcon';
import {isAndroid} from '../utils/deviceInfo';

const styles = StyleSheet.create({
  container: {},
  searchBox: {
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    backgroundColor: COLOR_GRAY_100,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 12,
    padding: 0,
    fontWeight: '400',
    color: COLOR_BLACK,
  },
  cancel: {},
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
});

const CancelButton = (onCancelPress, theme) => (
  <Touchable onPress={onCancelPress} style={styles.cancel}>
    <VectorIcon
      type={'MaterialCommunityIcons'}
      name="close"
      size={16}
      color={themes[theme].headerTintColor}
    />
  </Touchable>
);

const SearchBox = ({
  onChangeText,
  onSubmitEditing,
  testID,
  hasCancel,
  onCancelPress,
  inputRef,
  placeholder,
  containerStyle,
  theme,
  ...props
}) => (
  <View style={[styles.container, containerStyle]}>
    <View style={[styles.searchBox]}>
      <VectorIcon
        name="search"
        type="Ionicons"
        size={18}
        color={themes[theme].auxiliaryText}
      />
      <TextInput
        ref={inputRef}
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit
        clearButtonMode="while-editing"
        placeholder={placeholder ?? 'Search'}
        returnKeyType="search"
        style={styles.input}
        testID={testID}
        underlineColorAndroid="transparent"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor={themes[theme].auxiliaryText}
        theme={theme}
        {...props}
      />
      {isAndroid && hasCancel ? CancelButton(onCancelPress, theme) : null}
    </View>
  </View>
);

SearchBox.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func,
  hasCancel: PropTypes.bool,
  onCancelPress: PropTypes.func,
  theme: PropTypes.string,
  inputRef: PropTypes.func,
  testID: PropTypes.string,
  placeholder: PropTypes.string,
};

export default withTheme(SearchBox);
