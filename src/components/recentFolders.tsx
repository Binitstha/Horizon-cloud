import Folders from "./ui/folders";

const recentFolders = () => {
  return (
    <main className=" pt-5 p-10">
      <div className=" bg-gray-100 rounded-md p-5">
        <div className=" flex justify-between">
          <p className="text-xl">Recent Folders</p>
          <span className=" text-blue-500">View all</span>
        </div>
        <div>
          <Folders />
        </div>
      </div>
    </main>
  );
};

export default recentFolders;
