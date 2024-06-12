// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8IP9AEtafyvQnkmSCCqJKpBR4ZiFM6CU",
  authDomain: "horizon-cloud-425806.firebaseapp.com",
  projectId: "horizon-cloud-425806",
  storageBucket: "horizon-cloud-425806.appspot.com",
  messagingSenderId: "524345524392",
  appId: "1:524345524392:web:757a316d09a5b41444429d",
  measurementId: "G-Q643492T50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined" && window.document) {
  isSupported()
    .then((supported) => {
      if (supported) {
        const analytics = getAnalytics(app);
      } else {
        console.log("Firebase Analytics is not supported in this environment.");
      }
    })
    .catch((error) => {
      console.error("Error checking Firebase Analytics support:", error);
    });
}

export default app;
