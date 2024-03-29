import { getApps, initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

if (getApps().length === 0) {
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
  });
  initializeFirestore(getApps()[0], {
    ignoreUndefinedProperties: true,
  });
}
