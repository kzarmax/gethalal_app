import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK_900,
  COLOR_GREEN_400,
  COLOR_WHITE,
} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLOR_WHITE,
  },
  successIcon: {
    marginTop: 8,
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cardTitle: {
    color: COLOR_BLACK_900,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderCompleteText: {
    color: COLOR_GREEN_400,
    fontSize: 18,
    marginTop: 24,
    fontWeight: '600',
    lineHeight: 26,
    alignSelf: 'center',
    textAlign: 'center',
    width: 180,
  },
  detailRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '400',
    color: COLOR_BLACK_900,
    width: 120,
  },
  detailText: {
    flexGrow: 1,
    fontSize: 16,
    color: COLOR_BLACK_900,
  },
  actionContainer: {
    backgroundColor: COLOR_WHITE,
    padding: 16,
  },
});
