"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>; // Optionally show a loading state while fetching session
  }

  return (
    <>
      {session ? (
        ""
      ) : (
        <section className="flex flex-col justify-center items-center my-10">
          <div className="flex flex-col justify-center items-center gap-5">
            <p>You are not logged in</p>
            <button
              className="p-2 w-64 rounded-lg bg-slate-100"
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

export default Dashboard;
