"use client";

import { useState } from "react";
import Folders from "./ui/folders";

const RecentFolders = () => {
  const [viewAll, setViewAll] = useState<boolean>(true);

  return (
    <main className=" lg:pt-5 lg:p-10 p-2">
      <div
        className=" rounded-md lg:p-5 p-2
      "
      >
        <div className=" flex justify-between">
          <p className="lg:text-xl text-lg">Recent Folders</p>
          <button
            className=" text-blue-500 cursor-pointer lg:text-base text-xs"
            onClick={() => setViewAll(!viewAll)}
          >
            View all
          </button>
        </div>
        <div>
          <Folders viewAll={viewAll} />
        </div>
      </div>
    </main>
  );
};

export default RecentFolders;
