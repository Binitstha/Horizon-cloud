import Home from "@/app/home/page";
import SideNav from "./sideNav";
import Storage from "@/app/storage/page";

const Dashboard = () => {
  return (
    <>
      <div className="flex ">
        <SideNav />
        <div className="flex justify-between w-full">
          <Home />
          <div className="bg-slate-100 w-[30rem]">
            <Storage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
