import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import app from "../../config/firebaseConfig";
import { File } from "../types/types";
import { toast } from "./use-toast";

export const fileFetch = (
  session: any,
  setFileList: (files: File[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  parentFolderId: string | null,
  trashFile: boolean,
  limit: boolean
) => {
  setIsLoading(true);
  setFileList([]);
  return onSnapshot(
    collection(getFirestore(app), "files"),
    (snapshot) => {
      let filesData: File[] = snapshot.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as File,
        )
        .filter(
          (file: File) =>
            file.createdBy === session.user?.email &&
            file.trashFile === trashFile &&
            (parentFolderId ? file.parentFolderId === parentFolderId : true),
        )
        .sort((a, b) => {
          const dateA = a.lastModified ? new Date(a.lastModified).getTime() : 0;
          const dateB = b.lastModified ? new Date(b.lastModified).getTime() : 0;
          return dateA - dateB;
        });

      if (limit) {
        filesData = filesData.slice(0, 5); // Apply limit to 5 files
      }

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
};
