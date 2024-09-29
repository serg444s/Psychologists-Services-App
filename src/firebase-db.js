import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getDatabase,
  ref,
  query,
  limitToFirst,
  startAfter,
  orderByChild,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATA_BASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();
export const auth = getAuth(app);
const limit = 3;

export const firstPageQuery = query(
  ref(db, 'psychologists'),
  orderByChild('psychologId'),
  limitToFirst(limit)
);

export function nextPageQuery(lastItem) {
  console.log('lastKey', lastItem);
  return query(
    ref(db, 'psychologists'),
    orderByChild('psychologId'),
    startAfter(lastItem),
    limitToFirst(limit)
  );
}
