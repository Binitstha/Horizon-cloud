"use client";
import { FaFileAlt } from "react-icons/fa";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { File } from "@/types/types";
import fileFetch from "@/lib/fileFetch";
import { useSearchParams } from "next/navigation";

const Files = () => {
  const [filesList, setFileList] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const searchParams = useSearchParams()
  // const parentFolderId = searchParams.get("id");

  useEffect(() => {
    if (!session) return;

    const unsubscribe = fileFetch(session, setFileList, setIsLoading,null);

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
                <TableCell>{file.lastModified}</TableCell>
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
