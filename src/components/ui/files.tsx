"use client";
import { FaFileAlt } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { File } from "@/types/types";
import fileFetch from "@/lib/fileFetch";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { deleteFile } from "@/lib/actions";

const Files = () => {
  const [filesList, setFileList] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  // const parentFolderId = searchParams.get("id");

  useEffect(() => {
    if (!session) return;

    const unsubscribe = fileFetch(session, setFileList, setIsLoading, null);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [session]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleClick = (URL: string) => {
    window.open(URL, "_blank");
  };

  return (
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
                    <div
                      className="cursor-pointer"
                      onClick={() => handleClick(file.downloadURL)}
                    >
                      {file.name}
                    </div>
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
                          This action cannot be undone. This will permanently
                          delete your file from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <Button
                        type="submit"
                        size="sm"
                        className="px-3"
                        onClick={()=>deleteFile(file.id)}
                      >
                        <span>Move to trash</span>
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
  );
};

export default Files;
