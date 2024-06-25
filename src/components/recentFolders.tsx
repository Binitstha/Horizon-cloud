"use client";

import { useState } from "react";
import Folders from "./ui/folders";

const RecentFolders = () => {
  const [viewAll, setViewAll] = useState<boolean>(true);

  return (
    <main className=" pt-5 p-10">
      <div className=" rounded-md p-5">
        <div className=" flex justify-between">
          <p className="text-xl">Recent Folders</p>
          <span
            className=" text-blue-500 cursor-pointer"
            onClick={() => setViewAll(!viewAll)}
          >
            View all
          </span>
        </div>
        <div>
          <Folders viewAll={viewAll}/>
        </div>
      </div>
    </main>
  );
};

export default RecentFolders;
