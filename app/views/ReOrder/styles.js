import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_GREEN_400,
  COLOR_PRIMARY_500,
  COLOR_WHITE,
} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLOR_WHITE,
    position: 'relative',
  },
  cardTitle: {
    color: COLOR_BLACK_900,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    marginBottom: 8,
  },
  applyText: {
    position: 'absolute',
    bottom: 36,
    right: 24,
    color: COLOR_GREEN_400,
  },
  cardRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: COLOR_BLACK_900,
  },
  itemState: {
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
  paymentIcon: {
    marginHorizontal: 6,
    width: 16,
    height: 10,
    resizeMode: 'contain',
  },
  paymentText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: COLOR_PRIMARY_500,
  },
  freeText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: COLOR_PRIMARY_500,
  },
  orderItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  orderItemQuantity: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
  },
  orderItemText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
  },
  orderItemContent: {
    flexGrow: 1,
    marginLeft: 16,
  },
  orderItemPrice: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
  },
  orderItemUnit: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
  },
  submitBtn: {
    marginTop: 40,
    marginBottom: 32,
  },
});
