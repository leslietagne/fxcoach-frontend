import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return sessionStorage.getItem('fxcoach_lang') || 'EN';
  });

  const changeLang = (newLang) => {
    setLang(newLang);
    sessionStorage.setItem('fxcoach_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);