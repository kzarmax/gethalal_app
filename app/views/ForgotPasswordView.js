import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import I18n from '../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../theme';
import SafeAreaView from '../containers/SafeAreaView';
import StatusBar from '../containers/StatusBar';
import {COLOR_BLACK_900, COLOR_PRIMARY_500, themes} from '../constants/colors';
import KeyboardView from '../containers/KeyboardView';
import sharedStyles from './Styles';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import TextInput from '../containers/TextInput';
import Button from '../containers/Button';
import GethalalSdk from '../lib/gethalalSdk';
import {removeTags} from '../utils/string';
import {isValidEmail} from '../utils/validators';
import {showToast} from '../lib/info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  mainContainer: {},
  title: {
    fontSize: 20,
    marginBottom: 16,
    lineHeight: 26,
    fontWeight: '600',
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 32,
    lineHeight: 28,
    alignSelf: 'center',
  },
  actionBtn: {
    marginTop: 40,
  },
  bottomContent: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

class ForgotPasswordView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Login'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loading: false,
    };
  }

  isValid = () => {
    const {user} = this.state;
    if (!isValidEmail(user)) {
      showToast(I18n.t('error-invalid-email-address'));
      this.emailInput.focus();
      return false;
    }
    return true;
  };

  onReset = () => {
    if (this.isValid()) {
      const {user} = this.state;
      this.setState({loading: true});
      GethalalSdk.postAPICall(GethalalSdk.FORGOT_PASSWORD, {user_login: user})
        .then(res => {
          this.setState({loading: false});
          if (res.success) {
            this.props.navigation.replace('VerifyEmail', {user_login: user});
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
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: themes[theme].backgroundColor},
            ]}
            {...scrollPersistTaps}
          >
            <Text style={{...styles.title, color: COLOR_BLACK_900}}>
              {I18n.t('Forgot_your_password')}
            </Text>
            <Text
              style={{...styles.subTitle, color: themes[theme].auxiliaryText}}
            >
              {I18n.t('Forgot_password_sub_title')}
            </Text>
            <View style={styles.mainContainer}>
              <TextInput
                inputRef={e => {
                  this.emailInput = e;
                }}
                placeholder={I18n.t('Enter_your_email_address')}
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={value => this.setState({user: value})}
                onSubmitEditing={this.onReset}
                testID="login-view-email"
                blurOnSubmit={false}
                theme={theme}
              />
              <Button
                style={styles.actionBtn}
                title={I18n.t('Reset_password')}
                type="primary"
                size="W"
                onPress={this.onReset}
                loading={loading}
                theme={theme}
              />
              <View style={styles.bottomContent}>
                <Text
                  style={{
                    color: COLOR_BLACK_900,
                    fontSize: 16,
                    lineHeight: 20,
                  }}
                >
                  {I18n.t('Do_not_have_an_account')}
                </Text>
                <Text
                  style={[
                    {color: COLOR_PRIMARY_500, fontSize: 16, lineHeight: 20},
                  ]}
                  onPress={this.onGoToSignUp}
                >
                  {' '}
                  {I18n.t('SignUp')}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardView>
    );
  }
}

export default withTheme(ForgotPasswordView);
