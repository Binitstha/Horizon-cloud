import { IoMdAddCircleOutline } from "react-icons/io";
import Navlinks from "./ui/navlinks";

const SideNav = () => {
  return (
    <>
      <main className="w-80 bg-slate-100 sticky h-screen">
        <section className="p-10 flex flex-col gap-7">
          <p className="text-3xl text-center">Horizon cloud</p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 bg-blue-300 hover:bg-slate-300 border-0 text-xl p-2 py-3 rounded-md justify-center items-center">
              <span>Add new file</span> <IoMdAddCircleOutline />
            </div>
            <div className="flex gap-2 bg-blue-300 hover:bg-slate-300 border-0  text-xl p-2 py-3 rounded-md justify-center items-center">
              <span>new folder</span> <IoMdAddCircleOutline />
            </div>
          </div>
        </section>
        <section className="p-10 flex flex-col">
          <Navlinks />
        </section>
      </main>
    </>
  );
};

export default SideNav;
