import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_GRAY_600,
  COLOR_GREEN_400,
  COLOR_GREEN_900,
  COLOR_PRIMARY_500,
  COLOR_PRIMARY_900,
  COLOR_WHITE,
} from '../../constants/colors';
import {isIOS} from '../../utils/deviceInfo';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLOR_WHITE,
    position: 'relative',
  },
  cardTitle: {
    color: COLOR_BLACK_900,
    fontSize: 18,
    fontWeight: 'bold',
  },
  warningLogo: {
    marginLeft: 16,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  applyCouponBtn: {
    position: 'absolute',
    bottom: isIOS ? 32 : 32,
    right: 32,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLOR_PRIMARY_500,
  },
  applyCouponBtnText: {
    color: COLOR_WHITE,
  },
  applyText: {
    position: 'absolute',
    bottom: isIOS ? 32 : 36,
    right: 32,
    color: COLOR_GREEN_400,
  },
  selectStyle: {},
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: COLOR_BLACK_900,
  },
  inclusive: {
    fontSize: 12,
    color: COLOR_GRAY_600,
  },
  totalText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: COLOR_BLACK_900,
  },
  freeText: {
    color: COLOR_PRIMARY_500,
  },
  submitBtn: {
    paddingVertical: 21,
    paddingHorizontal: 16,
  },
  donateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  donateIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  donateTextContainer: {
    marginLeft: 16,
  },
  donateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  donateText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 2,
    color: COLOR_PRIMARY_900,
  },
  donateCurrency: {
    fontSize: 14,
    lineHeight: 20,
    color: COLOR_GREEN_900,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 343,
    borderRadius: 8,
    padding: 16,
  },
  errorLogoContainer: {
    alignItems: 'center',
  },
  errorLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  modalSubTitle: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 26,
    color: COLOR_BLACK_900,
  },
  tryAgainAction: {
    marginTop: 20,
    textAlign: 'right',
  },
});
