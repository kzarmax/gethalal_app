import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {withTheme} from '../../theme';
import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import {
  COLOR_BLACK_900,
  COLOR_PRIMARY_500,
  themes,
} from '../../constants/colors';
import Button from '../../containers/Button';
import TextInput from '../../containers/TextInput';
import I18n from '../../i18n';
import styles from './styles';
import sharedStyles from '../Styles';
import KeyboardView from '../../containers/KeyboardView';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import {isValidEmail} from '../../utils/validators';
import gethalalSdk from '../../lib/gethalalSdk';
import AsyncStorage from '@react-native-community/async-storage';
import {JWT_ACCESS_TOKEN} from '../../constants/keys';
import {loginSuccess as loginSuccessAction} from '../../actions/login';
import {showToast} from '../../lib/info';
import {removeTags} from '../../utils/string';
import GethalalSdk from '../../lib/gethalalSdk';
import {setCustomer as setCustomerAction} from '../../actions/customer';

class LoginView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Login'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      user: '',
      password: '',
      isLoading: false,
    };
  }

  forgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  onGoToSignUp = () => {
    this.props.navigation.navigate('Signup');
  };

  isValid = () => {
    const {user, password} = this.state;
    if (!user.length) {
      showToast(I18n.t('please_enter_email'));
      this.emailInput.focus();
      return false;
    }
    if (!isValidEmail(user)) {
      showToast(I18n.t('error-invalid-email-address'));
      this.emailInput.focus();
      return false;
    }
    if (!password.length) {
      showToast(I18n.t('please_enter_password'));
      this.passwordInput.focus();
      return false;
    }
    return true;
  };

  onLogin = () => {
    const {user, password} = this.state;
    if (this.isValid()) {
      const {loginSuccess, setCustomer, navigation} = this.props;
      this.setState({isLoading: true});
      gethalalSdk
        .signInWithEmail(user, password)
        .then(async response => {
          await AsyncStorage.setItem(JWT_ACCESS_TOKEN, response.token);
          gethalalSdk.getUser().then(async user => {
            const customer = await GethalalSdk.fetchSingleData(
              GethalalSdk.GET_CUSTOMERS_ENDPOINT,
              user.id,
            );
            this.setState({isLoading: false});
            setCustomer(customer);
            loginSuccess(user);
            navigation.popToTop();
          });
        })
        .catch(err => {
          this.setState({isLoading: false});
          showToast(removeTags(err.message));
        });
    }
  };

  render() {
    const {navigation, theme} = this.props;
    const {error, isLoading} = this.state;
    const services = {
      facebook: {name: 'facebook'},
      google: {name: 'google'},
      apple: {name: 'apple'},
    };
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
            <Text style={{...sharedStyles.loginTitle, color: COLOR_BLACK_900}}>
              {I18n.t('Welcome_to_gethalal')}
            </Text>
            {/*<OAuthLogin navigation={navigation} services={services} isSignup={false} />*/}
            {/*<OrSeparator theme={theme}/>*/}
            <View style={styles.mainContainer}>
              {error && (
                <Text style={styles.error}>
                  {I18n.t('error_incorrect_email_password')}
                </Text>
              )}
              <TextInput
                inputRef={e => {
                  this.emailInput = e;
                }}
                placeholder={I18n.t('Mail')}
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={value => this.setState({user: value})}
                onSubmitEditing={() => {
                  this.passwordInput.focus();
                }}
                testID="login-view-email"
                blurOnSubmit={false}
                theme={theme}
              />
              <TextInput
                inputRef={e => {
                  this.passwordInput = e;
                }}
                placeholder={I18n.t('Password')}
                returnKeyType="send"
                secureTextEntry
                textContentType={'oneTimeCode'}
                onSubmitEditing={this.submit}
                onChangeText={value => this.setState({password: value})}
                testID="login-view-password"
                theme={theme}
              />
              <View style={styles.forgotContainer}>
                <Text style={styles.forgotText} onPress={this.forgotPassword}>
                  {I18n.t('Forgot_password')}
                </Text>
              </View>
              <Button
                style={styles.actionBtn}
                title={I18n.t('Login')}
                type="primary"
                size="W"
                onPress={this.onLogin}
                loading={isLoading}
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
                    {...sharedStyles.link},
                    {
                      textDecorationLine: 'none',
                      color: COLOR_PRIMARY_500,
                      fontSize: 16,
                      lineHeight: 20,
                    },
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

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
  setCustomer: params => dispatch(setCustomerAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(LoginView));
