"use client";

import { useState } from "react";
import Files from "./ui/files";

const RecentFiles = () => {
  const [viewAll, setViewAll] = useState<boolean>(true);
  return (
    <>
      <main className="pt-0 lg:p-10">
        <div className="rounded-md p-5">
          <div className=" flex justify-between">
            <p className="text-xl">Recent Files</p>
            <button
              className=" text-blue-500 cursor-pointer"
              onClick={() => setViewAll(!viewAll)}
            >
              View all
            </button>
          </div>
          <div>
            <Files viewAll={viewAll} />
          </div>
        </div>
      </main>
    </>
  );
};

export default RecentFiles;
