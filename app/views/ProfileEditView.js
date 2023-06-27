/**
 * hosokawa
 * 2021/11/8
 */

import React from 'react';
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
import {connect} from 'react-redux';
import {isValidEmail} from '../utils/validators';
import GethalalSdk from '../lib/gethalalSdk';
import {setUser as setUserAction} from '../actions/login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingTop: 6,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  actionBtn: {},
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

class ProfileEditView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Account_profile'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name,
      email: props.user.email,
      loading: false,
    };
  }

  isValid = () => {
    const {name, email} = this.state;
    if (!name.length) {
      //showToast(I18n.t('please_enter_email'));
      this.nameInput.focus();
      return false;
    }
    if (!isValidEmail(email)) {
      //showToast(I18n.t('error-invalid-email-address'));
      this.emailInput.focus();
      return false;
    }
    return true;
  };

  onReset = () => {
    if (this.isValid()) {
      const {user, setUser} = this.props;
      const {name, email} = this.state;
      this.setState({loading: true});
      GethalalSdk.updateUser(user.id, {name, email})
        .then(response => {
          this.setState({loading: false});
          setUser({...user, name, email});
        })
        .catch(err => {
          this.setState({loading: false});
        });
    }
  };

  render() {
    const {theme} = this.props;
    const {name, email, loading} = this.state;
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
                  this.emailInput = e;
                }}
                defaultValue={name}
                placeholder={I18n.t('Enter_your_name')}
                returnKeyType="next"
                onChangeText={value => this.setState({name: value})}
                onSubmitEditing={() => {
                  this.nameInput.focus();
                }}
                testID="edit-view-name"
                blurOnSubmit={false}
                theme={theme}
              />
              <TextInput
                inputRef={e => {
                  this.emailInput = e;
                }}
                defaultValue={email}
                placeholder={I18n.t('Enter_your_email_address')}
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={value => this.setState({email: value})}
                onSubmitEditing={() => {
                  this.emailInput.focus();
                }}
                testID="edit-view-email"
                blurOnSubmit={false}
                theme={theme}
              />
            </View>
            <View
              style={[
                styles.bottomContent,
                {backgroundColor: themes[theme].focusedBackground},
              ]}
            >
              <Button
                style={styles.actionBtn}
                title={I18n.t('Save')}
                type="primary"
                size="W"
                onPress={this.onReset}
                loading={loading}
                theme={theme}
              />
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

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(ProfileEditView));
