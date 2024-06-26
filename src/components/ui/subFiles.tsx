"use client";
import { FaFileAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { File } from "@/types/types";
import { fileFetch } from "@/lib/fileFetch";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { deleteFile } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";

const Files = () => {
  const [filesList, setFileList] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const parentFolderId = searchParams.get("id");
  useEffect(() => {
    if (!session) return;
    const trashFile = false;
    const limit = false;
    const unsubscribe = fileFetch(
      session,
      setFileList,
      setIsLoading,
      parentFolderId,
      trashFile,
      limit,
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [session, parentFolderId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClick = (URL: string, file: File) => {
    window.open(URL, "_blank");
    console.log(file);
  };

  return (
    <section className="w-full">
      <>
        <div>
          {filesList.map((file) => (
            <div
              key={file.id}
              className="flex justify-between text-lg text-md w-full gap-2 rounded-xl cursor-pointer p-2 items-center transition-all duration-150"
            >
              <div className="flex justify-center items-center gap-2 ">
                <span className="text-2xl">
                  <FaFileAlt />
                </span>
                <div
                  onClick={() => handleClick(file.downloadURL, file)}
                  className="text-ellipsis overflow-clip text-nowrap text-center lg:w-96 w-36"
                >
                  {file.name}
                </div>
              </div>
              <div className=" flex gap-5 justify-center items-center">
                <div className="lg:inline hidden">
                  {file.lastModified &&
                    moment(file.lastModified).format("MMMM,DD,YYYY")}
                </div>
                <div>{(file.size / 1024 ** 2).toFixed(2) + "MB"}</div>
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
                        This action cannot be undone. This will temporaryly
                        delete your file from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      type="submit"
                      size="sm"
                      className="px-3"
                      onClick={() => deleteFile(file.id)}
                    >
                      <span>Move to trash</span>
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </>
    </section>
  );
};

export default Files;
