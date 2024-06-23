"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaTrashRestore } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fileFetch } from "@/lib/fileFetch";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { File } from "@/types/types";
import { deleteFile, restoreFile } from "@/lib/actions";

const Trash = () => {
  const [filesList, setFileList] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    const trashFile = true;

    const unsubscribe = fileFetch(
      session,
      setFileList,
      setIsLoading,
      null,
      trashFile,
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [session]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className=" m-10">
        <div className="text-xl">Files</div>
        <section className="">
          <Table>
            <TableHeader>
              <TableRow className="flex">
                <TableHead>Name</TableHead>
                <TableHead>Modified date</TableHead>
                <TableHead>Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filesList.length > 0 ? (
                filesList.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="flex gap-3 justify-start items-center">
                        <FaFileAlt />
                        <div className="cursor-pointer">{file.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {file.lastModified &&
                        moment(file.lastModified).format("MMMM,DD,YYYY")}
                    </TableCell>
                    <TableCell>
                      {(file.size / 1024 ** 2).toFixed(2) + "MB"}
                    </TableCell>
                    <TableCell>
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
                              This action cannot be undone. This will
                              permanently delete your file from our servers.
                            </DialogDescription>
                          </DialogHeader>
                          <Button
                            type="submit"
                            size="sm"
                            className="px-3"
                            onClick={() => deleteFile(file.id)}
                          >
                            <span>Delete</span>
                          </Button>
                        </DialogContent>
                      </Dialog>
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
                              This action will restore your file from trash.
                            </DialogDescription>
                          </DialogHeader>
                          <Button
                            type="submit"
                            size="sm"
                            className="px-3"
                            onClick={() => restoreFile(file.id)}
                          >
                            <span>Restore</span>
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No files found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      </div>
    </>
  );
};

export default Trash;
