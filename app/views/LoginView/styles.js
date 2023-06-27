import {StyleSheet} from 'react-native';
import {COLOR_ERROR} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  mainContainer: {},
  error: {
    color: COLOR_ERROR,
    marginVertical: 8,
  },
  forgotContainer: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  forgotText: {
    textAlign: 'center',
    textDecorationLine: 'none',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
  actionBtn: {
    marginTop: 32,
  },
  bottomContent: {
    marginTop: 40,
    marginBottom: 48,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
