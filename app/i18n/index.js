import i18n from 'i18n-js';
import {I18nManager} from 'react-native';

export * from './isRTL';

export const LANGUAGES = [
  {
    label: 'English',
    value: 'en',
    file: require('./locales/en').default,
  },
  {
    label: 'العربية',
    value: 'ar',
    file: require('./locales/ar').default,
  },
  {
    label: 'Deutsch',
    value: 'de',
    file: require('./locales/de').default,
  },
];

const translations = LANGUAGES.reduce((ret, item) => {
  ret[item.value] = item.file;
  return ret;
}, {});

i18n.translations = translations;
i18n.fallbacks = true;

const defaultLanguage = {languageTag: 'en', isRTL: false};
const {languageTag, isRTL} = defaultLanguage;

I18nManager.allowRTL(true);
I18nManager.forceRTL(isRTL);
I18nManager.swapLeftAndRightInRTL(isRTL);
i18n.locale = languageTag;
i18n.isRTL = I18nManager.isRTL;

export default i18n;
