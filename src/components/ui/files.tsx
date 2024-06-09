import { FaFolder } from "react-icons/fa";

const files = () => {
  const filesList = [
    { id: 1, name: "file 1" },
    { id: 2, name: "file 2" },
    { id: 3, name: "file 3" },
    { id: 3, name: "file 3" },
    { id: 3, name: "file 3" },
    { id: 3, name: "file 3" },
    { id: 3, name: "file 3" },
    { id: 4, name: "file 4" },
  ];

  return (
    <section className=" flex justify-center items-center">
      <main className=" mt-5 justify-start items-center flex flex-wrap gap-5">
        {filesList.map((file) => (
          <div
            key={file.id}
            className="flex border-2 h-36 w-52 text-3xl rounded-xl cursor-pointer p-2 justify-center items-center gap-3 hover:scale-105 transition-all duration-150"
          >
            <span>
              <FaFolder />
            </span>
            <div>{file.name}</div>
          </div>
        ))}
      </main>
    </section>
  );
};

export default files;
