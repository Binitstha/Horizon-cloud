import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/lib/use-toast";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCallback, useContext, useState } from "react";
import app from "../../../config/firebaseConfig";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { toast } from "@/lib/use-toast";
import ParentFolderContext, { ParentFolderContextType } from "@/context/parentFolderContext";

const DialogCloseButton = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      console.log("file", acceptedFiles);
    }
  }, []);

  const { toast } = useToast();
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const db = getFirestore(app)
  
  const context = useContext<ParentFolderContextType>(ParentFolderContext);
  const { parentFolderId, setParentFolderId } = context;


  const handleClick = async () => {
    try {
      if (file) {
        const fileRef = await addDoc(collection(db, "file"), {
          name: file.name,
          type: file.name.split('.')[file.name.split('.').length-1],
          size: file.size,
          modifedAt : file.lastModified,
          createdBy: session?.user?.email,
          parentFolderId: parentFolderId,
        });

        toast({ description: "Your file is uploaded." });
        console.log("Folder created with ID:", fileRef.id);
        setFile(null)
      } else {
        toast({
          variant: "destructive",
          description: "empty file cannot be uploaded",
        });
      }
    } catch (err) {
      console.log(err)
      toast({ description: "Error while uploading file" });
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <>
      <DialogContent className="sm:max-w-md rounded-md">
        <DialogHeader>
          <DialogTitle>Create file</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 text-black">
          <div className="grid flex-1 gap-2">
            <div
              {...getRootProps()}
              className={`border-dashed border-2 p-4 h-[15rem] flex justify-center items-center ${
                isDragActive ? "border-blue-600" : "border-blue-300"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <p>Drag & drop some files here, or click to select files</p>
              )}
            </div>
            {file && <p className="w-[29rem] overflow-clip text-ellipsis">Selected file: {file.name}</p>}
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
