import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {withTheme} from '../../theme';
import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import {
  COLOR_BLACK_900,
  COLOR_PRIMARY_500,
  themes,
} from '../../constants/colors';
import Button from '../../containers/Button';
import I18n from '../../i18n';
import styles from './styles';
import KeyboardView from '../../containers/KeyboardView';
import sharedStyles from '../Styles';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import OAuthLogin from '../../containers/OAuthLogin';
import OrSeparator from '../../containers/OrSeparator';
import TextInput from '../../containers/TextInput';
import GethalalSdk from '../../lib/gethalalSdk';
import {showToast} from '../../lib/info';
import {isValidEmail} from '../../utils/validators';
import CheckBox from '../../containers/CheckBox';
import {VectorIcon} from '../../containers/VectorIcon';

class SignupView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Signup'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      isLoading: false,
    };
  }

  onGoToLogin = () => {
    this.props.navigation.navigate('Login');
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

  onGotoTerms = () => {
    const {navigation} = this.props;
    navigation.navigate('About', {type: 0});
  };

  onGotoPrivacy = () => {
    const {navigation} = this.props;
    navigation.navigate('About', {type: 1});
  };

  onSubmit = () => {
    const {user, password} = this.state;
    if (this.isValid()) {
      this.setState({isLoading: true});
      GethalalSdk.signUp({email: user.trim(), password})
        .then(res => {
          this.setState({isLoading: false});
          showToast(I18n.t('signup_success'));
          this.props.navigation.pop();
        })
        .catch(error => {
          this.setState({isLoading: false});
          showToast(error);
        });
    }
  };

  render() {
    const {theme} = this.props;
    const {isLoading} = this.state;

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
            <Text
              style={{
                ...sharedStyles.loginTitle,
                ...sharedStyles.textBold,
                color: COLOR_BLACK_900,
              }}
            >
              {I18n.t('Welcome_to_gethalal')}
            </Text>
            {/*<OAuthLogin navigation={navigation} services={services} isSignup={false} />*/}
            {/*<OrSeparator theme={theme}/>*/}
            <View style={styles.mainContainer}>
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
              <View style={[styles.captionContainer, {direction: 'rtl'}]}>
                <Text style={{color: themes[theme].buttonText}}>
                  {I18n.t('By_creating')}
                </Text>
                <Text
                  style={{
                    ...sharedStyles.link,
                    color: themes[theme].buttonText,
                  }}
                  onPress={this.onGotoTerms}
                >
                  {I18n.t('Terms_of_service')}
                </Text>
                <Text style={{color: themes[theme].buttonText}}>
                  {I18n.t('And')}
                </Text>
                <Text
                  style={{
                    ...sharedStyles.link,
                    color: themes[theme].buttonText,
                  }}
                  onPress={this.onGotoPrivacy}
                >
                  {I18n.t('Privacy_policy')}
                </Text>
              </View>
              <Button
                style={styles.actionBtn}
                title={I18n.t('Signup')}
                type="primary"
                size="W"
                onPress={this.onSubmit}
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
                  {I18n.t('Already_have_an_account')}
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
                  onPress={this.onGoToLogin}
                >
                  {' '}
                  {I18n.t('Login')}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardView>
    );
  }
}

export default withTheme(SignupView);
