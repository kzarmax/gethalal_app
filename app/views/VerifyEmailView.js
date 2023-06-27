import React from 'react';
import {View, StyleSheet, ScrollView, Text, TextInput} from 'react-native';
import I18n from '../i18n';
import PropTypes from 'prop-types';
import {withTheme} from '../theme';
import SafeAreaView from '../containers/SafeAreaView';
import StatusBar from '../containers/StatusBar';
import {COLOR_BLACK_900, COLOR_PRIMARY_500, themes} from '../constants/colors';
import KeyboardView from '../containers/KeyboardView';
import sharedStyles from './Styles';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import {VectorIcon} from '../containers/VectorIcon';
import AuthCodeInput from '../containers/AuthCodeInput';
import GethalalSdk from '../lib/gethalalSdk';
import {showToast} from '../lib/info';
import ActivityIndicator from '../containers/ActivityIndicator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  mainContainer: {
    marginTop: 32,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 16,
    marginTop: 16,
    lineHeight: 20,
    alignSelf: 'center',
  },
  actionBtn: {
    marginTop: 20,
  },
  bottomContent: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rightIcon: {
    marginTop: 20,
    alignItems: 'center',
  },
});

class VerifyEmailView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Login'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const user_login = props.route.params?.user_login;
    this.state = {
      isValidCode: false,
      user_login,
      loading: false,
    };
  }

  onResend = () => {
    this.setState({loading: true});
    GethalalSdk.postAPICall(GethalalSdk.FORGOT_PASSWORD, {
      user_login: this.state.user_login,
    })
      .then(res => {
        this.setState({loading: false});
        if (res.success) {
          showToast('Please check email!');
        } else {
          showToast('Api Call Failed');
        }
      })
      .catch(err => {
        console.log('error', err);
        showToast(err);
        this.setState({loading: false});
      });
  };

  onCheckAuth = code => {
    console.log('auth code', code);
    this.setState({loading: true});
    GethalalSdk.postAPICall(GethalalSdk.CHECK_OTPCODE, {
      user_login: this.state.user_login,
      code: code,
    })
      .then(res => {
        this.setState({loading: false});
        if (res.success) {
          this.setState({isValidCode: true});
          setTimeout(
            () =>
              this.props.navigation.replace('ResetPassword', {
                nonce: res.nonce,
                user_login: this.state.user_login,
              }),
            2000,
          );
        } else {
          showToast('Api Call Failed');
        }
      })
      .catch(err => {
        console.log('error', err);
        showToast(err);
        this.setState({loading: false});
      });
  };

  render() {
    const {theme} = this.props;
    const {isValidCode, user_login, loading} = this.state;

    return (
      <KeyboardView
        contentContainerStyle={sharedStyles.container}
        keyboardVerticalOffset={128}
      >
        <StatusBar />
        {loading && <ActivityIndicator absolute size={'large'} theme={theme} />}
        <SafeAreaView>
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: themes[theme].backgroundColor},
            ]}
            {...scrollPersistTaps}
          >
            <Text style={{...styles.title, color: COLOR_BLACK_900}}>
              {I18n.t('Confirm_your_number')}
            </Text>
            <Text
              style={{...styles.subTitle, color: themes[theme].auxiliaryText}}
            >
              {I18n.t('Confirm_number_caption')}
            </Text>
            <Text
              style={{
                ...styles.subTitle,
                color: themes[theme].auxiliaryText,
                marginTop: 8,
              }}
            >
              {user_login}
            </Text>
            <View style={styles.mainContainer}>
              <AuthCodeInput onSubmit={this.onCheckAuth} />
              <View style={styles.bottomContent}>
                <Text
                  style={{
                    color: COLOR_BLACK_900,
                    fontSize: 16,
                    lineHeight: 20,
                  }}
                >
                  {I18n.t('Do_not_get_an_email')}
                </Text>
                <Text
                  style={{
                    color: COLOR_PRIMARY_500,
                    fontSize: 16,
                    lineHeight: 20,
                  }}
                  onPress={this.onResend}
                >
                  {' '}
                  {I18n.t('Send_again')}
                </Text>
              </View>
            </View>
            {isValidCode && (
              <View style={styles.rightIcon}>
                <VectorIcon
                  type={'MaterialCommunityIcons'}
                  name={'check-circle-outline'}
                  size={52}
                  color={COLOR_PRIMARY_500}
                />
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </KeyboardView>
    );
  }
}

export default withTheme(VerifyEmailView);
