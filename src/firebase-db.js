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

const API_KEY = 'AIzaSyCdUj8puEDK2rJrF4bWiuZ5z9Jkc-y0SLc';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'psychologists-services-2e99e.firebaseapp.com',
  databaseURL:
    'https://psychologists-services-2e99e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'psychologists-services-2e99e',
  storageBucket: 'psychologists-services-2e99e.appspot.com',
  messagingSenderId: '275061905720',
  appId: '1:275061905720:web:7a8756677ea0eff05409cd',
  measurementId: 'G-N2Q50N158Z',
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
