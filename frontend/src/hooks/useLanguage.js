import { useContext } from "react";
import i18n from "../config/i18n";
import LocaleContext from "../context/LocaleContext";

const useLanguage = () => {
  const { setLocale } = useContext(LocaleContext);

  const currentLanguage = i18n.language;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLocale(lang);
  };

  return { changeLanguage, currentLanguage };
};

export default useLanguage;
