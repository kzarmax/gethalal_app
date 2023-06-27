import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_GRAY_400,
  COLOR_GRAY_600,
  COLOR_GREEN_100,
  COLOR_PRIMARY_500,
  COLOR_SEPARATOR,
} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  imageContainer: {
    borderRadius: 8,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 8,
  },
  productBody: {
    height: 94,
    marginTop: 16,
  },
  productText: {
    color: COLOR_BLACK_900,
    fontSize: 20,
    lineHeight: 26,
    marginTop: 12,
  },
  productSubText: {
    color: COLOR_GRAY_600,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
  productUnitPrice: {
    color: COLOR_GRAY_400,
    fontSize: 14,
    lineHeight: 18,
    marginTop: 4,
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  productPrice: {
    color: COLOR_BLACK_900,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  action: {
    backgroundColor: COLOR_PRIMARY_500,
    borderRadius: 17,
  },
  inactiveAction: {
    backgroundColor: COLOR_GREEN_100,
    borderRadius: 17,
  },
  actionButton: {
    padding: 7,
  },
  actionDeleteButton: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    backgroundColor: COLOR_PRIMARY_500,
    borderRadius: 17,
    margin: 7,
  },
  productQuantity: {
    marginHorizontal: 16,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: COLOR_BLACK_900,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR_SEPARATOR,
    marginVertical: 16,
  },
  productDetail: {},
  titleText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: COLOR_BLACK_900,
  },
  detailContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32,
  },
  detailTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: COLOR_BLACK_900,
    marginRight: 4,
  },
  countryText: {},
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitText: {},
  productDescription: {
    marginBottom: 56,
  },
  descriptionContainer: {
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: COLOR_GRAY_400,
  },
});
