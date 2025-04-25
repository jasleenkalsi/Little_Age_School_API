import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

let db: FirebaseFirestore.Firestore | undefined;

if (!admin.apps.length) {
  try {
    const serviceAccountPath = path.join(__dirname, './little-age-school-api-firebase-adminsdk-fbsvc-d5521b15d9.json');
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    db = admin.firestore();
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
}

export function getDB(): FirebaseFirestore.Firestore {
  if (!db) throw new Error('❌ Firestore is not initialized');
  return db;
}
