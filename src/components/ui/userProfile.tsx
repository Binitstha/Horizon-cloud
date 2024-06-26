"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { UserProfileSkeleton } from "../skeleton/skeletons";

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status == "loading") {
    <UserProfileSkeleton />;
  }

  return (
    <div className="border-2 flex justify-start p-3 gap-3 rounded-md items-center w-full h-20 ">
      <div>
        <Image
          src={session?.user?.image || "./user/image.png"}
          alt={session?.user?.name || "user"}
          width={100}
          height={100}
          className="rounded-full w-12"
        />
      </div>
      <div>
        <div>{session?.user?.name}</div>
        <div>{session?.user?.email}</div>
      </div>
      <div className="flex text-3xl w-14 cursor-pointer justify-end items-center">
        <div onClick={() => signOut()}>
          <IoIosLogOut />
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
