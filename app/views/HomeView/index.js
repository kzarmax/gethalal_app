/**
 * hosokawa
 * 2021/11/3
 */

import React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView as RNSafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';

import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import styles from './styles';
import {VectorIcon} from '../../containers/VectorIcon';
import {COLOR_ERROR, COLOR_WHITE, themes} from '../../constants/colors';
import I18n from '../../i18n';
import {withTheme} from '../../theme';
import images from '../../assets/images';
import AsyncStorage from '@react-native-community/async-storage';
import {NO_FIRST_APP_LOGIN} from '../../constants/keys';
import {setFirstLogin as setFirstLoginAction} from '../../actions/login';
import GethalalSdk from '../../lib/gethalalSdk';
import {setPostcode as setPostcodeAction} from '../../actions/cart';
import ActivityIndicator from '../../containers/ActivityIndicator';
import {removeAmps} from '../../utils/string';
import LoadingIndicator from './components/LoadingIndicator';

class HomeView extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      zipCode: props.customerPostcode.zipCode ?? '',
      showZipCodeDlg: false,
      isErrorZipCode: false,
      loading: false,
      topProducts: [
        {id: 1, image_url: 'sliderImg1'},
        {id: 2, image_url: 'sliderImg2'},
      ],
      submittingPostcode: false,
    };
  }

  onPressZipCode = () => {
    this.setState({showZipCodeDlg: true});
  };

  onSearch = () => {
    this.props.navigation.navigate('Search');
  };

  onClickAccount = () => {
    const {isAuthenticated} = this.props;
    if (isAuthenticated) {
      this.props.navigation.navigate('Profile');
    } else {
      this.props.navigation.navigate('Account');
    }
  };

  onConfirmZipCode = () => {
    const {setPostcode} = this.props;
    const {zipCode} = this.state;

    this.setState({isErrorZipCode: false, submittingPostcode: true});
    GethalalSdk.postAPICall(GethalalSdk.SET_POSTCODE, {
      postcode: zipCode,
      context: 'view',
    }).then(response => {
      if (response.success) {
        setPostcode(response.data);
        this.setState({
          showZipCodeDlg: false,
          submittingPostcode: false,
          zipCode: '',
        });
      } else {
        this.setState({isErrorZipCode: true, submittingPostcode: false});
      }
    });
  };

  onCloseFirstScreen = async () => {
    await AsyncStorage.setItem(NO_FIRST_APP_LOGIN, 'Yes');
    const {setFirstLogin} = this.props;
    setFirstLogin(false);
  };

  onPressCategory = c => {
    this.props.navigation.navigate('Category', {active: c.id});
  };

  renderSlides = () => {
    let sides = [];
    const {topProducts} = this.state;
    topProducts.forEach(c => {
      sides.push(
        <View style={styles.slideItem} key={c.id}>
          <Image source={images[c.image_url]} style={styles.slideItemImage} />
        </View>,
      );
    });
    return sides;
  };

  render() {
    const {categories, isFirstLogin, customerPostcode, theme} = this.props;
    const {zipCode, showZipCodeDlg, isErrorZipCode, submittingPostcode} =
      this.state;

    const topCategories = categories.filter(
      c => c.parent === 0 && c.slug !== 'uncategorized',
    );

    return (
      <SafeAreaView>
        <StatusBar />
        {isFirstLogin && (
          <RNSafeAreaView
            style={[
              styles.modalFirstContainer,
              {backgroundColor: 'rgba(39,39,39,0.7)'},
            ]}
          >
            <View style={styles.topHeaderBar}>
              <View style={styles.firstZipCodeContainer}>
                <Text
                  style={[
                    styles.zipCode,
                    {color: themes[theme].activeTintColor},
                  ]}
                >
                  {I18n.t('Add_zip_code')}
                </Text>
                <VectorIcon
                  type={'MaterialIcons'}
                  name={'chevron-right'}
                  size={20}
                  color={themes[theme].activeTintColor}
                />
              </View>
            </View>
            <Image source={images.arrow_zipcode} style={styles.arrowZipCode} />
            <Text style={styles.helpZipCode}>
              {I18n.t('Change_zipcode_guide')}
            </Text>
            <TouchableOpacity
              onPress={this.onCloseFirstScreen}
              style={[
                styles.firstConfirmContainer,
                {backgroundColor: COLOR_WHITE},
              ]}
            >
              <Text style={styles.firstConfirmBtn}>{I18n.t('Got_it')}</Text>
            </TouchableOpacity>
          </RNSafeAreaView>
        )}
        <RNSafeAreaView
          style={{backgroundColor: themes[theme].headerBackground}}
        >
          <View style={styles.topHeaderBar}>
            <TouchableOpacity
              onPress={this.onPressZipCode}
              style={styles.zipCodeContainer}
            >
              {customerPostcode.postcode && customerPostcode.zone ? (
                <>
                  <Text
                    style={[
                      styles.zipCode,
                      {color: themes[theme].activeTintColor},
                    ]}
                  >
                    {customerPostcode.postcode}
                  </Text>
                  <Text
                    style={[
                      styles.zipCode,
                      {color: themes[theme].activeTintColor},
                    ]}
                  >
                    {customerPostcode.zone}
                  </Text>
                </>
              ) : (
                <Text
                  style={[
                    styles.zipCode,
                    {color: themes[theme].activeTintColor},
                  ]}
                >
                  {I18n.t('Add_zip_code')}
                </Text>
              )}
              <VectorIcon
                type={'MaterialIcons'}
                name={'chevron-right'}
                size={20}
                color={themes[theme].activeTintColor}
              />
            </TouchableOpacity>
            <View style={styles.headerRightActions}>
              <TouchableOpacity
                onPress={this.onSearch}
                style={styles.headerRightIcon}
              >
                <VectorIcon
                  type={'MaterialIcons'}
                  name={'search'}
                  size={30}
                  color={themes[theme].activeTintColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onClickAccount}
                style={styles.headerRightIcon}
              >
                <VectorIcon
                  type={'FontAwesome'}
                  name={'user'}
                  size={28}
                  color={themes[theme].activeTintColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </RNSafeAreaView>
        <ScrollView
          style={[
            styles.container,
            {backgroundColor: themes[theme].backgroundColor},
          ]}
          {...scrollPersistTaps}
        >
          <View style={styles.topSwiper}>
            <Swiper
              loop={true}
              ref={ref => (this.swipe = ref)}
              activeDotStyle={styles.activeDot}
              containerStyle={styles.swiperContainer}
              dotStyle={styles.dot}
              paginationStyle={{bottom: -8}}
            >
              {this.renderSlides()}
            </Swiper>
          </View>
          <View style={styles.productCategories}>
            {topCategories.length ? (
              topCategories.map(c => (
                <TouchableOpacity
                  onPress={() => this.onPressCategory(c)}
                  style={styles.categoryContainer}
                  key={c.id}
                >
                  <View
                    style={[
                      styles.categoryImageContent,
                      {backgroundColor: themes[theme].focusedBackground},
                    ]}
                  >
                    <Image
                      source={{uri: c.image?.src}}
                      style={styles.categoryImage}
                    />
                  </View>
                  <Text
                    style={[
                      styles.categoryText,
                      {color: themes[theme].bodyText},
                    ]}
                  >
                    {removeAmps(c.name)}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <LoadingIndicator theme={theme} />
            )}
          </View>
        </ScrollView>
        <Modal
          transparent
          onRequestClose={() => this.setState({showZipCodeDlg: false})}
          visible={showZipCodeDlg}
        >
          <TouchableOpacity
            style={[
              styles.modalContainer,
              {backgroundColor: themes[theme].modalBackground},
            ]}
            onPressOut={() => {
              this.setState({showZipCodeDlg: false});
            }}
          >
            <View
              style={[
                styles.modalContent,
                {backgroundColor: themes[theme].backgroundColor},
              ]}
            >
              {submittingPostcode && (
                <ActivityIndicator theme={theme} absolute />
              )}
              <View
                style={[
                  styles.formContainer,
                  isErrorZipCode
                    ? {borderColor: COLOR_ERROR, padding: 16}
                    : {borderColor: themes[theme].backgroundColor},
                ]}
              >
                <TextInput
                  inputRef={e => {
                    this.zipCodeInput = e;
                  }}
                  defaultValue={customerPostcode.postcode}
                  style={{
                    flexGrow: 1,
                    fontSize: 20,
                    lineHeight: 24,
                    padding: 0,
                    textAlignVertical: 'center',
                  }}
                  placeholder={I18n.t('Enter_your_zip_code')}
                  keyboardType="number-pad"
                  returnKeyType="send"
                  textContentType="oneTimeCode"
                  onChangeText={zipCode => this.setState({zipCode})}
                  onSubmitEditing={() => {
                    this.onConfirmZipCode();
                  }}
                  theme={theme}
                />
                <TouchableOpacity
                  onPress={this.onConfirmZipCode}
                  disabled={submittingPostcode || zipCode.length < 1}
                  style={[
                    styles.confirmContainer,
                    {
                      backgroundColor:
                        zipCode && zipCode.length > 0 ? '#3D3D3D' : '#939393',
                    },
                  ]}
                >
                  <Text style={styles.confirmBtn}>{I18n.t('Confirm')}</Text>
                </TouchableOpacity>
              </View>
              {isErrorZipCode && (
                <Text style={styles.errorZipCode}>
                  {I18n.t('error_zip_code')}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  isFirstLogin: state.login.isFirstLogin,
  categories: state.product.categories,
  customerPostcode: state.cart.customerPostcode,
});

const mapDispatchToProps = dispatch => ({
  setFirstLogin: params => dispatch(setFirstLoginAction(params)),
  setPostcode: params => dispatch(setPostcodeAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(HomeView));
