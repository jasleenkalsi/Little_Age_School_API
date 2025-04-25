import * as admin from 'firebase-admin';
import * as serviceAccount from '../little-age-school-api-firebase-adminsdk-fbsvc-d5521b15d9.json';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
const firebaseConfig = {
  apiKey: "AIzaSyBNIQ_BcPrz6kj9wp2SWs1AYPGvpFMKmEM",
  authDomain: "little-age-school-api.firebaseapp.com",
  projectId: "little-age-school-api",
  storageBucket: "little-age-school-api.firebasestorage.app",
  messagingSenderId: "10588981514",
  appId: "1:10588981514:web:f670506783cc31703ed2f3",
  measurementId: "G-PT2EQ2YN5E"
};

export const generateMockToken = async (uid: string) => {
  try {
    // Generate a mock token for the user with the provided UID
    const customToken = await admin.auth().createCustomToken(uid);
    return customToken;
  } catch (error) {
    throw new Error('Error generating mock token: ' + error.message);
  }
};
// Firestore reference for the database
export const db = admin.firestore();

// Export a function to get the Firestore database instance
export const getDB = () => {
  return db;
};


export { admin };
