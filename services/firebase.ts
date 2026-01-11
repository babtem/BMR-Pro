
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// TODO: Replace with your actual Firebase project configuration
// You can find this in your Firebase Console -> Project Settings
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveLead = async (email: string, metadata: any = {}) => {
  try {
    const docRef = await addDoc(collection(db, "leads"), {
      email,
      ...metadata,
      createdAt: serverTimestamp(),
      source: "bmr-calculator-pro"
    });
    console.log("Lead saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
