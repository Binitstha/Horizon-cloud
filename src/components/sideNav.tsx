import { IoMdAddCircleOutline } from "react-icons/io";
import Navlinks from "./ui/navlinks";
import CreateFolder from "@/components/ui/createFolder";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import CreateFile from "./ui/createFile";

const SideNav = () => {
  return (
    <>
      <main className="w-80 sticky top-0 h-screen flex flex-col justify-start items-center">
        <section className="p-5 flex flex-col gap-7">
          <p className="text-2xl text-center ">Horizon cloud</p>
          <div className="flex flex-col gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex gap-2 h-10 cursor-pointer border-slate-300 hover:bg-slate-100 border-2 text-lg p-2 py-3 rounded-md justify-center items-center">
                  <span>Add new file</span> <IoMdAddCircleOutline />
                </div>
              </DialogTrigger>
              <CreateFile />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex gap-2 cursor-pointer h-10 border-slate-300 border-2 hover:bg-slate-100  text-lg p-2 py-3 rounded-md justify-center items-center">
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
