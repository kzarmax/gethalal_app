import React from 'react';
import PropTypes from 'prop-types';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import I18n from '../../i18n';
import {withTheme} from '../../theme';
import SafeAreaView from '../../containers/SafeAreaView';
import StatusBar from '../../containers/StatusBar';
import styles from './styles';
import {COLOR_BLACK_900, themes} from '../../constants/colors';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import CheckoutHeader from '../../containers/CheckoutHeader';
import images from '../../assets/images';
import {VectorIcon} from '../../containers/VectorIcon';
import Button from '../../containers/Button';

class OrderCompleteView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: I18n.t('Checkout'),
  });

  static propTypes = {
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const order = props.route.params.order;
    this.state = {
      order,
      loading: false,
    };
  }

  onGoToTrack = () => {};

  onGoToShop = () => {
    const {navigation} = this.props;
    navigation.pop();
  };

  render() {
    const {theme} = this.props;
    const {order} = this.state;
    const delivery_date = order.meta_data?.find(d => d.key === 'delivery_date');

    return (
      <SafeAreaView>
        <StatusBar />
        <CheckoutHeader step={2} theme={theme} />
        <ScrollView
          style={[
            styles.container,
            {backgroundColor: themes[theme].backgroundColor},
          ]}
          {...scrollPersistTaps}
        >
          <View style={styles.cardContainer}>
            <Image source={images.order_success} style={styles.successIcon} />
            <Text style={styles.orderCompleteText}>
              {I18n.t('Order_placed_success')}
            </Text>
            <View style={[styles.detailRow, {marginTop: 24}]}>
              <Text style={styles.detailTitle}>{I18n.t('Order_id')}</Text>
              <Text style={styles.detailText}>#{order.id}</Text>
              <TouchableOpacity onPress={() => {}}>
                <VectorIcon
                  type={'Ionicons'}
                  name={'copy'}
                  size={20}
                  color={COLOR_BLACK_900}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.detailRow, {marginTop: 4}]}>
              <Text style={styles.detailTitle}>{I18n.t('Delivery_date')}</Text>
              <Text style={styles.detailText}>{delivery_date.value}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>{I18n.t('Address')}</Text>
              <Text style={styles.detailText}>{order.shipping.address_1}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.actionContainer}>
          {/*<Button*/}
          {/*    title={I18n.t('Track_your_order')}*/}
          {/*    type="primary"*/}
          {/*    size="W"*/}
          {/*    onPress={this.onGoToTrack}*/}
          {/*    theme={theme}*/}
          {/*/>*/}
          <Button
            title={I18n.t('Shop_again')}
            type="white"
            size="W"
            onPress={this.onGoToShop}
            theme={theme}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(OrderCompleteView);
