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
      name: "My files",
      icon: <MdFolderShared />,
      href: "/myFiles",
    },
    {
      name: "Starred",
      icon: <MdFolderSpecial />,
      href: "/starred",
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
              `" cursor-pointer w-40 justify-start h-14 rounded-md items-center hover:bg-slate-100 hover:scale-105 transition-all duration-150 pl-3 flex gap-3 h-14"`,
            )}
          >
            <span className="text-lg">{menu.icon}</span>
            <p className="text-xl">{menu.name}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
