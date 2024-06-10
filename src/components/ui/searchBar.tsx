import { FaSearch } from "react-icons/fa";

const searchBar = () => {
  return (
    <>
      <div className="w-full p-10 rounded-md">
        <form action="" className="relative ">
          <input
            type="text"
            className="h-10 pl-10 w-full border-2 bg-black rounded-md"
            placeholder="Search...."
          />
          <button className="absolute left-3 top-3">
            <FaSearch />
          </button>
        </form>
      </div>
    </>
  );
};

export default searchBar;
