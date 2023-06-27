/**
 * hosokawa
 * 2021/11/8
 */

import React from 'react';
import I18n from '../../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../../theme';
import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import {themes} from '../../constants/colors';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import {VectorIcon} from '../../containers/VectorIcon';
import images from '../../assets/images';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import styles from './styles';
import {
  EMAIL_LINK,
  TELEGRAM_LINK,
  TELEGRAM_SITE_LINK,
  WHATSAPP_LINK,
  WHATSAPP_SITE_LINK,
} from '../../constants/app';
import {Link} from '@react-navigation/native';

class HelpCenterView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Help_center'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.menus = [
      {
        id: 'my_phone',
        icon: 'menu_whatsapp',
        title: '+4915906589860',
        type: 'view',
      },
      {
        id: 'my_telegram',
        icon: 'menu_telegram',
        title: 'Gethalal@',
        type: 'view',
      },
      {
        id: 'email_to',
        icon: 'menu_mail',
        title: 'gethalala@support.com',
        type: 'view',
      },
      // { id: 'call_me', icon: 'menu_call', title: '+4935442-284' , type: 'action', sub_title: I18n.t('call_us_directly'), description: I18n.t('daily_')},
    ];

    this.faqs = [
      {
        id: 1,
        title: 'Lorem ipsum dolor sit amet, consectetur ?',
        content:
          'Gocery may give refunds for some item purchases, depending on the refund policies. You can also contact us directly.\n' +
          '\n' +
          'If a purchase was accidentally made by a friend or family member using your account, request a refund on the Gocery website.\n' +
          '\n' +
          "If you find a Gocery purchase on your card or other payment method that you didn't make and that wasn't made by anyone you know, report unauthorized charges within 120 days of the transaction.\n" +
          '\n' +
          'If you’ve had a refund request accepted, check how long your refund will take.',
      },
      {
        id: 2,
        title: 'Lorem ipsum dolor sit amet, consectetur ?',
        content:
          'Gocery may give refunds for some item purchases, depending on the refund policies. You can also contact us directly.\n' +
          '\n' +
          'If a purchase was accidentally made by a friend or family member using your account, request a refund on the Gocery website.\n' +
          '\n' +
          "If you find a Gocery purchase on your card or other payment method that you didn't make and that wasn't made by anyone you know, report unauthorized charges within 120 days of the transaction.\n" +
          '\n' +
          'If you’ve had a refund request accepted, check how long your refund will take.',
      },
      {
        id: 3,
        title: 'Lorem ipsum dolor sit amet, consectetur ?',
        content:
          'Gocery may give refunds for some item purchases, depending on the refund policies. You can also contact us directly.\n' +
          '\n' +
          'If a purchase was accidentally made by a friend or family member using your account, request a refund on the Gocery website.\n' +
          '\n' +
          "If you find a Gocery purchase on your card or other payment method that you didn't make and that wasn't made by anyone you know, report unauthorized charges within 120 days of the transaction.\n" +
          '\n' +
          'If you’ve had a refund request accepted, check how long your refund will take.',
      },
      {
        id: 4,
        title: 'Lorem ipsum dolor sit amet, consectetur ?',
        content:
          'Gocery may give refunds for some item purchases, depending on the refund policies. You can also contact us directly.\n' +
          '\n' +
          'If a purchase was accidentally made by a friend or family member using your account, request a refund on the Gocery website.\n' +
          '\n' +
          "If you find a Gocery purchase on your card or other payment method that you didn't make and that wasn't made by anyone you know, report unauthorized charges within 120 days of the transaction.\n" +
          '\n' +
          'If you’ve had a refund request accepted, check how long your refund will take.',
      },
      {
        id: 5,
        title: 'Lorem ipsum dolor sit amet, consectetur ?',
        content:
          'Gocery may give refunds for some item purchases, depending on the refund policies. You can also contact us directly.\n' +
          '\n' +
          'If a purchase was accidentally made by a friend or family member using your account, request a refund on the Gocery website.\n' +
          '\n' +
          "If you find a Gocery purchase on your card or other payment method that you didn't make and that wasn't made by anyone you know, report unauthorized charges within 120 days of the transaction.\n" +
          '\n' +
          'If you’ve had a refund request accepted, check how long your refund will take.',
      },
      {
        id: 6,
        title: 'Lorem ipsum dolor sit amet, consectetur ?',
        content:
          'Gocery may give refunds for some item purchases, depending on the refund policies. You can also contact us directly.\n' +
          '\n' +
          'If a purchase was accidentally made by a friend or family member using your account, request a refund on the Gocery website.\n' +
          '\n' +
          "If you find a Gocery purchase on your card or other payment method that you didn't make and that wasn't made by anyone you know, report unauthorized charges within 120 days of the transaction.\n" +
          '\n' +
          'If you’ve had a refund request accepted, check how long your refund will take.',
      },
    ];
  }

  onPressItem = async menu_id => {
    switch (menu_id) {
      case 'my_phone':
        try {
          await Linking.openURL(WHATSAPP_LINK);
        } catch (e) {
          console.log('error', e);
          await Linking.openURL(WHATSAPP_SITE_LINK);
        }
        break;
      case 'my_telegram':
        try {
          await Linking.openURL(TELEGRAM_LINK);
        } catch (e) {
          console.log('error', e);
          await Linking.openURL(TELEGRAM_SITE_LINK);
        }
        break;
      case 'email_to':
        try {
          await Linking.openURL(EMAIL_LINK);
        } catch (e) {
          console.log('error', e);
        }
        break;
      case 'call_me':
        break;
    }
  };

  onPressFaqItem = ({title, content}) => {
    console.log('faq', title, content);
    this.props.navigation.navigate('Faq', {title, text: content});
  };

  renderMenus = menus => {
    const render = [];
    menus.forEach((m, index) => {
      render.push(this.renderItem(m));
    });
    return render;
  };

  renderItem = item => {
    const {theme} = this.props;
    if (item.type === 'action') {
      return (
        <TouchableOpacity
          onPress={() => this.onPressItem(item.id)}
          style={styles.itemActionContainer}
        >
          <View style={styles.itemHeader}>
            <Image source={images[item.icon]} style={styles.itemIcon} />
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
          <Text style={styles.itemSubText}>{item.sub_title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => this.onPressItem(item.id)}
        style={styles.itemContainer}
      >
        <View style={styles.itemHeader}>
          <Image source={images[item.icon]} style={styles.itemIcon} />
          <Text style={styles.itemTitle}>{item.title}</Text>
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

  renderFaq = menus => {
    const render = [];
    menus.forEach((m, index) => {
      render.push(this.renderFaqItem(m));
    });
    return render;
  };

  renderFaqItem = item => {
    const {theme} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.onPressFaqItem(item)}
        style={styles.faqItemContainer}
      >
        <Text
          style={styles.faqItemText}
          numberOfLines={2}
          ellipsizeMode={'tail'}
        >
          {item.title}
        </Text>
        <VectorIcon
          type={'Ionicons'}
          name={'md-chevron-forward'}
          size={20}
          color={'grey'}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {navigation, theme} = this.props;

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
              styles.cardContainer,
              {backgroundColor: themes[theme].focusedBackground},
            ]}
          >
            {this.renderMenus(this.menus)}
          </View>
          {/*<View style={[styles.faqCardContainer, { backgroundColor: themes[theme].focusedBackground, marginBottom: 24 }]}>*/}
          {/*    <Text style={styles.sectionTitle}>{I18n.t('FAQ')}</Text>*/}
          {/*    {this.renderFaq(this.faqs)}*/}
          {/*</View>*/}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withTheme(HelpCenterView);
