/**
 * hosokawa
 * 2021/11/8
 */

import React from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import I18n from '../../i18n';
import {withTheme} from '../../theme';
import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import {themes} from '../../constants/colors';
import sharedStyles from '../Styles';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import {
  HISTORY_ORDER_STATUSES,
  ORDER_STATES,
  SHIPMENTS_ORDER_STATES,
  UPCOMING_ORDER_STATUSES,
} from '../../constants/app';
import {date_str_format} from '../../utils/datetime';
import GethalalSdk from '../../lib/gethalalSdk';
import ActivityIndicator from '../../containers/ActivityIndicator';
import styles from './styles';

const ORDER_UPCOMING = 0;
const ORDER_HISTORY = 1;

class MyOrdersView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('My_orders'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      order_filter: ORDER_UPCOMING,
      orders: [],
      isLoading: true,
    };
    this.order_filters = [
      {
        id: ORDER_UPCOMING,
        title: I18n.t('Upcoming'),
        order_statuses: UPCOMING_ORDER_STATUSES,
      },
      {
        id: ORDER_HISTORY,
        title: I18n.t('History'),
        order_statuses: HISTORY_ORDER_STATUSES,
      },
    ];
  }

  componentDidMount() {
    GethalalSdk.fetchData(GethalalSdk.GET_ORDERS_ENDPOINT, {
      customer: this.props.customer.id,
    })
      .then(response => {
        console.log('orders', response);
        this.setState({orders: response, isLoading: false});
      })
      .catch(() => {
        this.setState({isLoading: false});
      });
  }

  onPressItem = order => {
    if (this.state.order_filter === ORDER_HISTORY) {
      this.props.navigation.navigate('ReOrder', {order});
    } else {
      this.props.navigation.navigate('OrderDetail', {order});
    }
  };

  reOrder = order => {
    this.props.navigation.navigate('ReOrder', {order});
  };

  renderItem = ({item, index}) => {
    const {theme} = this.props;
    let orderState = ORDER_STATES[item.status];
    if (item.shipments && item.shipments.length > 0) {
      orderState = SHIPMENTS_ORDER_STATES[item.shipments[0].status];
    }
    return (
      <TouchableOpacity
        onPress={() => this.onPressItem(item)}
        style={[
          styles.itemContainer,
          {backgroundColor: themes[theme].focusedBackground},
        ]}
      >
        <View style={styles.itemRow}>
          <Text style={styles.itemText}>
            {date_str_format(item.date_created_gmt, 'ddd, D MMM YYYY')}
          </Text>
          <Text
            style={[
              styles.itemState,
              {color: orderState.color, backgroundColor: orderState.background},
            ]}
          >
            {orderState.title}
          </Text>
        </View>
        <Text style={styles.itemOrderId}>
          {I18n.t('Order_id_', {id: item.id})}
        </Text>
        <View style={[styles.itemRow, {marginTop: 8, alignItems: 'flex-end'}]}>
          <Text style={styles.itemPrice}>
            {item.currency_symbol}
            {item.total}
          </Text>
          {this.state.order_filter === ORDER_HISTORY && (
            <TouchableOpacity
              onPress={() => this.reOrder(item)}
              style={styles.itemActionStyle}
            >
              <Text style={styles.itemActionText}>{I18n.t('Re_order')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  onSave = () => {};

  render() {
    const {theme} = this.props;
    const {isLoading} = this.state;
    const filtered = this.state.orders.filter(
      o =>
        this.order_filters[this.state.order_filter] &&
        this.order_filters[this.state.order_filter].order_statuses.includes(
          o.status,
        ),
    );
    return (
      <SafeAreaView style={sharedStyles.container}>
        <StatusBar />
        {isLoading && (
          <ActivityIndicator size={'large'} absolute theme={theme} />
        )}
        <View
          style={[
            styles.container,
            {backgroundColor: themes[theme].backgroundColor},
          ]}
          {...scrollPersistTaps}
        >
          <View style={styles.headerContainer}>
            {this.order_filters.map(f => (
              <TouchableOpacity
                onPress={() => this.setState({order_filter: f.id})}
                style={{width: '50%'}}
              >
                {this.state.order_filter === f.id ? (
                  <Text style={styles.activeFilter}>{f.title}</Text>
                ) : (
                  <Text style={styles.inActiveFilter}>{f.title}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.mainContainer}>
            <FlatList
              style={{width: '100%', marginBottom: 64}}
              data={filtered}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart,
  customer: state.customer.customer,
});

export default connect(mapStateToProps, null)(withTheme(MyOrdersView));
