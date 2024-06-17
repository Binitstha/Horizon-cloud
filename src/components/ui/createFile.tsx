import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/use-toast";
import {
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

const DialogCloseButton = () => {
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string>("");
  const { data: session } = useSession();

  const handleClick = async () => {
    console.log("Hello");
  };

  return (
    <>
      <DialogContent className="sm:max-w-md rounded-md">
        <DialogHeader>
          <DialogTitle>Create file</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="file"
              className="outline-blue-300 text-black"
              placeholder="file name"
              onChange={(e) => setFileName(e.target.value)}
              value={fileName}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="submit" variant="secondary" onClick={handleClick}>
              Upload
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogCloseButton;
