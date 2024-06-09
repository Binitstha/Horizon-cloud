import Files from "./ui/files";

const RecentFiles = () => {
  return (
    <>
      <main className="pt-0 p-10">
        <div className=" bg-gray-100 rounded-md p-5">
          <div className=" flex justify-between">
            <p className="text-xl">Recent Files</p>
            <span className=" text-blue-500">View all</span>
          </div>
          <div>
            <Files />
          </div>
        </div>
      </main>
    </>
  );
};

export default RecentFiles;
