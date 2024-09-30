import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { config } from './config';
import {
  getDatabase,
  ref,
  query,
  limitToFirst,
  startAfter,
  orderByChild,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId,
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
  return query(
    ref(db, 'psychologists'),
    orderByChild('psychologId'),
    startAfter(lastItem),
    limitToFirst(limit)
  );
}
