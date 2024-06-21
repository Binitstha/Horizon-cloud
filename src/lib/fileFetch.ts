import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import app from "../../config/firebaseConfig";
import { File } from "../types/types";
import { toast } from "./use-toast";

const fileFetch = (
  session: any,
  setFileList: (files: File[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  parentFolderId: string | null,
) => {
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
            file.createdBy === session.user?.email &&
            (parentFolderId ? file.parentFolderId === parentFolderId : true),
        )
        .sort((a, b) => {
          const dateA = a.lastModified ? new Date(a.lastModified).getTime() : 0;
          const dateB = b.lastModified ? new Date(b.lastModified).getTime() : 0;
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
};

export default fileFetch;
