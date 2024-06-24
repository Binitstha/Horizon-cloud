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
  getDoc,
  writeBatch,
} from "firebase/firestore";
import app from "../../config/firebaseConfig";
import { unstable_noStore } from "next/cache";
import { toast } from "./use-toast";
import { File } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

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

export const movetToTrashFile = async (id: string) => {
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
    toast({
      description: "Error while moving file to trash",
      variant: "destructive",
    });
  }
};

export const movetToTrashFolder = async (id: string) => {
  try {
    const folderRef = doc(db, "folders", id);
    await updateDoc(folderRef, { trashFolder: true });

    const fileQuery = query(
      collection(db, "files"),
      where("parentFolderId", "==", id),
    );
    const filesSnapshot = await getDocs(fileQuery);

    filesSnapshot.forEach(async (fileDoc) => {
      await updateDoc(doc(db, "files", fileDoc.id), { trashFile: true });
    });
    toast({ description: "Folder successfully moved to trash." });
  } catch (err) {
    toast({
      description: "Error while moving folder to trash",
      variant: "destructive",
    });
  }
};

const deleteFolderRecursively = async (id: string) => {
  const subfolderQuery = query(
    collection(db, "folders"),
    where("parentFolderId", "==", id),
  );
  const subfolderSnapshot = await getDocs(subfolderQuery);

  const deleteSubfolderPromises = subfolderSnapshot.docs.map(
    async (subfolderDoc) => {
      await deleteFolderRecursively(subfolderDoc.id);
    },
  );

  await Promise.all(deleteSubfolderPromises);

  const fileQuery = query(
    collection(db, "files"),
    where("parentFolderId", "==", id),
  );
  const filesSnapshot = await getDocs(fileQuery);

  const deleteFilePromises = filesSnapshot.docs.map(async (fileDoc) => {
    await deleteDoc(doc(db, "files", fileDoc.id));
  });

  await Promise.all(deleteFilePromises);

  await deleteDoc(doc(db, "folders", id));
};

export const deleteFolder = async (id: string, setFoldersList: Dispatch<SetStateAction<DocumentData[]>>) => {
  try {
    const documentRef = doc(db, "folders", id);
    const folderDoc = await getDoc(documentRef);

    if (!folderDoc.exists()) {
      toast({ description: "Folder does not exist.", variant: "destructive" });
      return;
    }

    const parentFolderId = folderDoc.data().parentFolderId;
    if (parentFolderId) {
      const parentFolderRef = doc(db, "folders", parentFolderId);
      const parentFolderDoc = await getDoc(parentFolderRef);

      if (parentFolderDoc.exists()) {
        toast({
          description:
            "Cannot delete folder as it has a corresponding parent folder.",
          variant: "destructive",
        });
        return;
      }
    }

    await deleteFolderRecursively(id);

    setFoldersList((prevFolders) =>
      prevFolders.filter((folder) => folder.id !== id),
    );
    toast({ description: "Your folder is deleted.", variant: "destructive" });
  } catch (error) {
    console.error("Error while deleting folder:", error);
    toast({
      description: "Error while moving file to trash",
      variant: "destructive",
    });
  }
};

export const restoreFolder = async (id: string) => {
  try {
    const folderRef = doc(db, "folders", id);
    await updateDoc(folderRef, { trashFolder: false });

    toast({ description: "Folder successfully restored." });
  } catch (err) {
    toast({
      description: "Error while restoring folder.",
      variant: "destructive",
    });
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

export const starFolder = async (id: string) => {
  try {
    const fileRef = doc(db, "folders", id);
    await updateDoc(fileRef, { starred: true });
  } catch (err) {
    console.log("errr", err);
  }
};
export const removeStarFolder = async (id: string) => {
  try {
    const fileRef = doc(db, "folders", id);
    await updateDoc(fileRef, { starred: false });
  } catch (err) {
    console.log("errr", err);
  }
};
