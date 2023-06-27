import {StyleSheet} from 'react-native';
import {COLOR_BLACK_900, COLOR_PRIMARY_500} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  topCategories: {
    flexDirection: 'row',
  },
  subTabs: {
    height: 54,
  },
  subCategories: {
    flexDirection: 'row',
  },
  topMenu: {
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderBottomWidth: 4,
  },
  topMenuText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  activeSubMenu: {
    margin: 8,
    width: 160,
    height: 38,
    backgroundColor: COLOR_PRIMARY_500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  subMenu: {
    margin: 8,
    height: 38,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  subMenuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  mainContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    marginTop: 12,
    marginHorizontal: 16,
    color: COLOR_BLACK_900,
  },
  productsContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 90,
  },
});
