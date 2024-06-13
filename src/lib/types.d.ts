import { Firestore } from "firebase/firestore";

export type QuerySnapshot = {
  database: Firestore;
  folderName: string;
};
