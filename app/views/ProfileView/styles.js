import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_GRAY_300,
  COLOR_SEPARATOR,
} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    marginTop: 8,
    padding: 16,
  },
  profileTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileName: {
    color: COLOR_BLACK_900,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
  },
  editIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  profileEmail: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingLeft: 20,
    paddingRight: 24,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 17,
    height: 20,
    resizeMode: 'contain',
  },
  itemText: {
    marginLeft: 12,
    color: COLOR_BLACK_900,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR_SEPARATOR,
    marginHorizontal: 12,
  },
  logoutContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingLeft: 20,
    paddingRight: 24,
  },
  appBottomText: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 20,
    color: 'black',
    fontWeight: '400',
    marginBottom: 32,
  },
});
