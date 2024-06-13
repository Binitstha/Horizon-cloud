import { querySnapshot } from "@/lib/actions";
import { getFirestore, DocumentData } from "firebase/firestore";
import { FaFolder } from "react-icons/fa";
import app from "../../../config/firebaseConfig";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "@/lib/use-toast";

const Folders = () => {
  const { data: session } = useSession();
  const [foldersList, setFoldersList] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      if (session?.user?.email) {
        const email = session.user.email;
        try {
          const snapshot = await querySnapshot(
            getFirestore(app),
            "folders",
            email,
          );
          if (snapshot && !snapshot.empty) {
            const foldersData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setFoldersList(foldersData);
          } else {
            toast({
              variant: "destructive",
              description: `No folders found for ${email}`,
            });
          }
        } catch (error) {
          toast({
            description: "Error fetching folders:",
            variant: "destructive",
          });
        }
      } else {
        toast({
          description: "Session is empty or email is not available.",
          variant: "destructive",
        });
      }
    };

    fetchFolders();
  }, [session,foldersList]);

  return (
    <section className="flex justify-start items-center">
      <main className="mt-5 justify-start items-center flex flex-wrap gap-5">
        {foldersList.map((folder) => (
          <div
            key={folder.id}
            className="flex border-2 flex-col h-28 w-44 text-xl rounded-xl cursor-pointer p-2 justify-center items-center gap-3 hover:scale-105 transition-all duration-150"
          >
            <span className="text-5xl">
              <FaFolder />
            </span>
            <div className="text-ellipsis w-32 overflow-clip text-nowrap text-center">
              {folder.name}
            </div>
          </div>
        ))}
      </main>
    </section>
  );
};

export default Folders;
