/**
 * hosokawa
 * 2021/11/4
 */

import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
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
import CheckoutHeader from '../../containers/CheckoutHeader';

class CheckoutNewAddressView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Checkout'),
  });

  static propTypes = {
    navigation: PropTypes.object,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDefault: false,
      isSaving: false,
    };
  }

  onSave = () => {
    this.props.navigation.navigate('CheckoutAddress');
  };

  render() {
    const {theme} = this.props;
    const {isDefault, isSaving} = this.state;

    return (
      <KeyboardView
        contentContainerStyle={sharedStyles.container}
        keyboardVerticalOffset={128}
      >
        <StatusBar />
        <SafeAreaView>
          <CheckoutHeader theme={theme} />
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
                placeholder={I18n.t('Address')}
                returnKeyType="next"
                keyboardType="default"
                textContentType="oneTimeCode"
                inputStyle={styles.inputStyle}
                onChangeText={value => this.setState({address: value})}
                onSubmitEditing={() => {
                  this.areaInput.focus();
                }}
                theme={theme}
              />
              <TextInput
                inputRef={e => {
                  this.areaInput = e;
                }}
                placeholder={I18n.t('Area')}
                returnKeyType="next"
                keyboardType="default"
                textContentType="oneTimeCode"
                onChangeText={value => this.setState({area: value})}
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
        </SafeAreaView>
      </KeyboardView>
    );
  }
}

export default withTheme(CheckoutNewAddressView);
