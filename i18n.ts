import i18n, {ModuleType} from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from './locales/english.json';
import frTranslation from './locales/french.json';
import * as RNLocalize from 'react-native-localize';
import {translationCheck} from './src/utils/translationCheck.ts';

const resources = {
  en: enTranslation,
  fr: frTranslation,
};

const defaultLanguage = 'en';

const getBestLanguageFromLanguageCodes = (languageCodes: string[]) => {
  const availableTranslations = Object.getOwnPropertyNames(resources);
  const bestLocale = languageCodes.find(
    code => availableTranslations.indexOf(code) !== -1,
  );

  return bestLocale;
};

const getBestLanguage = () => {
  const languageCodes = RNLocalize.getLocales().map((locale: any) =>
    locale.languageCode.toLowerCase(),
  );

  return getBestLanguageFromLanguageCodes(languageCodes) || defaultLanguage;
};
const languageDetector = {
  type: 'languageDetector' as ModuleType,
  init: () => {},
  detect: getBestLanguage,
};
if (__DEV__) {
  translationCheck(resources);
}

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
