"use client";
import ParentFolderContext, {
  ParentFolderContextType,
} from "@/context/parentFolderContext";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

const Page = ({ params }: { params: { folder: string } }) => {
  const searchParams = useSearchParams();
  const name = params.folder; // Access dynamic route parameter
  const id = searchParams.get("id"); // Access query parameter 'id'

  const { parentFolderId, setParentFolderId } =
    useContext<ParentFolderContextType>(ParentFolderContext);

  useEffect(() => {
    if (id !== null) {
      setParentFolderId(id);
    }
  }, [id, setParentFolderId]);

  if (!parentFolderId) {
    return <div>loading....</div>;
  }
  return (
    <>
      <div>
        Hello, this is dynamic routing!
        <p>{name}</p>
        <p>{id}</p>
      </div>
    </>
  );
};

export default Page;
