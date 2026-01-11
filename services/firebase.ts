
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Firebase configuration using the project keys provided.
 */
const firebaseConfig = {
  apiKey: "AIzaSyD_ZY9Suf5-2vGYkd5ssR-Ssl9GiLfOFmI",
  authDomain: "bmr-d32fe.firebaseapp.com",
  projectId: "bmr-d32fe",
  storageBucket: "bmr-d32fe.firebasestorage.app",
  messagingSenderId: "1077979195954",
  appId: "1:1077979195954:web:d1f43ed15219daaff16a2b",
  measurementId: "G-NG6RWXYRNW"
};

// Initialize Firebase using the modular v9 SDK pattern.
// Ensure imports from "firebase/app" are correctly resolved by the environment.
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);

/**
 * Saves a user's email and their metabolic metrics to the "leads" collection.
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
