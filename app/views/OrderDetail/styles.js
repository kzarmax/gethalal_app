import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_GRAY_100,
  COLOR_GRAY_400,
  COLOR_GRAY_600,
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
    fontWeight: '400',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 342,
    borderRadius: 8,
    padding: 16,
  },
  modalHeader: {
    alignItems: 'flex-end',
  },
  closeIcon: {},
  modalTitle: {
    marginTop: 12,
    marginBottom: 8,
    color: COLOR_BLACK_900,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 26,
    alignSelf: 'center',
  },
  modalTextInput: {
    flexGrow: 1,
    marginTop: 16,
    textAlignVertical: 'top',
    fontSize: 18,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    height: 130,
    borderColor: COLOR_GRAY_400,
  },
  actionContainer: {
    marginTop: 32,
  },
  androidButton: {
    borderRadius: 24,
  },
  androidButtonText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    paddingVertical: 12,
    letterSpacing: 1.6,
    textAlign: 'center',
  },
  successLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cancelContent: {},
  modalSubTitle: {
    marginTop: 24,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    textAlign: 'center',
  },
  tryAgainAction: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
});
