import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Initialize Firebase with your configuration
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export { firestore, useCollectionData };
