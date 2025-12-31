import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
// Optional: import other plugins like LanguageDetector or Backend
// import LanguageDetector from 'i18next-browser-languagedetector';

i18n
	// load translation using http -> see /public/locales
	// learn more: https://github.com/i18next/i18next-http-backend
	.use(Backend)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		fallbackLng: "en",
		debug: true,
		load: "languageOnly",
	});

export default i18n;
