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
      defaultId: 1,
      addresses: [],
    };
  }

  onSelectAddress = address_id => {
    this.setState({defaultId: address_id});
  };

  onNext = () => {
    this.props.navigation.navigate('Payment');
  };

  render() {
    const {theme} = this.props;
    const {defaultId, addresses} = this.state;

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
            {addresses.map(a => (
              <View
                style={[
                  styles.addressContainer,
                  defaultId === a.id && {borderWidth: 1},
                ]}
              >
                <View style={styles.defaultIconContainer}>
                  <CheckBox
                    title={I18n.t('Default')}
                    vertical
                    checked={defaultId === a.id}
                    onPress={() => this.onSelectAddress(a.id)}
                    onPressIcon={() => this.onSelectAddress(a.id)}
                    textStyle={{
                      color: themes[theme].bodyText,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                    containerStyle={styles.checkBoxContainer}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.onSelectAddress(a.id)}
                  style={styles.addressContent}
                >
                  <Text
                    style={styles.addressName}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                  >
                    {a.name}
                  </Text>
                  <Text
                    style={[styles.addressText, {marginTop: 8}]}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                  >
                    {a.city} {a.floor}
                  </Text>
                  <Text
                    style={[styles.addressText, {marginTop: 4}]}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                  >
                    {a.area}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editAction}>
                  <Text style={styles.editActionText}>{I18n.t('Edit')}</Text>
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.addAction}>
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
            </View>
          </ScrollView>
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
        </SafeAreaView>
      </KeyboardView>
    );
  }
}

export default withTheme(CheckoutNewAddressView);
