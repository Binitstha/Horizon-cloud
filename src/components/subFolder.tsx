"use client";
import { toast } from "@/lib/use-toast";
import {
  DocumentData,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import app from "../../config/firebaseConfig";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFolder } from "react-icons/fa";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import Link from "next/link";
import Files from "./ui/files";
import SubFiles from "./ui/subFiles";

const SubFolder = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [foldersList, setFoldersList] = useState<DocumentData[]>([]);
  const [filesList, setFilesList] = useState<File[]>([]);

  const searchParams = useSearchParams();

  const parentFolderId = searchParams.get("id");

  const pathname = usePathname().split("/");
  const parentFolderName = pathname[pathname.length - 1];

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(getFirestore(app), "folders"),
      (snapshot) => {
        if (snapshot.empty) {
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
            (folder: DocumentData) => folder.parentFolderId === parentFolderId,
          );
        setFoldersList(foldersData);
      },
      (error) => {
        toast({
          description: "Error while fetching folders:",
          variant: "destructive",
        });
        console.error("Error while fetching folders:", error);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [session, parentFolderId]);

  const handleClick = (id: string, name: string) => {
    router.push(`/folder/${name}?id=${id}`);
  };

  return (
    <main className=" pt-5 p-10">
      <div className=" rounded-md p-5">
        <div className=" flex justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  onClick={() => {
                    router.back();
                  }}
                >
                  <Link href={``}>{parentFolderName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
          <span className=" text-blue-500">View all</span>
        </div>
        <div>
          <section className="flex justify-start items-center">
            <main className="mt-5 justify-start items-start flex flex-col flex-wrap w-full">
              {foldersList ? (
                <>
                  <div>
                    {foldersList.map((folder) => (
                      <div
                        key={folder.id}
                        className="flex  text-lg text-md w-full gap-2 rounded-xl cursor-pointer p-2 justify-start items-center transition-all duration-150"
                        onClick={() => handleClick(folder.id, folder.name)}
                      >
                        <span className="text-2xl">
                          <FaFolder />
                        </span>
                        <div className="text-ellipsis overflow-clip text-nowrap text-center">
                          {folder.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <SubFiles />
                </>
              ) : (
                <div>Folder is empty</div>
              )}
            </main>
          </section>
        </div>
      </div>
    </main>
  );
};

export default SubFolder;
