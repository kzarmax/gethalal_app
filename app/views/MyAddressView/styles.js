import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_PRIMARY_500,
  COLOR_WHITE,
} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addressContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderColor: COLOR_PRIMARY_500,
    backgroundColor: COLOR_WHITE,
  },
  defaultIconContainer: {},
  addressContent: {
    marginLeft: 16,
    flexGrow: 1,
  },
  addressName: {
    color: COLOR_BLACK_900,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  addressText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
  },
  editAction: {
    marginRight: 8,
  },
  editActionText: {
    color: COLOR_BLACK_900,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  addAction: {
    marginTop: 36,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addActionIcon: {
    marginLeft: 12,
  },
  addActionText: {
    marginLeft: 8,
    color: COLOR_PRIMARY_500,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
  },
  submitBtnContainer: {
    paddingVertical: 21,
    paddingHorizontal: 16,
  },
  submitBtn: {},
});
