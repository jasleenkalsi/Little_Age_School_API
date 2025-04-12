import admin from 'firebase-admin';
import * as serviceAccount from '../little-age-school-api-firebase-adminsdk-fbsvc-4e300966db.json';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// Export both admin and Firestore database
export const db = admin.firestore();
export { admin };
