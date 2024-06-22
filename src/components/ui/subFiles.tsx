"use client";
import { FaFileAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { File } from "@/types/types";
import fileFetch from "@/lib/fileFetch";
import { useSearchParams } from "next/navigation";
import moment from "moment";

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
                  className="text-ellipsis overflow-clip text-nowrap text-center  max-w-96"
                >
                  {file.name}
                </div>
              </div>
              <div className=" flex gap-5 justify-center items-center">
                <div>
                  {file.lastModified &&
                    moment(file.lastModified).format("MMMM,DD,YYYY")}
                </div>
                <div>{(file.size / 1024 ** 2).toFixed(2) + "MB"}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    </section>
  );
};

export default Files;
