import {
  getDatabase,
  ref,
  query,
  orderByChild,
  limitToFirst,
  startAfter,
} from "firebase/database";

const db = getDatabase();
const limit = 3;

export const firstPageQuery = query(
  ref(db, "psychologists"),
  orderByChild("price_per_hour"),
  limitToFirst(limit)
);

export const nextPageQuery = (lastId) =>
  query(
    ref(db, "psychologists"),
    orderByChild("price_per_hour"),
    startAfter(lastId),
    limitToFirst(limit)
  );
