'use client'

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
      href: "/home",
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
        <>
          <Link href={menu.href}>
            <div
              key={menu.name}
              className={clsx(
                { "bg-sky-100 text-blue-600": menu.href === pathName },
                `" cursor-pointer flex gap-3 h-14 pl-5 rounded-md justify-start items-center hover:bg-blue-200 border-2"`,
              )}
            >
              <span className="text-xl">{menu.icon}</span>
              <p className="text-2xl">{menu.name}</p>
            </div>
          </Link>
        </>
      ))}
    </>
  );
};

export default NavLinks;
