/**
 * hosokawa
 * 2021/11/2
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import sharedStyles from '../views/Styles';
import {COLOR_DANGER, COLOR_PRIMARY_900, themes} from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isIOS} from '../utils/deviceInfo';
import {BorderlessButton} from 'react-native-gesture-handler';
import {VectorIcon} from './VectorIcon';

const styles = StyleSheet.create({
  error: {
    ...sharedStyles.textAlignCenter,
    paddingTop: 5,
  },
  inputContainer: {
    marginTop: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    textTransform: 'uppercase',
    ...sharedStyles.textSemibold,
  },
  required: {
    marginBottom: 10,
    color: COLOR_DANGER,
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    ...sharedStyles.textRegular,
    fontSize: 16,
    lineHeight: 20,
    padding: 16,
    borderRadius: 8,
  },
  inputIconLeft: {
    paddingLeft: 54,
  },
  inputIconRight: {
    paddingRight: 45,
  },
  wrap: {
    position: 'relative',
    borderRadius: 8,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 52,
    height: 52,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  iconRight: {},
  icon: {
    color: '#2F343D',
  },
});

export default class RCTextInput extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string,
    labelStyle: PropTypes.object,
    required: PropTypes.string,
    error: PropTypes.object,
    loading: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    containerStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    inputRef: PropTypes.func,
    testID: PropTypes.string,
    iconLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    iconRight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    placeholder: PropTypes.string,
    left: PropTypes.element,
    onIconRightPress: PropTypes.func,
    theme: PropTypes.string,
  };

  static defaultProps = {
    error: {},
    theme: 'dark',
  };

  state = {
    showPassword: false,
  };

  get iconLeft() {
    const {testID, iconLeft, theme} = this.props;
    return (
      <View
        style={[styles.iconContainer, {backgroundColor: COLOR_PRIMARY_900}]}
      >
        <Image
          source={iconLeft}
          testID={testID ? `${testID}-icon-left` : null}
          style={[styles.iconLeft, {color: themes[theme].bodyText}]}
        />
      </View>
    );
  }

  get iconRight() {
    const {iconRight, onIconRightPress, theme} = this.props;
    return (
      <MaterialCommunityIcons
        name={iconRight.icon}
        style={{color: themes[theme].bodyText}}
        size={18}
      />
    );
  }

  get iconPassword() {
    const {showPassword} = this.state;
    const {testID, theme} = this.props;
    return (
      <TouchableOpacity
        onPress={this.tooglePassword}
        style={[styles.iconContainer, styles.iconRight]}
      >
        <VectorIcon
          type={'FontAwesome'}
          name={showPassword ? 'eye' : 'eye-slash'}
          testID={testID ? `${testID}-icon-right` : null}
          style={{color: themes[theme].auxiliaryText}}
          size={18}
        />
      </TouchableOpacity>
    );
  }

  tooglePassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}));
  };

  render() {
    const {showPassword} = this.state;
    const {
      label,
      labelStyle,
      left,
      required,
      error,
      loading,
      secureTextEntry,
      containerStyle,
      inputRef,
      iconLeft,
      iconRight,
      inputStyle,
      testID,
      placeholder,
      theme,
      ...inputProps
    } = this.props;
    const {dangerColor} = themes[theme];
    return (
      <View style={[styles.inputContainer, containerStyle]}>
        {label ? (
          <Text
            contentDescription={null}
            accessibilityLabel={null}
            style={[
              styles.label,
              {color: themes[theme].infoText},
              error.error && {color: dangerColor},
              labelStyle,
            ]}
          >
            {label}
            {required ? (
              <Text
                contentDescription={null}
                accessibilityLabel={null}
                style={[styles.required, error.error]}
              >{` ${required}`}</Text>
            ) : null}
          </Text>
        ) : null}
        <View style={styles.wrap}>
          <TextInput
            style={[
              styles.input,
              iconLeft && styles.inputIconLeft,
              (secureTextEntry || iconRight) && styles.inputIconRight,
              {
                backgroundColor: themes[theme].auxiliaryBackground,
                color: themes[theme].bodyText,
              },
              error.error && {
                color: dangerColor,
                borderColor: dangerColor,
              },
              inputStyle,
            ]}
            ref={inputRef}
            autoCorrect={false}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            secureTextEntry={secureTextEntry && !showPassword}
            testID={testID}
            accessibilityLabel={placeholder}
            placeholder={placeholder}
            contentDescription={placeholder}
            placeholderTextColor={themes[theme].auxiliaryText}
            theme={'light'}
            {...inputProps}
          />
          {iconLeft ? this.iconLeft : null}
          {iconRight ? this.iconRight : null}
          {secureTextEntry ? this.iconPassword : null}
          {loading ? this.loading : null}
          {left}
        </View>
        {error && error.reason ? (
          <Text style={[styles.error, {color: dangerColor}]}>
            {error.reason}
          </Text>
        ) : null}
      </View>
    );
  }
}
