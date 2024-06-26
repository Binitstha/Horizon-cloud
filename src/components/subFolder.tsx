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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";
import { movetToTrashFolder } from "@/lib/actions";
import { SubFolderSkeleton } from "./skeleton/skeletons";

const SubFolder = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [foldersList, setFoldersList] = useState<DocumentData[]>([]);
  const [filesList, setFilesList] = useState<File[]>([]);

  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const parentFolderId = searchParams.get("id");

  const pathname = usePathname().split("/");
  const parentFolderName = pathname[pathname.length - 1];

  useEffect(() => {
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

        const foldersData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (folder: DocumentData) =>
              folder.parentFolderId === parentFolderId &&
              folder.trashFolder == false,
          );
        setFoldersList(foldersData);
      },
      (error) => {
        setLoading(false);

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

  if (loading) {
    return <SubFolderSkeleton />;
  }

  return (
    <main className=" pt-5 p-10 w-full">
      <div className=" rounded-md p-5 w-full">
        <div className=" flex justify-between lg:w-auto w-80">
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
        <div className="w-full">
          <section className="flex justify-start items-center lg:w-full w-80">
            <main className="mt-5 justify-start items-start flex flex-col flex-wrap w-full">
              {foldersList ? (
                <>
                  <div className="w-full">
                    {foldersList.map((folder) => (
                      <div
                        key={folder.id}
                        className="flex text-lg text-md w-full cursor-pointer p-2 justify-between items-center transition-all duration-150"
                      >
                        <div
                          className=" flex justify-start gap-2 items-center w-full"
                          onClick={() => handleClick(folder.id, folder.name)}
                        >
                          <span className="text-2xl">
                            <FaFolder />
                          </span>
                          <div className="text-ellipsis overflow-hidden text-nowrap text-start lg:w-[25rem] w-48 whitespace-nowrap">
                            {folder.name}
                          </div>
                        </div>
                        <div className="flex justify-end items-center gap-10 w-full">
                          <div className="flex justify-center items-center">
                            <Dialog>
                              <DialogTrigger>
                                <div className=" hover:scale-125 flex justify-center items-center cursor-pointer text-xl">
                                  <MdDelete />
                                </div>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Are you absolutely sure?
                                  </DialogTitle>
                                  <DialogDescription>
                                    This will move the file {folder.name} to the
                                    trash. You can still recover it later.
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
