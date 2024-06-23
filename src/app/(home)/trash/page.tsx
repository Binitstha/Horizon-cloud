import TrashFiles from "./trashFiles";
import TrashFolders from './trashFolder'

const Page = () => {
  return (
    <>
      <div className=" m-10">
        <TrashFolders/>
        <TrashFiles />
      </div>
    </>
  );
};

export default Page;
