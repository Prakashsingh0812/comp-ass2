import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';
import path from 'path';


// Initialize Firebase Admin SDK with service account credentials
if (!getApps().length) {
  // Correct the path to the service account file using `path.resolve` to ensure compatibility across platforms
  const serviceAccountPath = path.resolve(__dirname, '../../config/firebase-service-account.json');

  // Initialize Firebase app with the credentials
  initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

const db = getFirestore();
const auth = getAuth();

export { db, auth };
