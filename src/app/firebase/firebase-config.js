// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "@firebase/storage"
// TODO: Add SDKs for Firebase products that you wa nt to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCaCmVSZaDrCOt4WxIhDWxwF7xGae-X2o",
  authDomain: "uploadfile-92b82.firebaseapp.com",
  projectId: "uploadfile-92b82",
  storageBucket: "uploadfile-92b82.appspot.com",
  messagingSenderId: "143182469488",
  appId: "1:143182469488:web:e4a599202c2c5808ab17b5",
  measurementId: "G-1P322B15J8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);