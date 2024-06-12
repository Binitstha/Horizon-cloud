"use client";

import LoginPage from "@/components/login";
import CircularIndeterminate from "@/components/ui/loadingProgress";
import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";

export default function Page() {
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
            <Dashboard />
          </div>
        )}
      </main>
    </>
  );
}
