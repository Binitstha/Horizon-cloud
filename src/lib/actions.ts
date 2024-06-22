import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  Firestore,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import app from "../../config/firebaseConfig";
import { unstable_noStore } from "next/cache";

const db = getFirestore(app);

export const querySnapshot = async (
  database: Firestore,
  collectionName: string,
  email: string,
): Promise<QuerySnapshot<DocumentData> | undefined> => {
  unstable_noStore();
  try {
    const q = query(
      collection(database, collectionName),
      where("createdBy", "==", email),
    );
    const snapshot = await getDocs(q);
    return snapshot;
  } catch (err) {
    console.error("Error fetching document:", err);
  }
};

export const deleteFile = () => {
  
}
