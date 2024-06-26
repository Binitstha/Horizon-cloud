"use client";
import { FaStar } from "react-icons/fa6";
import {
  getFirestore,
  DocumentData,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { FaFolder, FaRegStar } from "react-icons/fa";
import app from "../../../config/firebaseConfig";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "@/lib/use-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { MdDelete } from "react-icons/md";
import { Button } from "./button";
import {
  movetToTrashFolder,
  removeStarFolder,
  starFolder,
} from "@/lib/actions";
import { FoldersSkeleton } from "../skeleton/skeletons";

const Folders = ({ viewAll }: { viewAll: boolean }) => {
  const { data: session } = useSession();
  const [foldersList, setFoldersList] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const limit = viewAll ? true : false;
    const unsubscribe = onSnapshot(
      collection(getFirestore(app), "folders"),
      (snapshot) => {
        setLoading(false);
        if (snapshot.empty) {
          toast({
            variant: "destructive",
            description: `No folders found for ${session?.user?.email}`,
          });
          return;
        }

        let foldersData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (folder: DocumentData) =>
              folder.createdBy == session.user?.email &&
              folder.trashFolder == false &&
              folder.parentFolderId === null,
          );
        if (foldersData.length > 0) {
          if (limit) {
            foldersData = foldersData.slice(0, 10);
          }
          setFoldersList(foldersData);
        } else {
          setFoldersList([]);
        }
      },
      (error) => {
        setLoading(false);
        toast({
          description: "Error fetching folders:",
          variant: "destructive",
        });
        console.error("Error fetching folders:", error);
      },
    );

    return () => unsubscribe();
  }, [session, viewAll]);

  const router = useRouter();
  const handleClick = (id: string, name: string) => {
    router.push(`/folder/${name}?id=${id}`);
  };

  if (loading) {
    return <FoldersSkeleton />;
  }

  return (
    <section className="flex justify-start items-center">
      <main className="mt-5 justify-start items-center flex flex-wrap gap-5">
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
                      <div className="flex justify-center items-center cursor-pointer lg:text-2xl">
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
                <div className="lg:text-2xl text-lg">
                  {folder.starred ? (
                    <div onClick={() => removeStarFolder(folder.id)}>
                      <FaStar className="" />
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
  );
};

export default Folders;
