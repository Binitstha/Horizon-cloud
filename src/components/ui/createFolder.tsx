import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/use-toast";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import app from "../../../config/firebaseConfig";
import { getFirestore, setDoc, doc, addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";

const DialogCloseButton = () => {
  const { toast } = useToast();
  const [folderName, setFolderName] = useState<string>("");
  const db = getFirestore(app);
  const { data: session } = useSession();

  const handleClick = async () => {
    try {
      if (folderName) {
        // Use addDoc for auto-generated IDs (recommended)
        const folderRef = await addDoc(collection(db, "folders"), {
          name: folderName,
          createdBy: session?.user?.email,
        });

        toast({ description: "Your folder is created.", });
        console.log("Folder created with ID:", folderRef.id);
        // Clear the input field after successful creation
        setFolderName("");
      } else {
        toast({ variant: "destructive", description: "Folder name cannot be null", });
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
              value={folderName} // Clear input field after creation
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
