import RecentFolders from "@/components/recentFolders";
import Folders from "@/components/ui/folders";

const Myfolders = () => {
  return (
    <>
      <main className=" lg:pt-5 lg:p-10 p-2 lg:w-auto w-screen">
        <div className="rounded-md lg:p-5 p-2">
          <div className=" flex justify-between">
            <p className="text-xl">My Folders</p>
          </div>
          <div>
            <Folders viewAll={false} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Myfolders;
