export const REGEX_EMAIL =
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const currentDate = new Date();

export const SERVER = import.meta.env.VITE_SERVER
// firebase constant
export const FIREBASE_APIKEY = import.meta.env.VITE_APIKEY
export const FIREBASE_AUTHDOMAIN = import.meta.env.VITE_AUTHDOMAIN
export const FIREBASE_DATABASEURL = import.meta.env.VITE_DATABASEURL
export const FIREBASE_PROJECTID = import.meta.env.VITE_PROJECTID
export const FIREBASE_STOREAGEBUCKET = import.meta.env.VITE_STOREAGEBUCKET
export const FIREBASE_MESSAGINGSENDERID = import.meta.env.VITE_MESSAGINGSENDERID
export const FIREBASE_APPID = import.meta.env.VITE_APPID
export const FIREBASE_MEASUREMENTID = import.meta.env.VITE_MEASUREMENTID
