import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('fxcoach_lang') || 'EN';
  });

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('fxcoach_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);