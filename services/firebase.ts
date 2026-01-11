import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import { UserData } from "../types";

/**
 * Your web app's Firebase configuration
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

// Initialize Firebase using the compat layer to resolve "no exported member 'initializeApp'"
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore using the compat layer
export const db = firebase.firestore();

// Initialize Analytics using the compat layer's isSupported check to resolve "no exported member 'getAnalytics' and 'isSupported'"
firebase.analytics.isSupported().then(supported => {
  if (supported) {
    firebase.analytics();
  }
}).catch(err => console.debug("Analytics not supported in this environment:", err));

/**
 * Saves a user's lead information from their UserData state.
 * Only proceeds if an email is present in the provided state.
 */
export const saveLead = async (userData: UserData) => {
  const { email } = userData;

  // Ensure this is done only if an email is present
  if (!email) {
    console.debug("Skipping lead save: No email found in user data.");
    return;
  }

  try {
    // Using compat style collection and add methods
    const docRef = await db.collection("leads").add({
      email,
      metrics: {
        age: userData.age,
        gender: userData.gender,
        weight: userData.weight,
        height: userData.height,
        activity: userData.activityLevel,
        units: userData.unitSystem
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      source: "bmr-calculator-pro"
    });
    console.log("Lead successfully saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Firebase Error while saving lead:", e);
    throw e;
  }
};