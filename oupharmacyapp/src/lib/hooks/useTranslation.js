import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
const useTranslation = () => {
    const { language } = useLanguage();
    const [translatedStrings, setTranslatedStrings] = useState({});
    useEffect(()=> {
        fetch(`../src/locales/${language}/index.json`).then(res => res.json()).then(data => setTranslatedStrings(data));
    },[language])

    return translatedStrings;
}
export default useTranslation