"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import app from "../../../config/firebaseConfig";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";

const DialogCloseButton = () => {
  const [folderName, setFolderName] = useState<string>("");
  const db = getFirestore(app);

  const {data:session} = useSession()
  const docId = Date.now().toString()
  const handleClick = async () => {
    await setDoc(doc(db, "folders", docId), {
      id: docId,
      name: folderName,
      createdBy: session?.user?.email
    });
    console.log(folderName);
  };

  return (
    <>
      <DialogContent className="sm:max-w-md rounded-md">
        <DialogHeader>
          <DialogTitle>Create folder</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="text"
              className="outline-blue-300 text-black"
              placeholder="Folder name"
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="submit"
              variant="secondary"
              onClick={() => handleClick()}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogCloseButton