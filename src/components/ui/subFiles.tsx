"use client";
import { FaFileAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { File } from "@/types/types";
import fileFetch from "@/lib/fileFetch";
import { useSearchParams } from "next/navigation";

const Files = () => {
  const [filesList, setFileList] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const parentFolderId = searchParams.get("id");
  useEffect(() => {
    if (!session) return;

    const unsubscribe = fileFetch(
      session,
      setFileList,
      setIsLoading,
      parentFolderId,
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

  const handleClick = (id: string, name: string) => {
    console.log("heeellllllo this is file");
  };

  return (
    <section className="">
      <>
        <div>
          {filesList.map((file) => (
            <div
              key={file.id}
              className="flex text-lg text-md w-full gap-2 rounded-xl cursor-pointer p-2 justify-start items-center transition-all duration-150"
              onClick={() => handleClick(file.id, file.name)}
            >
              <span className="text-2xl">
                <FaFileAlt />
              </span>
              <div className="text-ellipsis overflow-clip text-nowrap text-center">
                {file.name}
              </div>
            </div>
          ))}
        </div>
      </>
    </section>
  );
};

export default Files;
