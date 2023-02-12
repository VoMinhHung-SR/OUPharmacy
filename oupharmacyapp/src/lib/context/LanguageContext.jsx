import { createContext, useContext, useState } from "react";


const LanguageContext = createContext();

const  LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  }

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    return context;
}
export default LanguageProvider;