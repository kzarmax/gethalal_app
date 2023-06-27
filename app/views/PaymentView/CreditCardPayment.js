import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import I18n from '../../i18n';
import {VectorIcon} from '../../containers/VectorIcon';
import {COLOR_BLACK_900, COLOR_PRIMARY_500} from '../../constants/colors';
import PropTypes from 'prop-types';
import images from '../../assets/images';
import CardInput from '../../containers/CardInput';
import GethalalSdk from '../../lib/gethalalSdk';
import {showToast} from '../../lib/info';
import {setPaymentMethods as setPaymentMethodsAction} from '../../actions/account';
import {connect} from 'react-redux';
import cardLogo from '../../assets/cardLogo';

const styles = StyleSheet.create({
  paymentContainer: {},
  initContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  initText: {
    color: COLOR_BLACK_900,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    marginLeft: 12,
    flexGrow: 1,
  },
  initLogos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginHorizontal: 2,
    width: 40,
    height: 20,
    resizeMode: 'contain',
  },
  addAction: {
    marginTop: 16,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addActionIcon: {
    marginLeft: 12,
  },
  addActionText: {
    marginLeft: 8,
    color: COLOR_PRIMARY_500,
    fontSize: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 16,
  },
  cardLogoIcon: {
    marginLeft: 12,
    width: 40,
    height: 20,
    resizeMode: 'contain',
  },
  cardNumberText: {
    marginLeft: 12,
    color: COLOR_BLACK_900,
    fontSize: 16,
    flexGrow: 1,
  },
});

class CreditCardPayment extends React.Component {
  static propTypes = {
    onAddCard: PropTypes.func,
    onSaveCard: PropTypes.func,
    onSelect: PropTypes.func,
    checked: PropTypes.bool,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDefaultCard: false,
    };
  }

  onPressItem = item => {
    const {setPaymentMethods, onSelect} = this.props;
    if (!item.is_default && item.actions.default) {
      this.setState({isLoading: true});
      GethalalSdk.postAPICall(GethalalSdk.SET_DEFAULT_PAYMENT_METHOD, {
        token_id: item.id,
      })
        .then(response => {
          this.setState({isLoading: false});

          console.log('response', response);
          if (response.success) {
            setPaymentMethods(response.paymentMethods);
            onSelect();
          }
        })
        .catch(err => {
          showToast(I18n.t('error_card_register_failed'));
          this.setState({isLoading: false});
        });
    } else {
      onSelect();
    }
  };

  render() {
    const {checked, onSaveCard, onAddCard, paymentMethods, theme} = this.props;
    const {isDefaultCard} = this.state;
    const savedPaymentMethods = paymentMethods.cc ?? [];

    return (
      <View style={styles.paymentContainer}>
        {/*<TouchableOpacity onPress={() => this.setState({checked: !checked})} style={styles.initContainer} >*/}
        {/*  <VectorIcon type={"MaterialIcons"} name={checked?"radio-button-checked":"radio-button-unchecked"} size={24} color={COLOR_PRIMARY_500}/>*/}
        {/*  <Text style={styles.initText}>{I18n.t('Credit_card')}</Text>*/}
        {/*  <View style={styles.initLogos}>*/}
        {/*      <Image source={images.visa_card_logo} style={styles.logoIcon}/>*/}
        {/*      <Image source={images.master_card_logo} style={styles.logoIcon}/>*/}
        {/*      <Image source={images.american_express_logo} style={styles.logoIcon}/>*/}
        {/*  </View>*/}
        {/*</TouchableOpacity>*/}
        {/*<CardInput onSave={onSaveCard} theme={theme}/>*/}
        {savedPaymentMethods.map(item => (
          <TouchableOpacity
            onPress={() => this.onPressItem(item)}
            style={styles.cardContainer}
          >
            <VectorIcon
              type={'MaterialIcons'}
              name={
                checked && item.is_default
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={24}
              color={COLOR_PRIMARY_500}
            />
            <Image
              source={cardLogo(item.method.brand)}
              style={styles.cardLogoIcon}
            />
            <Text style={styles.cardNumberText}>
              {item.method.brand}...{item.method.last4}
            </Text>
          </TouchableOpacity>
        ))}
        {/*<TouchableOpacity onPress={onAddCard} style={styles.addAction}>*/}
        {/*    <VectorIcon type={"MaterialCommunityIcons"} name={"plus"} style={styles.addActionIcon} size={24} color={COLOR_PRIMARY_500}/>*/}
        {/*    <Text style={styles.addActionText}>{I18n.t('Add_a_new_card')}</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
  paymentMethods: state.account.paymentMethods,
});

const mapDispatchToProps = dispatch => ({
  setPaymentMethods: params => dispatch(setPaymentMethodsAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardPayment);
