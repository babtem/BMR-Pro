
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * INSTRUCTIONS TO LINK YOUR FIREBASE:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a Project.
 * 3. Click the Web icon (</>) to add an app.
 * 4. Copy the 'firebaseConfig' object provided by Firebase.
 * 5. Replace the values below with your actual keys.
 */
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-app-name.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app-name.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);

/**
 * Saves a user's email and their metabolic metrics to the "leads" collection.
 * Make sure you have enabled "Firestore Database" in your Firebase Console.
 */
export const saveLead = async (email: string, metadata: any = {}) => {
  try {
    const docRef = await addDoc(collection(db, "leads"), {
      email,
      ...metadata,
      createdAt: serverTimestamp(),
      source: "bmr-calculator-pro"
    });
    console.log("Lead successfully saved to Firebase with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Firebase Error: Make sure your Firestore rules allow writes.", e);
    throw e;
  }
};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_ZY9Suf5-2vGYkd5ssR-Ssl9GiLfOFmI",
  authDomain: "bmr-d32fe.firebaseapp.com",
  projectId: "bmr-d32fe",
  storageBucket: "bmr-d32fe.firebasestorage.app",
  messagingSenderId: "1077979195954",
  appId: "1:1077979195954:web:d1f43ed15219daaff16a2b",
  measurementId: "G-NG6RWXYRNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);