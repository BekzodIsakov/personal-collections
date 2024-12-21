import { useTranslation } from "react-i18next";
import { Select } from "@chakra-ui/react";
import { locales } from "@/constants";

const LanguageSelect = () => {
  const { i18n } = useTranslation();

  return (
    <Select
      value={i18n.resolvedLanguage}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
      }}
      display={{ base: "none", xs: "block" }}
    >
      {Object.keys(locales).map((locale) => (
        <option key={locale} value={locale}>
          {locales[locale].title}
        </option>
      ))}
    </Select>
  );
};

export default LanguageSelect;
