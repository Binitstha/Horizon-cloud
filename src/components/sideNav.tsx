import { IoMdAddCircleOutline } from "react-icons/io";
import Navlinks from "./ui/navlinks";
import CreateFolder from "@/components/ui/createFolder";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

const SideNav = () => {
  return (
    <>
      <main className="w-80 sticky top-0 h-screen bg-[#09090b]  flex flex-col justify-center items-center">
        <section className="p-5 flex flex-col gap-7">
          <p className="text-2xl text-center text-slate-200">Horizon cloud</p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 border-[#27272a] hover:bg-neutral-900 border-2 text-lg p-2 py-3 rounded-md justify-center items-center">
              <span>Add new file</span> <IoMdAddCircleOutline />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex gap-2 cursor-pointer border-[#27272a] border-2 hover:bg-neutral-900  text-lg p-2 py-3 rounded-md justify-center items-center">
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
