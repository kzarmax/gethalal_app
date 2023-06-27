import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {
  COLOR_BUTTON_SECONDARY,
  COLOR_BUTTON_DEFAULT,
  COLOR_BUTTON_DANGER,
  COLOR_BUTTON_WHITE,
  COLOR_BUTTON_GRAY,
  COLOR_BUTTON_DONE,
  COLOR_BUTTON_FACEBOOK,
  COLOR_BUTTON_GOOGLE,
  COLOR_BUTTON_TEXT_SECONDARY,
  COLOR_BUTTON_TEXT_DEFAULT,
  COLOR_BUTTON_TEXT_DANGER,
  COLOR_BUTTON_TEXT_DONE,
  COLOR_BUTTON_TEXT_FACEBOOK,
  COLOR_BUTTON_TEXT_GOOGLE,
  COLOR_WHITE,
  COLOR_PRIMARY_500,
  COLOR_BUTTON_TEXT_APPLE,
  COLOR_BUTTON_APPLE,
  themes,
} from '../../constants/colors';
import sharedStyles from '../../views/Styles';
import images from '../../assets/images';

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: COLOR_WHITE,
  },
  buttonContainer: {
    borderRadius: 24,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  oauthIcon: {
    width: 19,
    height: 19,
    marginRight: 4,
    resizeMode: 'contain',
  },
  icon: {
    position: 'absolute',
    left: 7.5,
    top: 7.5,
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 8,
  },
  background_primary: {
    backgroundColor: COLOR_PRIMARY_500,
  },
  background_secondary: {
    backgroundColor: COLOR_BUTTON_SECONDARY,
  },
  background_default: {
    backgroundColor: COLOR_BUTTON_DEFAULT,
  },
  background_danger: {
    backgroundColor: COLOR_BUTTON_DANGER,
  },
  background_white: {
    backgroundColor: COLOR_BUTTON_WHITE,
  },
  background_grey: {
    backgroundColor: COLOR_BUTTON_GRAY,
  },
  background_done: {
    backgroundColor: COLOR_BUTTON_DONE,
  },
  background_facebook: {
    backgroundColor: COLOR_BUTTON_FACEBOOK,
  },
  background_google: {
    backgroundColor: COLOR_BUTTON_GOOGLE,
  },
  background_apple: {
    backgroundColor: COLOR_BUTTON_APPLE,
  },
  text_color_primary: {
    color: COLOR_WHITE,
  },
  text_color_secondary: {
    color: COLOR_BUTTON_TEXT_SECONDARY,
  },
  text_color_default: {
    color: COLOR_BUTTON_TEXT_DEFAULT,
  },
  text_color_danger: {
    color: COLOR_BUTTON_TEXT_DANGER,
  },
  text_color_white: {
    color: COLOR_PRIMARY_500,
  },
  text_color_done: {
    color: COLOR_BUTTON_TEXT_DONE,
  },
  text_color_facebook: {
    color: COLOR_BUTTON_TEXT_FACEBOOK,
  },
  text_color_google: {
    color: COLOR_BUTTON_TEXT_GOOGLE,
  },
  text_color_apple: {
    color: COLOR_BUTTON_TEXT_APPLE,
  },

  button_size_Z: {
    width: 335,
  },
  button_size_Y: {
    width: 201,
  },
  button_size_X: {
    width: 125,
  },
  button_size_W: {
    width: '100%',
  },
  button_size_V: {
    width: 125,
  },
  button_size_U: {
    width: 140,
  },
  button_size_T: {
    width: 313,
  },
  button_size_S: {
    width: 345,
  },

  font_weight_regular: {
    ...sharedStyles.textRegular,
  },
  font_weight_medium: {
    ...sharedStyles.textMedium,
  },
  font_weight_semibold: {
    ...sharedStyles.textSemibold,
  },
  font_weight_bold: {
    ...sharedStyles.textBold,
  },
  iconStyle: {
    marginLeft: 40,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default class Button extends React.PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    icon: PropTypes.string,
    iconCenter: PropTypes.func,
    type: PropTypes.string,
    size: PropTypes.string,
    onPress: PropTypes.func,
    hidden: PropTypes.bool,
    disabled: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    backgroundColor: PropTypes.string,
    loading: PropTypes.bool,
    style: PropTypes.any,
    textColor: PropTypes.string,
    fontWeight: PropTypes.string,
    theme: PropTypes.string,
  };

  static defaultProps = {
    title: 'Press me!',
    type: 'primary',
    size: 'Z',
    onPress: () => alert('It works!'),
    icon: null,
    hidden: false,
    disabled: false,
    loading: false,
  };

  render() {
    const {
      title,
      text,
      icon,
      type,
      size,
      onPress,
      iconCenter,
      hidden,
      disabled,
      width,
      height,
      backgroundColor,
      loading,
      style,
      textColor: color,
      fontWeight,
      theme,
      ...otherProps
    } = this.props;

    if (hidden) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        enabled={!(disabled || loading)}
        style={[
          styles.container,
          size ? styles[`button_size_${size}`] : {},
          icon ? {flexDirection: 'row', alignItems: 'center'} : {},
          style,
        ]}
        activeOpacity={0.7}
        {...otherProps}
      >
        {icon ? (
          <Image source={images[`${icon}`]} style={styles.iconStyle} />
        ) : null}
        <View
          style={[
            styles.buttonContainer,
            styles[`background_${type}`],
            size ? styles[`button_size_${size}`] : {},
            width ? {width} : {},
            height ? {height} : {},
          ]}
        >
          {loading ? (
            <ActivityIndicator color={color ?? themes[theme].loadingColor} />
          ) : (
            <>
              {iconCenter ? iconCenter() : null}
              <Text
                style={[
                  styles.text,
                  styles[`text_color_${type}`],
                  disabled && {color: themes[theme].auxiliaryText},
                ]}
              >
                {text || title}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
