import {StyleSheet} from 'react-native';
import {COLOR_BLACK_900, COLOR_GRAY_600} from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  faqCardContainer: {
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 24,
    marginBottom: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    marginBottom: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  itemActionContainer: {
    marginTop: 32,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 24,
    height: 24,
    marginLeft: 4,
    resizeMode: 'contain',
  },
  itemTitle: {
    marginLeft: 20,
    color: 'black',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
  },
  itemText: {
    marginLeft: 12,
    color: 'black',
    fontSize: 16,
  },
  itemSubText: {
    marginTop: 8,
    marginLeft: 48,
    color: COLOR_BLACK_900,
    fontSize: 16,
    lineHeight: 20,
  },
  itemDescription: {
    marginTop: 8,
    marginLeft: 48,
    color: COLOR_GRAY_600,
    fontSize: 14,
    lineHeight: 18,
  },
  faqItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
  },
  faqItemText: {
    color: COLOR_BLACK_900,
    fontSize: 14,
    lineHeight: 18,
  },
});
