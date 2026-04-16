import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('fxcoach_lang') || 'EN';
    } catch {
      return 'EN';
    }
  });

  const changeLang = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('fxcoach_lang', newLang);
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);