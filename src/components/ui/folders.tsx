import { FaFolder } from "react-icons/fa";

const folders = () => {
  const foldersList = [
    { id: 1, name: "folder 1" },
    { id: 2, name: "folder 2" },
    { id: 3, name: "folder 3" },
    { id: 4, name: "folder 3sadbnkasj" },
    { id: 5, name: "folder 3" },
    { id: 6, name: "folder 3" },
    { id: 7, name: "folder 3" },
    { id: 8, name: "folder 4" },
  ];

  return (
    <section className=" flex justify-center items-center">
      <main className=" mt-5 justify-start items-center flex flex-wrap gap-5">
        {foldersList.map((folder) => (
          <div
            key={folder.id}
            className="flex border-2 flex-col h-28 w-44 text-xl rounded-xl cursor-pointer p-2 justify-center items-center gap-3 hover:scale-105 transition-all duration-150"
          >
            <span className="text-5xl">
              <FaFolder />
            </span>
            <div className="text-ellipsis w-32 overflow-clip text-nowrap text-center">
              {folder.name}
            </div>
          </div>
        ))}
      </main>
    </section>
  );
};

export default folders;
