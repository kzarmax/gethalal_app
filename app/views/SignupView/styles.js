import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  mainContainer: {},
  captionContainer: {
    width: '100%',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  captionText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: 'black',
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
