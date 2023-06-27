/**
 * hosokawa
 * 2021/11/8
 */

import React from 'react';
import {View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import I18n, {LANGUAGES} from '../../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../../theme';
import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import {themes} from '../../constants/colors';
import {VectorIcon} from '../../containers/VectorIcon';
import images from '../../assets/images';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import styles from './styles';
import GethalalSdk from '../../lib/gethalalSdk';
import {logout as logoutAction} from '../../actions/login';

class ProfileView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Account'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.mainMenus = [
      {id: 'my_address', icon: 'menu_location', title: I18n.t('My_address')},
      {id: 'my_orders', icon: 'menu_my_orders', title: I18n.t('My_orders')},
      {
        id: 'payment_methods',
        icon: 'menu_payment_methods',
        title: I18n.t('Payment_methods'),
      },
      // {
      //   id: 'notification',
      //   icon: 'menu_notification',
      //   title: I18n.t('Notification'),
      // },
      {
        id: 'change_password',
        icon: 'menu_change_password',
        title: I18n.t('Change_password'),
      },
    ];
    const language = LANGUAGES.find(l => l.value === I18n.locale);
    this.subMenus = [
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
    const {navigation, addresses, paymentMethods} = this.props;

    switch (menu_id) {
      case 'my_address':
        if (addresses.length > 0) {
          navigation.navigate('MyAddress');
        } else {
          navigation.navigate('NewAddress');
        }
        break;
      case 'my_orders':
        navigation.navigate('MyOrders');
        break;
      case 'payment_methods':
        if ((paymentMethods.cc?.length ?? 0) > 0) {
          navigation.navigate('PaymentMethod');
        } else {
          navigation.navigate('NewPaymentMethod');
        }
        break;
      case 'notification':
        navigation.navigate('Notification');
        break;
      case 'change_password':
        navigation.navigate('ChangePassword');
        break;
      case 'about_gethalal':
        navigation.navigate('About');
        break;
      case 'language':
        navigation.replace('Language');
        break;
    }
  };

  onLogout = async () => {
    await GethalalSdk.logout();
    const {logout, navigation} = this.props;
    logout();
    navigation.navigate('Home');
  };

  renderMenus = menus => {
    const render = [];
    menus.forEach((m, index) => {
      render.push(this.renderItem(m));
      if (index < menus.length - 1) {
        render.push(this.renderSeparator());
      }
    });
    return render;
  };

  renderItem = item => {
    const {theme} = this.props;
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
    const {navigation, user, theme} = this.props;

    return (
      <SafeAreaView>
        <StatusBar />
        <ScrollView
          style={[
            styles.container,
            {backgroundColor: themes[theme].backgroundColor},
          ]}
          {...scrollPersistTaps}
        >
          <View
            style={[
              styles.profileContainer,
              {
                backgroundColor: themes[theme].focusedBackground,
                borderRadius: 8,
              },
            ]}
          >
            <View style={styles.profileTitle}>
              <Text style={styles.profileName}>{user.name}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileEdit')}
              >
                <Image source={images.icon_edit} style={styles.editIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
          <View
            style={{
              width: '100%',
              marginTop: 20,
              backgroundColor: themes[theme].focusedBackground,
              borderRadius: 8,
            }}
          >
            {this.renderMenus(this.mainMenus)}
          </View>
          <View
            style={{
              width: '100%',
              marginTop: 16,
              backgroundColor: themes[theme].focusedBackground,
              borderRadius: 8,
            }}
          >
            {this.renderMenus(this.subMenus)}
          </View>
          <TouchableOpacity
            onPress={() => this.onLogout()}
            style={[
              styles.logoutContainer,
              {
                backgroundColor: themes[theme].focusedBackground,
                borderRadius: 8,
              },
            ]}
          >
            <View style={styles.itemHeader}>
              <Image source={images.menu_logout} style={styles.itemIcon} />
              <Text style={styles.itemText}>{I18n.t('Logout')}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.appBottomText}>{I18n.t('Bottom_text')}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
  addresses: state.account.addresses,
  paymentMethods: state.account.paymentMethods,
});

const mapDispatchToProps = dispatch => ({
  logout: params => dispatch(logoutAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(ProfileView));
