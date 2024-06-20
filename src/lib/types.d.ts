import { Firestore } from "firebase/firestore";

export type QuerySnapshot = {
  database: Firestore;
  folderName: string;
};

export type folder = {
  id: string;
  name: string;
  createdBy: string;
};

export type File = {
  createdBy: string;
  id: string;
  name: string;
  modifedAt: number;
  size: number;
  parentFolderId: string | null;
  type: string;
};
