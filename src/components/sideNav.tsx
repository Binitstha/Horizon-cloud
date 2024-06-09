import { IoMdAddCircleOutline } from "react-icons/io";
import Navlinks from "./ui/navlinks";
import CreateFolder from "@/components/ui/createFolder";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

const SideNav = () => {
  return (
    <>
      <main className="w-80 bg-slate-100 sticky top-0 h-screen ">
        <section className="p-5 flex flex-col gap-7">
          <p className="text-2xl text-center">Horizon cloud</p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 bg-blue-300 hover:bg-slate-300 border-0 text-lg p-2 py-3 rounded-md justify-center items-center">
              <span>Add new file</span> <IoMdAddCircleOutline />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex gap-2 cursor-pointer bg-blue-300 hover:bg-slate-300 border-0  text-lg p-2 py-3 rounded-md justify-center items-center">
                  <span>Create folder</span> <IoMdAddCircleOutline />
                </div>
              </DialogTrigger>
              <CreateFolder />
            </Dialog>
          </div>
        </section>
        <section className="p-5 flex flex-col">
          <Navlinks />
        </section>
      </main>
    </>
  );
};

export default SideNav;
