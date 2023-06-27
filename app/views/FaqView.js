/**
 * hosokawa
 * 2021/11/8
 */

import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import I18n from '../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../theme';
import SafeAreaView from '../containers/SafeAreaView';
import StatusBar from '../containers/StatusBar';
import {
  COLOR_BLACK_900,
  COLOR_PRIMARY_500,
  COLOR_SEPARATOR,
  themes,
} from '../constants/colors';
import KeyboardView from '../containers/KeyboardView';
import sharedStyles from './Styles';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import Button from '../containers/Button';
import {VectorIcon} from '../containers/VectorIcon';
import images from '../assets/images';
import Touch from '../utils/touch';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mainContainer: {
    flexGrow: 1,
  },
  title: {
    marginTop: 8,
    marginBottom: 16,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
  },
  text: {
    color: COLOR_BLACK_900,
    fontSize: 16,
    lineHeight: 20,
  },
});

class FaqView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('FAQ'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const title = this.props.route.params?.title ?? '';
    const text = this.props.route.params?.text ?? '';
    this.state = {
      title,
      text,
    };
  }

  render() {
    const {theme} = this.props;
    const {title, text} = this.state;
    return (
      <SafeAreaView style={sharedStyles.container}>
        <StatusBar />
        <View
          style={[
            styles.container,
            {backgroundColor: themes[theme].backgroundColor},
          ]}
          {...scrollPersistTaps}
        >
          <View style={styles.mainContainer}>
            <Text style={{...styles.title, color: COLOR_BLACK_900}}>
              {title}
            </Text>
            <Text style={{...styles.text, color: themes[theme].auxiliaryText}}>
              {text}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(FaqView);
