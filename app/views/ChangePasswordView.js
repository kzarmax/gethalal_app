/**
 * hosokawa
 * 2021/11/8
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import I18n from '../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../theme';
import SafeAreaView from '../containers/SafeAreaView';
import StatusBar from '../containers/StatusBar';
import {themes} from '../constants/colors';
import KeyboardView from '../containers/KeyboardView';
import sharedStyles from './Styles';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import TextInput from '../containers/TextInput';
import Button from '../containers/Button';
import {showToast} from '../lib/info';
import GethalalSdk from '../lib/gethalalSdk';
import AsyncStorage from '@react-native-community/async-storage';
import {JWT_ACCESS_TOKEN} from '../constants/keys';
import {removeTags} from '../utils/string';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    lineHeight: 28,
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 28,
    alignSelf: 'center',
  },
  actionBtn: {
    marginTop: 8,
  },
  bottomContent: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

class ChangePasswordView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Change_password'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      new_password: '',
      password_confirm: '',
    };
  }

  isValid = () => {
    const {password, new_password, password_confirm} = this.state;

    if (!password.length) {
      showToast(I18n.t('please_enter_password'));
      this.passwordInput.focus();
      return false;
    }

    if (password.length < 6) {
      showToast(I18n.t('error_too_weak_password'));
      this.passwordInput.focus();
      return false;
    }

    if (!new_password.length) {
      showToast(I18n.t('please_enter_new_password'));
      this.newPasswordInput.focus();
      return false;
    }

    if (new_password !== password_confirm) {
      showToast(I18n.t('Not_matched_password'));
      this.passwordConfirmInput.focus();
      return false;
    }

    return true;
  };

  onReset = () => {
    if (this.isValid()) {
      const {user} = this.props;
      const {password, new_password} = this.state;
      this.setState({loading: true});
      GethalalSdk.signInWithEmail(user.email, password)
        .then(async response => {
          await AsyncStorage.setItem(JWT_ACCESS_TOKEN, response.token);
          GethalalSdk.postAPICall(GethalalSdk.RESET_PASSWORD, {
            user_login: user.email,
            pass: new_password,
          }).then(response => {
            if (response.success) {
              showToast(I18n.t('Reset_password_success'));
              this.props.navigation.pop();
            } else {
              showToast(response.error);
            }
            this.setState({loading: false});
          });
        })
        .catch(err => {
          showToast(removeTags(err.message));
          this.setState({loading: false});
        });
    }
  };

  onGoToSignUp = () => {
    this.props.navigation.navigate('Signup');
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
          <View
            style={[
              styles.container,
              {backgroundColor: themes[theme].backgroundColor},
            ]}
            {...scrollPersistTaps}
          >
            <View style={styles.mainContainer}>
              <TextInput
                inputRef={e => {
                  this.passwordInput = e;
                }}
                placeholder={I18n.t('Current_password')}
                returnKeyType="send"
                secureTextEntry
                textContentType={'oneTimeCode'}
                onChangeText={value => this.setState({password: value})}
                onSubmitEditing={() => {
                  this.newPasswordInput.focus();
                }}
                testID="reset-view-password"
                theme={theme}
              />
              <TextInput
                inputRef={e => {
                  this.newPasswordInput = e;
                }}
                placeholder={I18n.t('New_password')}
                returnKeyType="send"
                secureTextEntry
                textContentType={'oneTimeCode'}
                onChangeText={value => this.setState({new_password: value})}
                onSubmitEditing={() => {
                  this.passwordConfirmInput.focus();
                }}
                testID="reset-view-new-password"
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
                onSubmitEditing={this.submit}
                testID="reset-view-password-confirm"
                theme={theme}
              />
              <View style={styles.bottomContent}>
                <Button
                  style={styles.actionBtn}
                  title={I18n.t('Reset_password')}
                  type="primary"
                  size="W"
                  loading={loading}
                  onPress={this.onReset}
                  theme={theme}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
});

export default connect(mapStateToProps, null)(withTheme(ChangePasswordView));
