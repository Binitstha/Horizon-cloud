import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
import { useCallback, useContext, useState } from "react";
import app from "../../../config/firebaseConfig";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import ParentFolderContext, {
  ParentFolderContextType,
} from "@/context/parentFolderContext";

const DialogCloseButton = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const db = getFirestore(app);

  const context = useContext<ParentFolderContextType>(ParentFolderContext);
  const { parentFolderId } = context;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const handleClick = async () => {
    if (!file || !session?.user?.email) {
      toast({
        variant: "destructive",
        description: "Empty file cannot be uploaded or user not authenticated",
      });
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `files/${session.user.email}/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "files"), {
        name: file.name,
        type: file.name.split(".").pop(),
        size: file.size,
        lastModified: file.lastModified,
        createdBy: session.user.email,
        parentFolderId: parentFolderId,
        downloadURL: downloadURL,
      });

      toast({ description: "Your file is uploaded." });
      setFile(null);
    } catch (err) {
      toast({
        description: "Error while uploading file",
        variant: "destructive",
      });
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
            {file && (
              <p className="w-[29rem] overflow-clip text-ellipsis">
                Selected file: {file.name}
              </p>
            )}
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
