/**
 * hosokawa
 * 2021/11/3
 */

import React from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Q} from '@nozbe/watermelondb';
import PropTypes from 'prop-types';

import db from '../../lib/database';
import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import styles from './styles';
import {
  COLOR_BLACK_900,
  COLOR_GRAY_100,
  COLOR_GRAY_600,
  COLOR_PRIMARY_500,
  COLOR_WHITE,
  themes,
} from '../../constants/colors';
import I18n from '../../i18n';
import {withTheme} from '../../theme';
import Product from './product';
import FreeShippingBar from '../../containers/FreeShippingBar';

import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
} from '../../actions/cart';
import ActivityIndicator from '../../containers/ActivityIndicator';
import {removeAmps} from '../../utils/string';
import {getObjectFromModel} from '../../lib/database/utils';

const SUB_TAB_WIDTH = 120;
const QUERY_SIZE = 10;

class CategoryView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Our_products'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const activeId = props.route.params?.active ?? null;
    const topCategories = props.categories.filter(
      c => c.parent === 0 && c.slug !== 'uncategorized',
    );

    this.count = 0;
    this.mounted = false;
    this.state = {
      loading: false,
      topCategories,
      activeCategoryId: activeId ?? topCategories[0]?.id,
      selectSubCategoryId: null,
      products: [],
      clicking: false,
    };
    this.end = {};
    this.query();
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.unsubscribeProducts();
    if (this.onEndReached && this.onEndReached.stop) {
      this.onEndReached.stop();
    }
  }

  unsubscribeProducts = () => {
    if (this.productsSubscription && this.productsSubscription.unsubscribe) {
      this.productsSubscription.unsubscribe();
    }
  };

  // Get products from Database
  query = async () => {
    this.count += QUERY_SIZE;
    const {activeCategoryId, selectSubCategoryId} = this.state;

    this.productObserve = db.collections
      .get('products')
      .query(
        Q.where(
          'category_ids',
          Q.like(
            '%' +
              (selectSubCategoryId
                ? selectSubCategoryId.toString()
                : activeCategoryId.toString()) +
              '%',
          ),
        ),
        Q.sortBy('name', Q.asc),
        Q.skip(0),
        Q.take(this.count),
      )
      .observe();

    this.unsubscribeProducts();
    this.productsSubscription = this.productObserve.subscribe(records => {
      if (records.length < this.count) {
        this.end[activeCategoryId] = true;
      }

      console.log('products', records, activeCategoryId);
      const products = records.filter(p =>
        p.category_ids.includes(activeCategoryId),
      );

      if (this.mounted) {
        this.setState({products}, () => this.forceUpdate());
      } else {
        this.state.products = products;
      }
    });
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 120;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  onEndReached = async () => {
    if (!this.end[this.state.activeCategoryId]) {
      console.log('onEndReached');
      this.query();
    }
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

  onPressTab = () => {};

  goToPage = async id => {
    console.log('select Category', id);

    this.onPressSubCategory(null, 0, id);
    setTimeout(() => {
      if (this.subCatScroll) {
        this.subCatScroll.scrollTo({x: 0, animated: false});
      }
    });
  };

  onPressSubCategory = (id, index, activeCategoryId) => {
    console.log('index', index);
    if (
      this.state.selectSubCategoryId === id &&
      activeCategoryId === this.state.activeCategoryId
    ) {
      return;
    }

    setTimeout(() => {
      try {
        if (this.subCatScroll) {
          this.subCatScroll.scrollTo({
            x: index * SUB_TAB_WIDTH,
            animated: true,
          });
        }
        if (this.scroll) {
          this.scroll.scrollTo({y: 0, animated: true});
        }
      } catch (e) {
        console.log('scroll failed', e);
      }
    }, 300);

    this.count = 0;
    this.setState(
      {
        selectSubCategoryId: id,
        clicking: true,
        activeCategoryId,
      },
      () => this.query(),
    );
  };

  // renderCategoryProducts = (sub, index) => {
  //   const {cart, theme} = this.props;
  //   const {products} = this.state;
  //
  //   const subProducts = products.filter(p => {
  //     const categoryIds = p.categories.map(c => c.id);
  //     if (sub.id) {
  //       return categoryIds.includes(sub.id);
  //     } else {
  //       return !categoryIds.find(cId => sub.excludes.includes(cId));
  //     }
  //   });
  //
  //   return (
  //     <View
  //       key={index}
  //       style={[
  //         styles.mainContainer,
  //         {backgroundColor: themes[theme].backgroundColor},
  //       ]}
  //       {...scrollPersistTaps}
  //     >
  //       {sub && (
  //         <Text style={styles.categoryTitle}>{removeAmps(sub.name)}</Text>
  //       )}
  //       <View style={styles.productsContainer}>
  //         {subProducts.map(c => (
  //           <Product
  //             key={c.id}
  //             product={c}
  //             cartProduct={cart[c.id]}
  //             onPress={() => this.onPressProduct(c)}
  //             onPressMinus={() => this.onPressMinus(c)}
  //             onPressPlus={() => this.onPressPlus(c)}
  //             theme={theme}
  //           />
  //         ))}
  //       </View>
  //     </View>
  //   );
  // };

  onViewableItemsChanged = ({viewableItems, changed}) => {
    if (viewableItems.length > 0) {
      const currentSubId = viewableItems[0].key;
      if (this.state.selectSubCategoryId !== currentSubId) {
        if (this.subCatScroll) {
          setTimeout(() =>
            this.subCatScroll.scrollTo({
              x: viewableItems[0].index * SUB_TAB_WIDTH,
              animated: true,
            }),
          );
        }
        console.log('select SubCategoryIndex', currentSubId);
        this.setState({selectSubCategoryId: currentSubId});
      }
    }
  };

  renderCategory = category => {
    const {categories, cart, theme} = this.props;
    const {selectSubCategoryId, activeCategoryId, products} = this.state;

    const subCategories = categories.filter(c => c.parent === activeCategoryId);
    const selectSubCategory = subCategories.find(
      c => c.id === selectSubCategoryId,
    );

    return (
      <View key={category.id}>
        <View style={styles.subTabs}>
          <ScrollView
            ref={ref => (this.subCatScroll = ref)}
            horizontal
            style={[
              styles.subCategories,
              {backgroundColor: themes[theme].headerBackground},
            ]}
            {...scrollPersistTaps}
            showsHorizontalScrollIndicator={false}
          >
            {subCategories.map((sc, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  this.onPressSubCategory(sc.id, index, activeCategoryId)
                }
                style={
                  selectSubCategoryId === sc.id
                    ? styles.activeSubMenu
                    : styles.subMenu
                }
              >
                <Text
                  style={[
                    styles.subMenuText,
                    {
                      color:
                        selectSubCategoryId === sc.id
                          ? COLOR_WHITE
                          : COLOR_GRAY_600,
                    },
                  ]}
                >
                  {removeAmps(sc.name)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <ScrollView
          ref={ref => (this.scroll = ref)}
          style={[
            styles.mainContainer,
            {backgroundColor: themes[theme].backgroundColor},
          ]}
          {...scrollPersistTaps}
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this.onEndReached();
            }
          }}
          scrollEventThrottle={400}
        >
          {selectSubCategory && (
            <Text style={styles.categoryTitle}>
              {removeAmps(selectSubCategory.name)}
            </Text>
          )}
          <View style={styles.productsContainer}>
            {products.map(item => (
              <Product
                key={item.id}
                product={item}
                cartProduct={cart[item.id]}
                onPress={() => this.onPressProduct(item)}
                onPressMinus={() => this.onPressMinus(item)}
                onPressPlus={() => this.onPressPlus(item)}
                theme={theme}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  render() {
    const {theme} = this.props;
    const {topCategories, activeCategoryId, loading} = this.state;
    const showFreeShipping = false;
    const freeShippingRemains = 0;
    const freeShippingPercent = 100;
    const activeCategory = topCategories.find(c => c.id === activeCategoryId);
    console.log('activeCategoryId', activeCategoryId);
    return (
      <SafeAreaView>
        <StatusBar />
        <View style={styles.container}>
          {loading && (
            <ActivityIndicator theme={theme} absolute size={'large'} />
          )}
          <View style={{height: 54}}>
            <ScrollView
              horizontal
              style={[
                styles.topCategories,
                {backgroundColor: themes[theme].headerBackground},
              ]}
              {...scrollPersistTaps}
              showsHorizontalScrollIndicator={false}
            >
              {topCategories.map((tc, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.goToPage(tc.id)}
                  style={[
                    styles.topMenu,
                    {
                      borderBottomColor:
                        activeCategoryId === tc.id
                          ? COLOR_PRIMARY_500
                          : COLOR_GRAY_100,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.topMenuText,
                      {
                        color:
                          activeCategoryId === tc.id
                            ? COLOR_PRIMARY_500
                            : COLOR_BLACK_900,
                      },
                    ]}
                  >
                    {removeAmps(tc.name)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {this.renderCategory(activeCategory)}
          {showFreeShipping && (
            <FreeShippingBar
              freeShippingPercent={freeShippingPercent}
              freeShippingRemains={freeShippingRemains}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  categories: state.product.categories,
  cart: state.cart.cart,
});

const mapDispatchToProps = dispatch => ({
  addToCart: params => dispatch(addToCartAction(params)),
  removeFromCart: params => dispatch(removeFromCartAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(CategoryView));
