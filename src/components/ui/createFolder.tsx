import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import app from "../../../config/firebaseConfig";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import ParentFolderContext, {
  ParentFolderContextType,
} from "@/context/parentFolderContext";

const DialogCloseButton = () => {
  const { toast } = useToast();
  const [folderName, setFolderName] = useState<string>("");
  const db = getFirestore(app);
  const { data: session } = useSession();
  const context = useContext<ParentFolderContextType>(ParentFolderContext);

  if (!context) {
    throw new Error(
      "ParentFolderContext must be used within a ParentFolderProvider",
    );
  }

  const { parentFolderId, setParentFolderId } = context;

  const handleClick = async () => {
    try {
      if (folderName) {
        const folderRef = await addDoc(collection(db, "folders"), {
          name: folderName,
          createdBy: session?.user?.email,
          parentFolderId: parentFolderId,
        });

        toast({ description: "Your folder is created." });
        console.log("Folder created with ID:", folderRef.id);
        setFolderName("");
      } else {
        toast({
          variant: "destructive",
          description: "Folder name cannot be null",
        });
      }
    } catch (err) {
      toast({ description: "Error while creating folder" });
    }
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
              value={folderName}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="submit" variant="secondary" onClick={handleClick}>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogCloseButton;
