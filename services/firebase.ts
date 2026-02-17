import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Robust environment variable detection
const getEnv = (key: string): string => {
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    // @ts-ignore
    return import.meta.env[key];
  }
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    // @ts-ignore
    return process.env[key];
  }
  return '';
};

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_APIKEY'),
  authDomain: getEnv('VITE_FIREBASE_AUTHDOMAIN'),
  projectId: getEnv('VITE_FIREBASE_PROJECTID'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGEBUCKET'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGINGSENDERID'),
  appId: getEnv('VITE_FIREBASE_APPID')
};

// Singleton initialization pattern to avoid "Firebase App already exists" and version conflicts
let app: FirebaseApp;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.error("Error initializing Firebase App:", error);
  // Fallback or re-throw if critical
  throw error;
}

export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
export const storage: FirebaseStorage = getStorage(app);

console.log('DEX Firebase Engine Initialized:', firebaseConfig.projectId);
