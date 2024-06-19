"use client";
import {
  getFirestore,
  DocumentData,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { FaFolder } from "react-icons/fa";
import app from "../../../config/firebaseConfig";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "@/lib/use-toast";
import { useRouter } from "next/navigation";

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
          .filter((folder: DocumentData) => ( folder.createdBy == session.user?.email && folder.parentFolderId === null));
        if (foldersData.length > 0) {
          setFoldersList(foldersData);
        } else {
          setFoldersList([]);
        }
        console.log(foldersData);
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
    <section className="flex justify-start items-center">
      <main className="mt-5 justify-start items-center flex flex-wrap gap-5">
        {foldersList.length > 0 ? (
          foldersList.map((folder) => (
            <div
              key={folder.id}
              className="flex border-2 flex-col h-28 w-44 text-xl rounded-xl cursor-pointer p-2 justify-center items-center gap-3 hover:scale-105 transition-all duration-150"
              onClick={() => handleClick(folder.id, folder.name)}
            >
              <span className="text-5xl">
                <FaFolder />
              </span>
              <div className="text-ellipsis w-32 overflow-clip text-nowrap text-center">
                {folder.name}
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
