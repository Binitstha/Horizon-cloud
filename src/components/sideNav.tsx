import { useState, useEffect, useRef } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import Navlinks from "./ui/navlinks";
import CreateFolder from "@/components/ui/createFolder";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import CreateFile from "./ui/createFile";

const SideNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    if (isNavOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNavOpen]);

  return (
    <>
      {/* Mobile navigation toggle button */}
      <button
        className="lg:hidden fixed top-7 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
        onClick={toggleNav}
      >
        {isNavOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Side Navigation */}
      <main
        ref={navRef}
        className={`lg:w-80 w-56 pl-5 lg:pl-0 lg:sticky fixed top-0 h-screen flex flex-col justify-start items-center duration-500 z-10 transition-transform transform bg-white shadow-lg lg:shadow-none ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <section className="lg:p-5 p-2 flex flex-col gap-7 lg:mt-0 mt-6">
          <p className="lg:text-2xl text-xl text-center">Horizon Cloud</p>
          <div className="flex flex-col gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex gap-2 h-10 cursor-pointer border-slate-300 hover:bg-slate-100 border-2 lg:text-lg text-xs p-2 py-3 rounded-md justify-center items-center">
                  <span>Add new file</span> <IoMdAddCircleOutline />
                </div>
              </DialogTrigger>
              <CreateFile />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex gap-2 cursor-pointer h-10 border-slate-300 border-2 hover:bg-slate-100 lg:text-lg p-2 text-xs py-3 rounded-md justify-center items-center">
                  <span>Create folder</span> <IoMdAddCircleOutline />
                </div>
              </DialogTrigger>
              <CreateFolder />
            </Dialog>
          </div>
        </section>
        <section className="lg:p-5 p-2 flex flex-col">
          <Navlinks />
        </section>
      </main>
    </>
  );
};

export default SideNav;
