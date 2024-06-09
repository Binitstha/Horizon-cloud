import Search from "@/components/ui/searchBar";
import RecentFolder from "@/components/recentFolders";
const home = () => {
  return (
    <div className=" w-full bg-gray-50">
      <Search />
      <RecentFolder />
    </div>
  );
};

export default home;
