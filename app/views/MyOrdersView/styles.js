import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_GRAY_100,
  COLOR_GRAY_600,
  COLOR_PRIMARY_500,
  COLOR_WHITE,
} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_GRAY_100,
    borderRadius: 8,
    padding: 4,
  },
  activeFilter: {
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: COLOR_WHITE,
    borderRadius: 8,
    color: COLOR_PRIMARY_500,
    fontWeight: '500',
    padding: 6,
    width: '100%',
    fontSize: 16,
    lineHeight: 20,
  },
  inActiveFilter: {
    alignSelf: 'center',
    textAlign: 'center',
    color: COLOR_BLACK_900,
    fontWeight: 'bold',
    padding: 6,
    width: '100%',
    fontSize: 16,
    lineHeight: 20,
  },
  mainContainer: {
    flexGrow: 1,
    marginTop: 12,
  },
  itemContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
  },
  itemState: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    borderRadius: 8,
  },
  itemOrderId: {
    marginTop: 4,
    color: COLOR_GRAY_600,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  itemPrice: {
    color: COLOR_PRIMARY_500,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
  },
  itemActionStyle: {
    backgroundColor: COLOR_PRIMARY_500,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  itemActionText: {
    color: COLOR_WHITE,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
  actionBtn: {
    marginTop: 20,
  },
});
