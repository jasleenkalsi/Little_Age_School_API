import * as admin from 'firebase-admin';
import * as serviceAccount from '../little-age-school-api-firebase-adminsdk-fbsvc-d5521b15d9.json';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// Firestore reference for the database
export const db = admin.firestore();

// Export a function to get the Firestore database instance
export const getDB = () => {
  return db;
};

export { admin };
