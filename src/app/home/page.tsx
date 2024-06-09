import Search from "@/components/ui/searchBar";
import RecentFolder from "@/components/recentFolders";
import RecentFiles from "@/components/recentFiles";
const home = () => {
  return (
    <div className=" w-full bg-gray-50">
      <Search />
      <RecentFolder />
      <RecentFiles />
    </div>
  );
};

export default home;
