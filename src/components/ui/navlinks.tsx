"use client";

import { IoHome } from "react-icons/io5";
import { MdFolderSpecial } from "react-icons/md";
import { MdFolderShared } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLinks = () => {
  const navMenu = [
    {
      name: "Home",
      icon: <IoHome />,
      href: "/",
    },
    {
      name: "My folders",
      icon: <MdFolderShared />,
      href: "/myFolders",
    },
    {
      name: "Starred",
      icon: <MdFolderSpecial />,
      href: "/starredFolders",
    },
    {
      name: "Trash",
      icon: <FaTrash />,
      href: "/trash",
    },
  ];

  const pathName = usePathname();

  return (
    <>
      {navMenu.map((menu) => (
        <Link href={menu.href} key={menu.name}>
          <div
            className={clsx(
              { "bg-sky-100 text-blue-600": menu.href === pathName },
              `" cursor-pointer lg:w-40 w-28 justify-start lg:h-14 h-11 rounded-md items-center hover:bg-slate-100 hover:scale-105 transition-all duration-150 pl-3 flex gap-2 lg:gap-3 h-14"`,
            )}
          >
            <span className="text-lg">{menu.icon}</span>
            <p className="lg:text-xl text-sm">{menu.name}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
