import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import I18n from '../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../theme';
import SafeAreaView from '../containers/SafeAreaView';
import StatusBar from '../containers/StatusBar';
import {COLOR_BLACK_900, themes} from '../constants/colors';
import KeyboardView from '../containers/KeyboardView';
import sharedStyles from './Styles';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import Button from '../containers/Button';
import TextInput from '../containers/TextInput';
import {showToast} from '../lib/info';
import GethalalSdk from '../lib/gethalalSdk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  mainContainer: {},
  title: {
    fontSize: 20,
    marginBottom: 32,
    lineHeight: 26,
    fontWeight: '600',
    alignSelf: 'center',
  },
  actionBtn: {
    marginTop: 32,
  },
});

class ResetPasswordView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Login'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const user_login = props.route.params?.user_login;
    const nonce = props.route.params?.nonce;
    this.state = {
      loading: false,
      user_login,
      nonce,
      password: '',
      password_confirm: '',
    };
  }

  isValid = () => {
    const {password, password_confirm} = this.state;
    if (password.length < 6) {
      showToast(I18n.t('error_too_weak_password'));
      this.passwordInput.focus();
      return false;
    }
    if (password !== password_confirm) {
      showToast(I18n.t('Not_matched_password'));
      this.passwordInput.focus();
      return false;
    }
    return true;
  };

  onUpdate = () => {
    if (this.isValid()) {
      this.setState({loading: true});
      GethalalSdk.postAPICall(GethalalSdk.RESET_PASSWORD, {
        user_login: this.state.user_login,
        pass: this.state.password,
      })
        .then(res => {
          this.setState({loading: false});
          if (res.success) {
            showToast('Password was changed!');
            this.props.navigation.pop();
          } else {
            showToast('Api Call Failed');
          }
        })
        .catch(err => {
          console.log('error', err);
          showToast(err);
          this.setState({loading: false});
        });
    }
  };

  render() {
    const {theme} = this.props;
    const {loading} = this.state;

    return (
      <KeyboardView
        contentContainerStyle={sharedStyles.container}
        keyboardVerticalOffset={128}
      >
        <StatusBar />
        <SafeAreaView>
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: themes[theme].backgroundColor},
            ]}
            {...scrollPersistTaps}
          >
            <Text style={{...styles.title, color: COLOR_BLACK_900}}>
              {I18n.t('Reset_your_password')}
            </Text>
            <View style={styles.mainContainer}>
              <TextInput
                inputRef={e => {
                  this.passwordInput = e;
                }}
                placeholder={I18n.t('New_password')}
                returnKeyType="send"
                secureTextEntry
                textContentType={'oneTimeCode'}
                onChangeText={value => this.setState({password: value})}
                onSubmitEditing={() => {
                  this.passwordConfirmInput.focus();
                }}
                testID="reset-view-password"
                theme={theme}
              />
              <TextInput
                inputRef={e => {
                  this.passwordConfirmInput = e;
                }}
                placeholder={I18n.t('Confirm_password')}
                returnKeyType="send"
                secureTextEntry
                textContentType="oneTimeCode"
                onChangeText={value => this.setState({password_confirm: value})}
                onSubmitEditing={this.onUpdate}
                testID="reset-view-password-confirm"
                theme={theme}
              />
              <Button
                style={styles.actionBtn}
                title={I18n.t('Update_password')}
                type="primary"
                size="W"
                loading={loading}
                onPress={this.onUpdate}
                theme={theme}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardView>
    );
  }
}

export default withTheme(ResetPasswordView);
