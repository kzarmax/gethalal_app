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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

import I18n from '../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../theme';
import SafeAreaView from '../containers/SafeAreaView';
import StatusBar from '../containers/StatusBar';
import {COLOR_BLACK_900, COLOR_SEPARATOR, themes} from '../constants/colors';
import sharedStyles from './Styles';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import Button from '../containers/Button';
import images from '../assets/images';
import {LOCALIZATION_ID} from '../constants/keys';
import {showConfirmationAlert} from '../lib/info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  mainContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 26,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: COLOR_BLACK_900,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR_SEPARATOR,
    marginHorizontal: 12,
  },
  checkIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
  actionBtn: {
    marginTop: 130,
  },
});

class LanguageView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Language'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      language: I18n.locale,
    };

    // TODO change const
    this.languages = [
      {id: 'en', title: I18n.t('English')},
      {id: 'ar', title: I18n.t('Arabic')},
      {id: 'de', title: I18n.t('Deutsch')},
    ];
  }

  renderSeparator = () => <View style={styles.separator} />;

  onPressItem = async id => {
    this.setState({language: id});
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.onPressItem(item.id)}
        style={styles.itemContainer}
      >
        <Text style={styles.itemText}>{item.title}</Text>
        {this.state.language === item.id && (
          <Image source={images.check_icon} style={styles.checkIcon} />
        )}
      </TouchableOpacity>
    );
  };

  onSave = () => {
    if (this.state.language === I18n.locale) {
      return;
    }
    showConfirmationAlert({
      title: I18n.t('Change_language'),
      message: I18n.t('Are_you_sure_to_restart_for_changing_language'),
      callToAction: I18n.t('Confirm'),
      onPress: async () => {
        await AsyncStorage.setItem(LOCALIZATION_ID, this.state.language);
        RNRestart.Restart();
      },
    });
  };

  render() {
    const {theme} = this.props;
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
            <View>
              <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{
                  backgroundColor: themes[theme].focusedBackground,
                  borderRadius: 8,
                }}
                data={this.languages}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={item => item.id}
              />
            </View>
            <Button
              style={styles.actionBtn}
              title={I18n.t('Save')}
              type="primary"
              size="W"
              onPress={this.onSave}
              theme={theme}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(LanguageView);
