import TrashFiles from "./trashFiles";
import TrashFolders from "./trashFolder";

const Page = () => {
  return (
    <>
      <div className=" lg:p-10 lg:w-auto w-screen">
        <TrashFolders />
        <TrashFiles />
      </div>
    </>
  );
};

export default Page;
