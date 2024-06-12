"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      {session ? (
        ""
      ) : (
        <section className=" w-full h-screen flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-5 p-4 shadow-md border-2 border-[#27272a] rounded-md">
            <p>You are not logged in</p>
            <button
              className="p-2 w-64 rounded-lg border-[#27272a] border-2"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
