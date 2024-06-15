"use client";

import LoginPage from "@/components/login";
import CircularIndeterminate from "@/components/ui/loadingProgress";
import { useSession } from "next-auth/react";
import Storage from "@/components/storage";
import SideNav from "@/components/sideNav";
import ParentFolderContext from "@/context/parentFolderContext";
import Search from "@/components/ui/searchBar";
import { useState } from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return (
      <>
        <CircularIndeterminate />
      </>
    );
  }

  return (
    <>
      <main className="text-black">
        {!session ? (
          <LoginPage />
        ) : (
          <div className="">
            <div className="flex">
              <SideNav />
              <div className="flex justify-between w-full">
                <div className="bg-gray-100 w-full">
                  <Search />
                  {children}
                </div>
                <div className="w-[30rem]">
                  <Storage />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}