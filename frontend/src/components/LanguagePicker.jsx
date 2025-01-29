import React, { useContext } from "react";

import classnames from "classnames/bind";
import styles from "./LanguagePicker.module.scss";
import changeLanguage from "../hooks/useLanguage";
import CustomSelect from "./CustomSelect";
import LocaleContext from "../context/LocaleContext";
import useLanguage from "../hooks/useLanguage";
import i18n from "../config/i18n";

const cx = classnames.bind(styles);

function LanguagePicker() {
  const { changeLanguage, currentLanguage } = useLanguage(); // Call the custom hook

  const languageOptions = [
    { name: "EN", value: "en" },
    { name: "नेपा", value: "ne" },
  ];

  const defaultLabel = languageOptions.filter(
    (option) => option.value === currentLanguage
  )[0];

  return (
    <div className={cx("language-picker")}>
      <CustomSelect
        options={languageOptions}
        defaultLabel={defaultLabel}
        onChangeFunction={changeLanguage}
      />
    </div>
  );
}

export default LanguagePicker;
