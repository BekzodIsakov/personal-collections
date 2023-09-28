import { Select } from "@chakra-ui/react";
import { locales } from "@/constants";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { i18n } = useTranslation();

  return (
    <Select
      value={i18n.resolvedLanguage}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
      }}
      ml='15'
      size='sm'
      display={{ base: "none", xs: "block" }}
      variant='filled'
      rounded='md'
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
