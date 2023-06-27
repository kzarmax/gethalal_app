/**
 * hosokawa
 * 2021/12/11
 */

import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import sharedStyles from '../Styles';
import KeyboardView from '../../containers/KeyboardView';
import StatusBar from '../../containers/StatusBar';
import SafeAreaView from '../../containers/SafeAreaView';
import TextInput from '../../containers/TextInput';
import Button from '../../containers/Button';
import CheckBox from '../../containers/CheckBox';
import I18n from '../../i18n';
import {withTheme} from '../../theme';
import {themes} from '../../constants/colors';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import * as HeaderButton from '../../containers/HeaderButton';
import RemoveAddressModal from '../../containers/RemoveAddressModal';
import {isValidEmail, isValidPhoneNumber} from '../../utils/validators';
import GethalalSdk from '../../lib/gethalalSdk';
import {setAddresses as setAddressesAction} from '../../actions/account';
import {showToast} from '../../lib/info';
import ActivityIndicator from '../../containers/ActivityIndicator';
import {CsSelect} from '../../containers/CsSelect';

class NewAddressView extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const addressIndex = props.route.params?.address_index;
    const address =
      addressIndex !== undefined ? props.addresses[addressIndex] : undefined;
    const is_cart = props.route.params?.is_cart ?? false;

    this.state = {
      is_cart,
      address_index: addressIndex,
      isDefault: address?.is_default ?? false,
      isSaving: false,
      isRemoving: false,
      name: address?.display_name ?? '',
      phone_number: address?.phone ?? '',
      email: address?.email ?? '',
      address: address?.address ?? '',
      country: this.props.customer.billing?.country ?? 'DE',
      postcode: address?.postcode ?? '',
      city: address?.city ?? '',
      floor: address?.floor ?? '',
      showRemoveConfirm: false,
      is_edit: addressIndex !== undefined,
    };
    this.countries = this.props.countries.map(c => ({
      text: c.name,
      value: c.code,
    }));
  }

  componentDidMount() {
    const {navigation} = this.props;
    if (this.state.is_edit) {
      navigation.setOptions({
        title: I18n.t('My_address'),
        headerRight: () => (
          <HeaderButton.Delete
            navigation={navigation}
            onPress={this.onDelete}
          />
        ),
      });
    } else {
      navigation.setOptions({
        title: I18n.t('My_address'),
      });
    }
  }

  isValid = () => {
    const {name, phone_number, email, address, postcode, country} = this.state;
    if (!name.length) {
      showToast(I18n.t('please_enter_name'));
      this.nameInput.focus();
      return false;
    }
    if (!isValidEmail(email)) {
      showToast(I18n.t('error-invalid-email-address'));
      this.emailInput.focus();
      return false;
    }
    if (!phone_number.length) {
      showToast(I18n.t('please_enter_password'));
      this.phoneInput.focus();
      return false;
    }
    if (!isValidPhoneNumber(phone_number)) {
      showToast(I18n.t('error-invalid-phone-number'));
      this.phoneInput.focus();
      return false;
    }
    if (!address.length) {
      showToast(I18n.t('please_enter_address'));
      this.addressInput.focus();
      return false;
    }
    if (!country.length) {
      showToast(I18n.t('please_select_country'));
      this.addressInput.focus();
      return false;
    }
    if (!postcode.length) {
      showToast(I18n.t('please_enter_post_code'));
      this.postcodeInput.focus();
      return false;
    }
    return true;
  };

  onSave = () => {
    if (this.isValid()) {
      const {
        address_index,
        name,
        phone_number,
        email,
        address,
        country,
        postcode,
        city,
        floor,
        isDefault,
        is_edit,
        is_cart,
      } = this.state;
      const {setAddresses, navigation, isAuthenticated} = this.props;
      const params = {
        account_display_name: name,
        account_phone: phone_number,
        account_email: email,
        account_address_text: address,
        account_address_postcode: postcode,
        account_address_city: city,
        account_address_country: country,
        account_address_floor: floor,
        is_default: isDefault ? 1 : 0,
      };

      if (is_edit) {
        params.account_address_index = address_index;
      }

      if (!isAuthenticated) {
        const address = {
          display_name: params.account_display_name,
          phone: params.account_phone,
          email: params.account_email,
          address: params.account_address_text,
          country: params.account_address_country,
          postcode: params.account_address_postcode,
          city: params.account_address_city,
          floor: params.account_address_floor,
          is_default: true,
        };
        setAddresses([address]);
        navigation.replace('MyAddress', {is_cart});
      } else {
        this.setState({isSaving: true});
        GethalalSdk.postAPICall(GethalalSdk.SET_ADDRESS_ENDPOINT, params)
          .then(response => {
            this.setState({isSaving: false});
            if (response.success) {
              setAddresses(response.addresses);
              navigation.replace('MyAddress', {is_cart});
            } else {
              showToast(response.error);
            }
          })
          .catch(err => {
            this.setState({isSaving: false});
          });
      }
    }
  };

  onDelete = () => {
    this.setState({showRemoveConfirm: true});
  };

  onRemoveAddress = () => {
    const {setAddresses} = this.props;
    this.setState({showRemoveConfirm: false, isRemoving: true});
    GethalalSdk.postAPICall(GethalalSdk.REMOVE_ADDRESS, {
      id: this.state.address_index,
    })
      .then(response => {
        showToast(I18n.t('remove_address_success'));
        console.log('response', response);
        this.setState({isRemoving: false});
        if (response.success) {
          setAddresses(response.addresses);
          this.props.navigation.pop();
        }
      })
      .catch(err => {
        showToast(I18n.t('error_remove_address'));
        this.setState({isRemoving: false});
      });
  };

  render() {
    const {theme} = this.props;
    const {
      isDefault,
      isSaving,
      showRemoveConfirm,
      name,
      phone_number,
      email,
      address,
      country,
      postcode,
      city,
      floor,
      isRemoving,
    } = this.state;

    return (
      <KeyboardView
        contentContainerStyle={sharedStyles.container}
        keyboardVerticalOffset={128}
      >
        <StatusBar />
        <SafeAreaView>
          {isRemoving && (
            <ActivityIndicator absolute theme={theme} size={'large'} />
          )}
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: themes[theme].backgroundColor},
            ]}
            {...scrollPersistTaps}
          >
            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>
                {I18n.t('Personal_information')}
              </Text>
              <TextInput
                inputRef={e => {
                  this.nameInput = e;
                }}
                defaultValue={name}
                placeholder={I18n.t('Name')}
                returnKeyType="next"
                keyboardType="default"
                textContentType="oneTimeCode"
                inputStyle={styles.inputStyle}
                onChangeText={value => this.setState({name: value})}
                onSubmitEditing={() => {
                  this.phoneInput.focus();
                }}
                theme={theme}
              />
              <TextInput
                inputRef={e => {
                  this.phoneInput = e;
                }}
                defaultValue={phone_number}
                placeholder={I18n.t('Phone_number')}
                returnKeyType="next"
                keyboardType="default"
                textContentType="oneTimeCode"
                inputStyle={styles.inputStyle}
                onChangeText={value => this.setState({phone_number: value})}
                onSubmitEditing={() => {
                  this.emailInput.focus();
                }}
                theme={theme}
              />
              <TextInput
                inputRef={e => {
                  this.emailInput = e;
                }}
                defaultValue={email}
                placeholder={I18n.t('Email')}
                returnKeyType="next"
                keyboardType="default"
                textContentType="oneTimeCode"
                inputStyle={styles.inputStyle}
                onChangeText={value => this.setState({email: value})}
                onSubmitEditing={() => {
                  this.addressInput.focus();
                }}
                theme={theme}
              />
            </View>
            <View style={[styles.cardContainer, {marginTop: 16}]}>
              <Text style={styles.cardTitle}>{I18n.t('Delivery_address')}</Text>
              <TextInput
                inputRef={e => {
                  this.addressInput = e;
                }}
                defaultValue={address}
                placeholder={I18n.t('Address')}
                returnKeyType="next"
                keyboardType="default"
                textContentType="oneTimeCode"
                inputStyle={styles.inputStyle}
                onChangeText={value => this.setState({address: value})}
                onSubmitEditing={() => {
                  this.postcodeInput.focus();
                }}
                theme={theme}
              />
              <CsSelect
                options={this.countries}
                theme={theme}
                value={country}
                onChange={value => this.setState({country: value})}
              />
              <TextInput
                inputRef={e => {
                  this.postcodeInput = e;
                }}
                defaultValue={postcode}
                placeholder={I18n.t('Postcode')}
                returnKeyType="next"
                keyboardType="numeric"
                textContentType="oneTimeCode"
                onChangeText={value => this.setState({postcode: value})}
                onSubmitEditing={() => {
                  this.cityInput.focus();
                }}
                theme={theme}
              />
              <View style={styles.formRow}>
                <TextInput
                  inputRef={e => {
                    this.cityInput = e;
                  }}
                  defaultValue={city}
                  placeholder={I18n.t('City')}
                  returnKeyType="next"
                  keyboardType="default"
                  textContentType="oneTimeCode"
                  onChangeText={value => this.setState({city: value})}
                  onSubmitEditing={() => {
                    this.floorInput.focus();
                  }}
                  containerStyle={{width: '48%'}}
                  theme={theme}
                />
                <TextInput
                  inputRef={e => {
                    this.floorInput = e;
                  }}
                  defaultValue={floor}
                  placeholder={I18n.t('Floor')}
                  returnKeyType="next"
                  keyboardType="default"
                  textContentType="oneTimeCode"
                  containerStyle={{width: '48%'}}
                  onChangeText={value => this.setState({floor: value})}
                  theme={theme}
                />
              </View>
            </View>
            <CheckBox
              title={I18n.t('Set_is_as_default')}
              checked={isDefault}
              onPress={() => this.setState({isDefault: !isDefault})}
              onPressIcon={() => this.setState({isDefault: !isDefault})}
              textStyle={{color: themes[theme].bodyText, fontWeight: 'bold'}}
              containerStyle={styles.checkBoxContainer}
            />
          </ScrollView>
          <View
            style={[
              styles.actionContainer,
              {backgroundColor: themes[theme].focusedBackground},
            ]}
          >
            <Button
              style={styles.submitBtn}
              title={I18n.t('Save')}
              type="primary"
              size="W"
              onPress={this.onSave}
              loading={isSaving}
              theme={theme}
            />
          </View>
          <RemoveAddressModal
            showRemoveConfirm={showRemoveConfirm}
            onRemove={this.onRemoveAddress}
            onCancel={() => {
              this.setState({showRemoveConfirm: false});
            }}
            theme={theme}
          />
        </SafeAreaView>
      </KeyboardView>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  addresses: state.account.addresses,
  countries: state.customer.countries,
  customer: state.customer.customer,
});

const mapDispatchToProps = dispatch => ({
  setAddresses: params => dispatch(setAddressesAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(NewAddressView));
