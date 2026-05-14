import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Use the database ID from config for Firestore
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
export const auth = getAuth(app);

/**
 * Interface for detailed Firestore error information
 */
export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: any[];
  }
}

/**
 * Standardized Firestore error handler
 */
export function handleFirestoreError(error: any, operationType: FirestoreErrorInfo['operationType'], path: string | null = null): never {
  if (error.code === 'permission-denied') {
    const errorInfo: FirestoreErrorInfo = {
      error: error.message,
      operationType,
      path,
      authInfo: {
        userId: auth.currentUser?.uid || null,
        email: auth.currentUser?.email || null,
        emailVerified: auth.currentUser?.emailVerified || false,
        isAnonymous: auth.currentUser?.isAnonymous || false,
        providerInfo: auth.currentUser?.providerData || []
      }
    };
    throw new Error(JSON.stringify(errorInfo));
  }
  throw error;
}

/**
 * Validate connection on boot
 */
async function testConnection() {
  try {
    // Testing connection to a non-existent doc to check for offline/config issues
    await getDocFromServer(doc(db, 'system', 'connection-test'));
    console.log('Firebase connection validated.');
  } catch (error: any) {
    if (error.message?.includes('the client is offline')) {
      console.error("Firebase is offline. Please check your network or configuration.");
    } else if (error.code !== 'permission-denied') {
      // Permission denied is expected for this test path, other errors are not.
      console.warn("Firebase connection test warning:", error.message);
    }
  }
}

testConnection();
