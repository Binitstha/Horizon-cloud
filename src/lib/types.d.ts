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
