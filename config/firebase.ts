import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config(); // 👈 This loads the .env or .env.test values

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

console.log('PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);
console.log('PRIVATE_KEY START:', process.env.FIREBASE_PRIVATE_KEY?.slice(0, 30));

// ✅ Add this line to fix the error
export const db = admin.firestore();

// Optional: if you're using admin elsewhere too
export { admin };
