import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_ERROR,
  COLOR_GRAY_600,
  COLOR_PRIMARY_500,
  COLOR_WHITE,
} from '../../constants/colors';
import {isIOS} from '../../utils/deviceInfo';

export default StyleSheet.create({
  // headerBar: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     height: isIOS?44:56
  // },
  // headerTitle: {
  //     fontSize: 18,
  //     lineHeight: 24,
  //     fontWeight: '500',
  //     color: 'black'
  // },
  topHeaderBar: {
    borderRadius: 8,
    padding: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addZipCode: {
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FAF9F9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addZipCodeText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '500',
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
  container: {
    flex: 1,
    padding: 16,
  },
  productsContainer: {
    marginTop: 16,
    marginBottom: 64,
  },
  cartIcon: {
    marginTop: 32,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emptyText: {
    marginVertical: 32,
    color: COLOR_BLACK_900,
    fontWeight: 'bold',
    fontSize: 20,
  },
  emptyKeyword: {
    color: COLOR_PRIMARY_500,
    fontSize: 20,
  },
  shoppingButton: {
    marginTop: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    fontSize: 20,
    backgroundColor: COLOR_PRIMARY_500,
    color: COLOR_WHITE,
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
  modalHeader: {
    alignItems: 'flex-end',
  },
  closeIcon: {},
  modalTitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 26,
    alignSelf: 'center',
  },
  modalSubTitle: {
    marginTop: 8,
    color: COLOR_GRAY_600,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    alignSelf: 'center',
  },
  modalScrollContainer: {
    marginTop: 24,
    flex: 1,
  },
  modalProductsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitBtn: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 54,
    marginVertical: 16,
    marginHorizontal: 16,
  },
});
