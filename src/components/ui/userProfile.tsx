"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { UserProfileSkeleton } from "../skeleton/skeletons";

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <UserProfileSkeleton />;
  }

  return (
    <div className="lg:border-2 lg:sticky p-2 absolute h-16 right-[-10px] top-3 flex justify-between lg:p-3 lg:gap-3 rounded-md items-center lg:w-full lg:h-20">
      <div className="flex lg:flex-row flex-col lg:gap-3 justify-center items-center">
        <div className="flex-shrink-0">
          <Image
            src={session?.user?.image || "/user/image.png"}
            alt={session?.user?.name || "user"}
            width={100}
            height={100}
            className="rounded-full lg:w-14 lg:h-14 w-9 h-9"
          />
        </div>
        <div className="flex lg:flex-col flex-row justify-start items-start gap-0 w-full">
          <div className="text-center lg:w-auto w-14 text-ellipsis overflow-hidden whitespace-nowrap lg:text-base text-sm">
            {session?.user?.name}
          </div>
          <div className="text-center sm:text-left text-sm lg:inline hidden">
            {session?.user?.email}
          </div>
        </div>
      </div>
      <div className="flex text-2xl sm:text-3xl w-full sm:w-14 cursor-pointer justify-center sm:justify-end items-center">
        <div onClick={() => signOut()}>
          <IoIosLogOut />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
