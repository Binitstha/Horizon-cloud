"use client";
import { FaStar } from "react-icons/fa6";
import {
  getFirestore,
  DocumentData,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { FaFolder, FaRegStar } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "@/lib/use-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdDelete } from "react-icons/md";
import {
  movetToTrashFolder,
  removeStarFolder,
  starFolder,
} from "@/lib/actions";
import app from "../../../../config/firebaseConfig";
import { Button } from "@/components/ui/button";

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
              folder.trashFolder == false &&
              folder.starred === true,
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

  const router = useRouter();
  const handleClick = (id: string, name: string) => {
    router.push(`/folder/${name}?id=${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Add a loading state to handle asynchronous fetch
  }

  return (
    <div className=" lg:p-12 p-5 lg:w-auto w-screen">
      <div className="text-xl">Starred folders</div>
      <section className=" flex justify-start items-center">
        <main className="mt-5 justify-start items-center flex flex-wrap gap-4 lg:gap-5">
          {foldersList.length > 0 ? (
            foldersList.map((folder) => (
              <div
                key={folder.id}
                className="flex flex-col gap-2 border-2 lg:h-32 lg:w-44 text-xl rounded-xl cursor-pointer p-2 justify-center items-center hover:scale-105 transition-all duration-150"
            >
                <div
                  className="flex flex-col justify-center items-center"
                  onClick={() => handleClick(folder.id, folder.name)}
                >
                  <span className="lg:text-5xl text-4xl">
                    <FaFolder />
                  </span>
                  <div className="text-ellipsis lg:text-base text-sm lg:w-32 w-20 overflow-clip text-nowrap text-center">
                    {folder.name}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-10 w-full">
                  <div className="flex justify-center items-center">
                    <Dialog>
                      <DialogTrigger>
                        <div className="flex justify-center items-center cursor-pointer text-2xl">
                          <MdDelete />
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This will move the file {folder.name} to the trash.
                            You can still recover it later.
                          </DialogDescription>
                        </DialogHeader>
                        <Button
                          type="submit"
                          size="sm"
                          className="px-3"
                          onClick={() => movetToTrashFolder(folder.id)}
                        >
                          <span>Move to trash</span>
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div>
                    {folder.starred ? (
                      <div onClick={() => removeStarFolder(folder.id)}>
                        <FaStar />
                      </div>
                    ) : (
                      <div onClick={() => starFolder(folder.id)}>
                        <FaRegStar />
                      </div>
                    )}
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
