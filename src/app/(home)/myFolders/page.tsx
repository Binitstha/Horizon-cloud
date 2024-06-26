import RecentFolders from "@/components/recentFolders";
import Folders from "@/components/ui/folders";

const Myfolders = () => {
  return (
    <>
      <main className=" pt-5 p-10">
        <div className=" rounded-md p-5">
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
