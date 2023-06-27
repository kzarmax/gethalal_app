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
  itemContainer: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  itemTitle: {
    color: COLOR_BLACK_900,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  itemMessage: {
    color: COLOR_PRIMARY_500,
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
  },
  emptyContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    with: 54,
    height: 65,
    resizeMode: 'contain',
  },
  noNotifications: {
    marginTop: 8,
    fontSize: 20,
    lineHeight: 26,
    color: COLOR_BLACK_900,
  },
  noNotificationCaption: {
    fontSize: 12,
    lineHeight: 20,
    marginTop: 8,
  },
});

class NotificationView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Notification'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      notifications: [],
      // notifications: [
      //     {id: 1, title: 'Notification Title', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in'},
      //     {id: 1, title: 'Notification Title', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in'}
      // ]
    };
  }

  renderItem = ({item}) => {
    const {theme} = this.props;
    return (
      <View
        style={[
          styles.itemContainer,
          {backgroundColor: themes[theme].focusedBackground},
        ]}
      >
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemMessage}>{item.message}</Text>
      </View>
    );
  };

  render() {
    const {theme} = this.props;
    const {notifications} = this.state;
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
            {notifications.length > 0 ? (
              <FlatList
                style={{width: '100%'}}
                data={notifications}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Image
                  source={images.emptyNotifications}
                  style={styles.emptyIcon}
                />
                <Text style={styles.noNotifications}>
                  {I18n.t('No_notifications')}
                </Text>
                <Text style={styles.noNotificationCaption}>
                  {I18n.t('No_notifications_caption')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(NotificationView);
