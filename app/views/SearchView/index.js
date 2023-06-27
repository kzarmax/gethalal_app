/**
 * hosokawa
 * 2021/11/4
 */

import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView as RNSafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';

import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import styles from './styles';
import {themes} from '../../constants/colors';
import {withTheme} from '../../theme';
import Product from '../CategoryView/product';
import I18n from '../../i18n';
import SearchBox from '../../containers/SearchBox';
import debounce from '../../utils/debounce';
import GethalalSdk from '../../lib/gethalalSdk';
import ActivityIndicator from '../../containers/ActivityIndicator';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
} from '../../actions/cart';
import {connect} from 'react-redux';
import {getObjectFromModel} from '../../lib/database/utils';

class SearchView extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      text: '',
      products: [],
    };
  }

  onSearchChangeText = text => {
    this.setState({text: text.trim(), searching: true});
    this.onSearch();
  };

  onSearch = debounce(async () => {
    const {text} = this.state;
    this.setState({searching: true});
    GethalalSdk.getAPICall(GethalalSdk.GET_PRODUCTS_ENDPOINT, {search: text})
      .then(products => {
        console.log('products', products);
        this.setState({products, searching: false});
      })
      .catch(e => {
        this.setState({searching: false});
      });
  }, 2000);

  onCancel = () => {
    this.props.navigation.pop();
  };

  onPressMinus = product => {
    const {removeFromCart} = this.props;
    removeFromCart(product.id);
  };

  onPressPlus = product => {
    const {addToCart} = this.props;
    addToCart(getObjectFromModel(product));
  };

  onPressProduct = product => {
    this.props.navigation.navigate('ProductDetail', {product: product});
  };

  onGoToHome = () => {
    this.props.navigation.popToTop();
  };

  render() {
    const {cart, theme} = this.props;
    const {searching, products, text} = this.state;

    return (
      <SafeAreaView>
        <StatusBar />
        <RNSafeAreaView
          style={{backgroundColor: themes[theme].headerBackground}}
        >
          <View style={styles.topHeaderBar}>
            <SearchBox
              value={text}
              containerStyle={{flexGrow: 1}}
              onChangeText={this.onSearchChangeText}
              onSubmitEditing={this.onSearch}
              hasCancel={text.length > 0}
              onCancelPress={() => this.setState({text: ''})}
              placeholder={I18n.t('What_search')}
            />
            <View style={styles.headerRightActions}>
              <TouchableOpacity
                onPress={this.onCancel}
                style={styles.headerRightIcon}
              >
                <Text style={styles.cancelText}>{I18n.t('Cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RNSafeAreaView>
        {searching && <ActivityIndicator absolute size={'large'} />}
        {products.length > 0 ? (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: themes[theme].backgroundColor},
            ]}
            {...scrollPersistTaps}
          >
            <Text style={styles.searchTitle}>
              {I18n.t('Search_found', {number: 16, keyword: text})}
            </Text>
            <View style={styles.productsContainer}>
              {products.map(c => (
                <Product
                  key={c.id}
                  product={c}
                  cartProduct={cart[c.id]}
                  onPress={() => this.onPressProduct(c)}
                  onPressMinus={() => this.onPressMinus(c)}
                  onPressPlus={() => this.onPressPlus(c)}
                  theme={theme}
                />
              ))}
            </View>
          </ScrollView>
        ) : text.length > 0 && !searching ? (
          <View
            style={[
              styles.container,
              {
                backgroundColor: themes[theme].backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 24,
              },
            ]}
          >
            <Text style={styles.emptyText}>
              {I18n.t('Search_no_result')} "
              <Text style={styles.emptyKeyword}>{text}</Text>"
            </Text>
            <TouchableOpacity onPress={this.onGoToHome}>
              <Text style={styles.shoppingButton}>
                {I18n.t('Continue_shopping')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  cart: state.cart.cart,
});

const mapDispatchToProps = dispatch => ({
  addToCart: params => dispatch(addToCartAction(params)),
  removeFromCart: params => dispatch(removeFromCartAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(SearchView));
