import Search from "@/components/ui/searchBar";
import RecentFolder from "@/components/recentFolders";
import RecentFiles from "@/components/recentFiles";
const home = () => {
  return (
    <div className=" bg-gray-100 w-full">
      <Search />
      <RecentFolder />
      <RecentFiles />
    </div>
  );
};

export default home;
