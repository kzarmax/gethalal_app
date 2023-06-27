import React from 'react';
import I18n, {LANGUAGES} from '../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../theme';
import SafeAreaView from '../containers/SafeAreaView';
import StatusBar from '../containers/StatusBar';
import {COLOR_BLACK_900, COLOR_SEPARATOR, themes} from '../constants/colors';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
} from 'react-native';
import Button from '../containers/Button';
import {VectorIcon} from '../containers/VectorIcon';
import images from '../assets/images';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainContainer: {
    justifyContent: 'center',
  },
  actionBtn: {
    marginTop: 112,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingLeft: 20,
    paddingRight: 24,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  itemText: {
    marginLeft: 12,
    color: COLOR_BLACK_900,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR_SEPARATOR,
    marginHorizontal: 12,
  },
});

class AccountView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Account'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const language = LANGUAGES.find(l => l.value === I18n.locale);
    this.menus = [
      {
        id: 'about_gethalal',
        icon: 'menu_about',
        title: I18n.t('About_gethalal'),
      },
      {
        id: 'language',
        icon: 'menu_language',
        title: I18n.t('Language_', {language: language.label}),
      },
    ];
  }

  onPressItem = menu_id => {
    const {navigation} = this.props;

    switch (menu_id) {
      case 'about_gethalal':
        navigation.replace('About');
        break;
      case 'language':
        navigation.replace('Language');
        break;
    }
  };

  onGoToLogin = () => {
    this.props.navigation.replace('Login');
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.onPressItem(item.id)}
        style={styles.itemContainer}
      >
        <View style={styles.itemHeader}>
          <Image source={images[item.icon]} style={styles.itemIcon} />
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
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
          <View style={styles.mainContainer}>
            <Button
              style={styles.actionBtn}
              title={I18n.t('Login_and_signup')}
              type="primary"
              size="W"
              onPress={this.onGoToLogin}
              theme={theme}
            />
            <FlatList
              style={{width: '100%', marginTop: 80}}
              contentContainerStyle={{
                backgroundColor: themes[theme].focusedBackground,
                borderRadius: 8,
              }}
              data={this.menus}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(AccountView);
