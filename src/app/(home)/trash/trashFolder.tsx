"use client";
import {
  getFirestore,
  DocumentData,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { FaFolder, FaTrashRestore } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "@/lib/use-toast";
import { useRouter } from "next/navigation";
import { deleteFolder, movetToTrashFolder, restoreFolder } from "@/lib/actions";
import app from "../../../../config/firebaseConfig";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";

const Folders = () => {
  const { data: session } = useSession();
  const [foldersList, setFoldersList] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const unsubscribe = onSnapshot(
      collection(getFirestore(app), "folders"),
      (snapshot) => {
        if (snapshot.empty) {
          setIsLoading(false);
          toast({
            variant: "destructive",
            description: `No folders found for ${session?.user?.email}`,
          });
          return;
        }

        const foldersData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (folder: DocumentData) =>
              folder.createdBy == session.user?.email &&
              folder.trashFolder == true,
          );
        if (foldersData.length > 0) {
          setFoldersList(foldersData);
        } else {
          setFoldersList([]);
        }
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        toast({
          description: "Error fetching folders:",
          variant: "destructive",
        });
        console.error("Error fetching folders:", error);
      },
    );
    return () => unsubscribe();
  }, [session]);

  if (isLoading) {
    return <div>Loading...</div>; // Add a loading state to handle asynchronous fetch
  }

  return (
    <div className="m-10">
      <div className="text-xl">Folders</div>
      <section className="flex justify-start items-center">
        <main className="mt-5 justify-start items-center flex flex-wrap gap-5">
          {foldersList.length > 0 ? (
            foldersList.map((folder) => (
              <div
                key={folder.id}
                className="flex flex-col border-2 h-28 w-44 text-xl rounded-xl cursor-pointer p-2 justify-center items-center hover:scale-105 transition-all duration-150"
              >
                <div className="flex flex-col justify-center items-center">
                  <span className="text-5xl">
                    <FaFolder />
                  </span>
                  <div className="text-ellipsis w-32 overflow-clip text-nowrap text-center">
                    {folder.name}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-10 w-full">
                  <div className="flex justify-center items-center">
                    <Dialog>
                      <DialogTrigger>
                        <div className=" hover:scale-125 flex justify-center items-center cursor-pointer text-xl">
                          <FaTrashRestore />
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This will restore the folder {folder.name} from
                            trash.
                          </DialogDescription>
                        </DialogHeader>
                        <Button
                          type="submit"
                          size="sm"
                          className="px-3"
                          onClick={() => restoreFolder(folder.id)}
                        >
                          <span>Restore</span>
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex justify-center items-center">
                    <Dialog>
                      <DialogTrigger>
                        <div className=" hover:scale-125 flex justify-center items-center cursor-pointer text-xl">
                          <MdDelete />
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This will delete the folder {folder.name}{" "}
                            permanently from trash.
                          </DialogDescription>
                        </DialogHeader>
                        <Button
                          type="submit"
                          size="sm"
                          className="px-3 bg-red-600"
                          onClick={() =>
                            deleteFolder(folder.id, setFoldersList)
                          }
                        >
                          <span className="">Delete</span>
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Folder is empty</div>
          )}
        </main>
      </section>
    </div>
  );
};

export default Folders;
