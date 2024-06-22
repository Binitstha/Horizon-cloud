import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  Firestore,
  DocumentData,
  QuerySnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import app from "../../config/firebaseConfig";
import { unstable_noStore } from "next/cache";
import { toast } from "./use-toast";

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

export const deleteFile = async (id: string) => {
  try {
    const documentRef = doc(db, "files", id);
    await deleteDoc(documentRef);

    toast({ description: "Your file is deleted.", variant:'destructive' });
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};
