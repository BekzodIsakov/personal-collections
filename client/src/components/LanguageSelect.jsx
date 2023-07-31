import { Select } from "@chakra-ui/react";
import { useI18n } from "../providers/i18nProvider";

const LanguageSelect = () => {
  const { languages, selectedLanguage, setSelectedLanguage } = useI18n();

  return (
    <Select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      ml='15'
      size='sm'
      display={{ base: "none", xs: "block" }}
      variant='filled'
      rounded='md'
    >
      {Object.values(languages).map((language) => (
        <option key={language}>{language}</option>
      ))}
    </Select>
  );
};

export default LanguageSelect;
