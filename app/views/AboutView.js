import React from 'react';
import I18n from '../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../theme';
import SafeAreaView from '../containers/SafeAreaView';
import StatusBar from '../containers/StatusBar';
import {COLOR_SEPARATOR, themes} from '../constants/colors';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Linking,
} from 'react-native';
import Button from '../containers/Button';
import {VectorIcon} from '../containers/VectorIcon';
import {getAboutUsUrl, getPrivacyUrl, getTermsUrl} from '../constants/app';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  actionBtn: {},
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingRight: 8,
  },
  itemText: {
    color: 'black',
    fontSize: 16,
    lineHeight: 20,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR_SEPARATOR,
    marginHorizontal: 12,
  },
});

class AboutView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('About_get_halal'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.menus = [
      {id: 'terms', title: I18n.t('Terms_conditions')},
      {id: 'privacy', title: I18n.t('Privacy_policy')},
      {id: 'about_us', title: I18n.t('About_us')},
    ];
  }

  onPressItem = async menu_id => {
    let site_link = '';
    switch (menu_id) {
      case 'terms':
        site_link = getTermsUrl(I18n.locale);
        break;
      case 'privacy':
        site_link = getPrivacyUrl(I18n.locale);
        break;
      case 'about_us':
        site_link = getAboutUsUrl(I18n.locale);
        break;
    }

    try {
      await Linking.openURL(site_link);
    } catch (e) {}
  };

  onGoToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  renderItem = ({item}) => {
    const {theme} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.onPressItem(item.id)}
        style={styles.itemContainer}
      >
        <Text style={styles.itemText}>{item.title}</Text>
        <VectorIcon
          type={'Ionicons'}
          name={'md-chevron-forward'}
          size={20}
          color={'grey'}
        />
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const {theme} = this.props;

    return (
      <SafeAreaView>
        <StatusBar />
        <View
          style={[
            styles.container,
            {backgroundColor: themes[theme].backgroundColor},
          ]}
        >
          <FlatList
            style={{width: '100%'}}
            contentContainerStyle={{
              backgroundColor: themes[theme].focusedBackground,
              borderRadius: 8,
              padding: 16,
            }}
            data={this.menus}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(AboutView);
