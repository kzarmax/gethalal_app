import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_PRIMARY_500,
  COLOR_WHITE,
} from '../../constants/colors';

export default StyleSheet.create({
  topHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    color: COLOR_BLACK_900,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '500',
  },
  emptyKeyword: {
    color: COLOR_PRIMARY_500,
    fontSize: 20,
  },
  shoppingButton: {
    marginTop: 80,
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 30,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    backgroundColor: COLOR_PRIMARY_500,
    color: COLOR_WHITE,
  },
  firstZipCodeContainer: {
    backgroundColor: COLOR_WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  zipCodeContainer: {
    backgroundColor: '#F3F2F2',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  zipCode: {
    fontSize: 12,
    paddingRight: 4,
    marginVertical: 8,
  },
  headerRightActions: {
    flexDirection: 'row',
  },
  headerRightIcon: {
    marginLeft: 16,
  },
  searchTitle: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    color: COLOR_BLACK_900,
  },
  productsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
  },
  cancelText: {
    color: COLOR_BLACK_900,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
});
