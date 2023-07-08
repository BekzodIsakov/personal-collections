import React, { useContext } from "react";

const I18nContext = React.createContext();

const I18nProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("uz");

  React.useEffect(() => {
    localStorage.setItem("language", selectedLanguage);
    // localStorage.setToken("language", language);
  }, [selectedLanguage]);

  const contextValue = React.useMemo(() => {
    const languageCodes = { en: "English", uz: "Uzbek" };
    return {
      languageCodes,
      selectedLanguage,
      setSelectedLanguage,
    };
  }, [selectedLanguage]);

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export const useI18n = () => {
  return useContext(I18nContext);
};

export default I18nProvider;
