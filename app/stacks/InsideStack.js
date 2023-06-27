/**
 * hosokawa
 * 2021/11/2
 */

import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ThemeContext} from '../theme';
import {outsideHeader, themedHeader, StackAnimation} from '../utils/navigation';
import {COLOR_PRIMARY_500, COLOR_WHITE, themes} from '../constants/colors';
import {Image, Text, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import I18n from './../i18n';
import images from '../assets/images';
import HomeView from '../views/HomeView';
import CategoryView from '../views/CategoryView';
import ProductDetailView from '../views/ProductDetailView';
import SearchView from '../views/SearchView';
import CartView from '../views/CartView';
import NewAddressView from '../views/NewAddressView';
import MyAddressView from '../views/MyAddressView';
import PaymentView from '../views/PaymentView';
import OrderCompleteView from '../views/OrderCompleteView';
import AccountView from '../views/AccountView';
import LoginView from '../views/LoginView';
import SignupView from '../views/SignupView';
import ForgotPasswordView from '../views/ForgotPasswordView';
import ResetPasswordView from '../views/ResetPasswordView';
import VerifyEmailView from '../views/VerifyEmailView';
import ProfileView from '../views/ProfileView';
import ProfileEditView from '../views/ProfileEditView';
import LanguageView from '../views/LanguageView';
import MyOrdersView from '../views/MyOrdersView';
import PaymentMethodView from '../views/PaymentMethodView';
import ChangePasswordView from '../views/ChangePasswordView';
import NotificationView from '../views/NotificationView';
import HelpCenterView from '../views/HelpCenterView';
import FaqView from '../views/FaqView';
import AboutView from '../views/AboutView';
import WebHtmlView from '../views/WebHtmlView';
import OrderDetailView from '../views/OrderDetail';
import ReOrderView from '../views/ReOrder';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TestView from '../views/TestView';
import NewPaymentMethodView from '../views/NewPaymentMethodView';
import CheckoutAddressView from '../views/CheckoutAddressView';
import CheckoutNewAddressView from '../views/CheckoutAddressView';
import {useSelector} from 'react-redux';

const style = StyleSheet.create({
  tabStyleLabel: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 8,
  },
  menuIcon: {
    marginTop: 8,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  badgeStyle: {
    borderRadius: 12,
    fontSize: 10,
    backgroundColor: COLOR_PRIMARY_500,
    borderWidth: 1,
    borderColor: COLOR_WHITE,
    color: 'white',
  },
});

// Shop
const Shop = createStackNavigator();
const ShopStack = () => {
  const {theme} = React.useContext(ThemeContext);

  return (
    <Shop.Navigator
      screenOptions={{
        ...outsideHeader,
        ...themedHeader(theme),
        ...StackAnimation,
      }}
    >
      <Shop.Screen
        name="Home"
        component={HomeView}
        options={{headerShown: false}}
      />
      <Shop.Screen
        name="Category"
        component={CategoryView}
        options={CategoryView.navigationOptions}
      />
      <Shop.Screen
        name="ProductDetail"
        component={ProductDetailView}
        options={ProductDetailView.navigationOptions}
      />
      <Inside.Screen
        name="Search"
        component={SearchView}
        options={{headerShown: false}}
      />
    </Shop.Navigator>
  );
};

const HelpCenter = createStackNavigator();
const HelpCenterStack = () => {
  const {theme} = React.useContext(ThemeContext);

  return (
    <HelpCenter.Navigator
      screenOptions={{
        ...outsideHeader,
        ...themedHeader(theme),
        ...StackAnimation,
      }}
    >
      <HelpCenter.Screen
        name="HelpCenter"
        component={HelpCenterView}
        options={HelpCenterView.navigationOptions}
      />
    </HelpCenter.Navigator>
  );
};

// Tab
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const {theme} = React.useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const cart = useSelector(state => state.cart.cart);

  let totalQuantity = 0;
  Object.values(cart).forEach(c => (totalQuantity += c.quantity));

  return (
    <Tab.Navigator
      initialRouteName="ShopStack"
      resetOnBlur={true}
      screenOptions={{
        tabBarActiveTintColor: themes[theme].activeTintColor,
        tabBarInactiveTintColor: themes[theme].inactiveTintColor,
        tabBarStyle: {
          backgroundColor: COLOR_WHITE,
          height: 64 + insets.bottom,
        },
      }}
    >
      <Tab.Screen
        name="ShopStack"
        component={ShopStack}
        options={{
          tabBarLabel: ({color, focused}) => (
            <Text style={{...style.tabStyleLabel, color}}>
              {I18n.t('Get_halal')}
            </Text>
          ),
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={focused ? images.menu_shop_active : images.menu_shop}
              style={style.menuIcon}
            />
          ),
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="CartStack"
        component={ShopStack}
        options={{
          tabBarLabel: ({color, focused}) => (
            <Text style={{...style.tabStyleLabel, color}}>
              {I18n.t('Cart')}
            </Text>
          ),
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={focused ? images.menu_cart_active : images.menu_cart}
              style={style.menuIcon}
            />
          ),
          tabBarBadge: totalQuantity ? totalQuantity : undefined,
          tabBarBadgeStyle: totalQuantity ? style.badgeStyle : {},
          headerShown: false,
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Cart');
          },
        })}
      />
      <Tab.Screen
        name="HelpCenter"
        component={HelpCenterStack}
        options={{
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                ...style.tabStyleLabel,
                color,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              {I18n.t('Talk_to_us')}
            </Text>
          ),
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={focused ? images.menu_chat_active : images.menu_chat}
              style={style.menuIcon}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const Inside = createStackNavigator();
const InsideNavigator = () => {
  const {theme} = React.useContext(ThemeContext);

  return (
    <Inside.Navigator
      screenOptions={{
        ...outsideHeader,
        ...themedHeader(theme),
        ...StackAnimation,
      }}
    >
      <Inside.Screen
        name="Tab"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Inside.Screen
        name="Cart"
        component={CartView}
        options={CartView.navigationOptions}
      />
      <Inside.Screen
        name="CheckoutNewAddress"
        component={CheckoutNewAddressView}
        options={CheckoutNewAddressView.navigationOptions}
      />
      <Inside.Screen
        name="CheckoutAddress"
        component={CheckoutAddressView}
        options={CheckoutAddressView.navigationOptions}
      />
      <Inside.Screen name="NewAddress" component={NewAddressView} />
      <Inside.Screen
        name="MyAddress"
        component={MyAddressView}
        options={MyAddressView.navigationOptions}
      />
      <Inside.Screen
        name="Payment"
        component={PaymentView}
        options={PaymentView.navigationOptions}
      />
      <Inside.Screen
        name="OrderComplete"
        component={OrderCompleteView}
        options={OrderCompleteView.navigationOptions}
      />
      <Inside.Screen
        name="Account"
        component={AccountView}
        options={AccountView.navigationOptions}
      />
      <Inside.Screen
        name="Login"
        component={LoginView}
        options={LoginView.navigationOptions}
      />
      <Inside.Screen
        name="Signup"
        component={SignupView}
        options={SignupView.navigationOptions}
      />
      <Inside.Screen
        name="ForgotPassword"
        component={ForgotPasswordView}
        options={ForgotPasswordView.navigationOptions}
      />
      <Inside.Screen
        name="ResetPassword"
        component={ResetPasswordView}
        options={ResetPasswordView.navigationOptions}
      />
      <Inside.Screen
        name="VerifyEmail"
        component={VerifyEmailView}
        options={VerifyEmailView.navigationOptions}
      />
      <Inside.Screen
        name="Profile"
        component={ProfileView}
        options={ProfileView.navigationOptions}
      />
      <Inside.Screen
        name="ProfileEdit"
        component={ProfileEditView}
        options={ProfileEditView.navigationOptions}
      />
      <Inside.Screen
        name="Language"
        component={LanguageView}
        options={LanguageView.navigationOptions}
      />
      <Inside.Screen
        name="MyOrders"
        component={MyOrdersView}
        options={MyOrdersView.navigationOptions}
      />
      <Inside.Screen name="NewPaymentMethod" component={NewPaymentMethodView} />
      <Inside.Screen
        name="PaymentMethod"
        component={PaymentMethodView}
        options={PaymentMethodView.navigationOptions}
      />
      <Inside.Screen
        name="ChangePassword"
        component={ChangePasswordView}
        options={ChangePasswordView.navigationOptions}
      />
      <Inside.Screen
        name="Notification"
        component={NotificationView}
        options={NotificationView.navigationOptions}
      />
      <Inside.Screen
        name="Faq"
        component={FaqView}
        options={FaqView.navigationOptions}
      />
      <Inside.Screen
        name="About"
        component={AboutView}
        options={AboutView.navigationOptions}
      />
      <Inside.Screen
        name="WebHtml"
        component={WebHtmlView}
        options={WebHtmlView.navigationOptions}
      />
      <Inside.Screen
        name="ReOrder"
        component={ReOrderView}
        options={ReOrderView.navigationOptions}
      />
      <Inside.Screen
        name="OrderDetail"
        component={OrderDetailView}
        options={OrderDetailView.navigationOptions}
      />
      <Inside.Screen
        name="Test"
        component={TestView}
        options={TestView.navigationOptions}
      />
    </Inside.Navigator>
  );
};

export default InsideNavigator;
