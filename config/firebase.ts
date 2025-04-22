import * as admin from "firebase-admin";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK (No need for apiKey, authDomain, etc.)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const db = admin.firestore();  // ✅ Correct Firestore instance

export { db, admin };
