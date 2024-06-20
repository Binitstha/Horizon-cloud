"use client";
import { FaFileAlt } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import app from "../../../config/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { useSession } from "next-auth/react";
import { File } from "@/lib/types";

const Files = () => {
  const [filesList, setFileList] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const unsubscribe = onSnapshot(
      collection(getFirestore(app), "files"),
      (snapshot) => {
        if (snapshot.empty) {
          setIsLoading(false);
          return;
        }

        const filesData: File[] = snapshot.docs
          .map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              }) as File,
          )
          .filter(
            (file: File) =>
              file.createdBy === session.user?.email &&
              file.parentFolderId === null,
          );
        setFileList(filesData);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        toast({
          description: "Error fetching files:",
          variant: "destructive",
        });
        console.error("Error fetching files:", error);
      },
    );

    return () => unsubscribe();
  }, [session]);

  console.log(filesList);

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
                    <div>{file.name}</div>
                  </div>
                </TableCell>
                <TableCell>{file.modifedAt}</TableCell>
                <TableCell>{file.size}</TableCell>
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
