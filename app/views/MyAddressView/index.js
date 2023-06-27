/**
 * hosokawa
 * 2021/11/5
 */

import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import sharedStyles from '../Styles';
import KeyboardView from '../../containers/KeyboardView';
import StatusBar from '../../containers/StatusBar';
import SafeAreaView from '../../containers/SafeAreaView';
import Button from '../../containers/Button';
import CheckBox from '../../containers/CheckBox';
import I18n from '../../i18n';
import {withTheme} from '../../theme';
import {COLOR_PRIMARY_500, themes} from '../../constants/colors';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import CheckoutHeader from '../../containers/CheckoutHeader';
import {VectorIcon} from '../../containers/VectorIcon';
import {setAddresses as setAddressesAction} from '../../actions/account';
import {setCustomerAddress as setCustomerAddress} from '../../actions/customer';
import {connect} from 'react-redux';
import GethalalSdk from '../../lib/gethalalSdk';
import ActivityIndicator from '../../containers/ActivityIndicator';

class MyAddressView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('My_address'),
  });

  static propTypes = {
    navigation: PropTypes.object,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const is_cart = props.route.params?.is_cart ?? false;
    this.state = {
      is_cart,
      loading: false,
    };
  }

  onSelectAddress = index => {
    const {setAddresses, navigation} = this.props;
    this.setState({loading: true});
    GethalalSdk.postAPICall(GethalalSdk.SET_DEFAULT_ADDRESS, {
      default_id: index,
    })
      .then(response => {
        this.setState({loading: false});
        if (response.success) {
          setAddresses(response.addresses);
        } else {
        }
      })
      .catch(e => {
        this.setState({loading: false});
      });
  };

  onAddAddress = () => {
    this.props.navigation.push('NewAddress');
  };

  onEditAddress = index => {
    const {is_cart} = this.state;
    this.props.navigation.push('NewAddress', {
      address_index: index,
      is_cart: is_cart,
    });
  };

  onNext = () => {
    const {setCustomerAddress} = this.props;
    let address = this.props.addresses.find(a => a.is_default);
    if (!address) {
      address = this.props.addresses[0];
    }
    const billingAddress = {
      first_name: address.display_name,
      last_name: '',
      company: '',
      address_1: `${address.address} ${address.city} ${address.floor}`,
      address_2: '',
      city: '',
      postcode: address.postcode,
      country: 'DE',
      state: '',
      email: address.email,
      phone: address.phone,
    };
    setCustomerAddress(billingAddress);
    this.props.navigation.replace('Payment');
  };

  render() {
    const {addresses, theme} = this.props;
    const {is_cart, loading} = this.state;

    return (
      <KeyboardView
        contentContainerStyle={sharedStyles.container}
        keyboardVerticalOffset={128}
      >
        <StatusBar />
        {loading && <ActivityIndicator theme={theme} absolute size={'large'} />}
        <SafeAreaView>
          {is_cart && <CheckoutHeader theme={theme} />}
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: themes[theme].backgroundColor},
            ]}
            {...scrollPersistTaps}
          >
            {addresses.map((a, index) => (
              <View
                style={[
                  styles.addressContainer,
                  a.is_default && {borderWidth: 1},
                ]}
              >
                <View style={styles.defaultIconContainer}>
                  <CheckBox
                    title={I18n.t('Default')}
                    vertical
                    checked={a.is_default}
                    onPress={() => this.onSelectAddress(index)}
                    onPressIcon={() => this.onSelectAddress(index)}
                    textStyle={{
                      color: themes[theme].bodyText,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                    containerStyle={styles.checkBoxContainer}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.onSelectAddress(index)}
                  style={styles.addressContent}
                >
                  <Text
                    style={styles.addressName}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                  >
                    {a.display_name}
                  </Text>
                  <Text
                    style={[styles.addressText, {marginTop: 8}]}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                  >
                    {a.address} {a.city} {a.floor}
                  </Text>
                  <Text
                    style={[styles.addressText, {marginTop: 4}]}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                  >
                    {a.zone ? `${a.zone},` : ''}
                    {a.postcode}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editAction}
                  onPress={() => {
                    this.onEditAddress(index);
                  }}
                >
                  <Text style={styles.editActionText}>{I18n.t('Edit')}</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.addAction}
              onPress={() => this.onAddAddress()}
            >
              <VectorIcon
                type={'MaterialCommunityIcons'}
                name={'plus'}
                style={styles.addActionIcon}
                size={24}
                color={COLOR_PRIMARY_500}
              />
              <Text style={styles.addActionText}>
                {I18n.t('Add_a_new_address')}
              </Text>
            </TouchableOpacity>
          </ScrollView>
          {is_cart && (
            <View
              style={[
                styles.submitBtnContainer,
                {backgroundColor: themes[theme].focusedBackground},
              ]}
            >
              <Button
                style={styles.submitBtn}
                title={I18n.t('Next')}
                type="primary"
                size="W"
                onPress={this.onNext}
                theme={theme}
              />
            </View>
          )}
        </SafeAreaView>
      </KeyboardView>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  addresses: state.account.addresses,
});

const mapDispatchToProps = dispatch => ({
  setAddresses: params => dispatch(setAddressesAction(params)),
  setCustomerAddress: params => dispatch(setCustomerAddress(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(MyAddressView));
