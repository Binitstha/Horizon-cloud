"use client";
import ParentFolderContext, {
  ParentFolderContextType,
} from "@/context/parentFolderContext";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import SubFolders from "@/components/subFolder";
import NotFound from "./notFound";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Access query parameter 'id'

  const { parentFolderId, setParentFolderId } =
    useContext<ParentFolderContextType>(ParentFolderContext);

  useEffect(() => {
    if (id !== null) {
      setParentFolderId(id);
    }

    return () => setParentFolderId(null);
  }, [id, setParentFolderId]);

  if (!parentFolderId) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <>
      <div>
        <SubFolders />
      </div>
    </>
  );
};

export default Page;
