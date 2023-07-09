import React from "react";

const I18nContext = React.createContext();

const I18nProvider = ({ children }) => {
  const languages = React.useMemo(() => ({ en: "English", uz: "Uzbek" }), []);

  const [selectedLanguage, setSelectedLanguage] = React.useState("");

  React.useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    } else {
      setSelectedLanguage(languages.en);
    }
  }, []);

  React.useEffect(() => {
    if (selectedLanguage) {
      localStorage.setItem("language", selectedLanguage);
    }
  }, [selectedLanguage]);

  const contextValue = React.useMemo(() => {
    return {
      languages,
      selectedLanguage,
      setSelectedLanguage,
    };
  }, [selectedLanguage, languages]);

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export const useI18n = () => {
  return React.useContext(I18nContext);
};

export default I18nProvider;
