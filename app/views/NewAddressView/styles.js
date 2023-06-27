import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_PRIMARY_500,
  COLOR_WHITE,
} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLOR_WHITE,
  },
  cardTitle: {
    color: COLOR_BLACK_900,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
  },
  inputStyle: {},
  deliveryAddress: {},
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBoxContainer: {
    marginBottom: 32,
  },
  actionContainer: {
    paddingVertical: 21,
    paddingHorizontal: 16,
  },
  submitBtn: {},
});
