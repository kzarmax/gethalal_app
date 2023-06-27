import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import I18n from '../i18n';
import {date_str_format, DATE_STRING_DISPLAY_FORMAT} from '../utils/datetime';
import {COLOR_ERROR_600, themes} from '../constants/colors';
import sharedStyles from '../views/Styles';
import {VectorIcon} from './VectorIcon';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    ...sharedStyles.textSemibold,
  },
  content: {},
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    height: 52,
    paddingHorizontal: 16,
  },
  emptyValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: '#FF002816',
  },
  value: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  placeholder: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: COLOR_ERROR_600,
  },
  iconStyle: {
    position: 'absolute',
    right: 12,
  },
});

class ExDatePicker extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    containerStyle: PropTypes.object,
    value: PropTypes.object,
    onOpenPicker: PropTypes.func,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    const {label, containerStyle, inputStyle, onOpenPicker, value, theme} =
      this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        {label ? (
          <Text
            contentDescription={null}
            accessibilityLabel={null}
            style={styles.label}
          >
            {label}
          </Text>
        ) : null}
        <View style={styles.content}>
          {value.date ? (
            <TouchableOpacity
              onPress={onOpenPicker}
              style={[styles.valueContainer, inputStyle]}
            >
              {/*<Text style={styles.value}> {DELIVERY_TIMES[value.time].text} {date_str_format(value.date, DATE_STRING_DISPLAY_FORMAT)} {DELIVERY_CYCLES[value.cycle].text}</Text>*/}
              <Text style={styles.value}>
                {date_str_format(value.date, DATE_STRING_DISPLAY_FORMAT)}
              </Text>
              <VectorIcon
                style={styles.iconStyle}
                type={'MaterialCommunityIcons'}
                name={'chevron-right'}
                color={themes[theme].actionColor}
                size={20}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onOpenPicker}
              style={[inputStyle, styles.emptyValueContainer]}
            >
              <Text style={styles.placeholder}>
                {I18n.t('Choose_delivery_date')}
              </Text>
              <VectorIcon
                style={styles.iconStyle}
                type={'MaterialCommunityIcons'}
                name={'chevron-right'}
                color={'#E93C3C'}
                size={20}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

export default ExDatePicker;
