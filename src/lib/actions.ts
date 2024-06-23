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
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import app from "../../config/firebaseConfig";
import { unstable_noStore } from "next/cache";
import { toast } from "./use-toast";
import { File } from "@/types/types";

const db: Firestore = getFirestore(app);

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

export const movetToTrash = async (id: string) => {
  console.log("HEllllllo");
  try {
    const fileRef = doc(db, "files", id);
    await updateDoc(fileRef, { trashFile: true });

    toast({ description: "File successfully moved to trash." });
    console.log("Successfull");
  } catch (err) {
    console.log("errr", err);
  }
};

export const deleteFile = async (id: string) => {
  try {
    const documentRef = doc(db, "files", id);
    await deleteDoc(documentRef);

    toast({ description: "Your file is deleted.", variant: "destructive" });
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};

export const restoreFile = async (id: string) => {
  try {
    const fileRef = doc(db, "files", id);
    await updateDoc(fileRef, { trashFile: false });

    toast({ description: "File successfully moved to trash." });
    console.log("Successfull");
  } catch (err) {
    console.log("errr", err);
  }
};

export const trashFiles = async (
  session: any,
  setFileList: (files: File[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  parentFolderId: string | null,
) => {
  unstable_noStore();
  try {
    setIsLoading(true);
    setFileList([]);
    return onSnapshot(
      collection(getFirestore(app), "files"),
      (snapshot) => {
        const filesData: File[] = snapshot.docs
          .map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              }) as File,
          )
          .filter(
            (file: File) =>
              file.createdBy === session.user?.email && file.trashFile == true,
          )
          .sort((a, b) => {
            const dateA = a.lastModified
              ? new Date(a.lastModified).getTime()
              : 0;
            const dateB = b.lastModified
              ? new Date(b.lastModified).getTime()
              : 0;
            return dateA - dateB;
          });

        setFileList(filesData);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching files:", error);
        toast({
          description: "Error fetching files:",
          variant: "destructive",
        });
        setIsLoading(false);
      },
    );
  } catch (err) {
    console.log(err);
  }
};
