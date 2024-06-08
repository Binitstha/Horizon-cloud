"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
      console.log("session", session.user);
    }
  }, [status, router, session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <main className="h-screen flex justify-center items-center">
      <section className="p-10 rounded-xl shadow-xl flex flex-col gap-5 justify-center items-center">
        <h1 className="text-3xl">Horizon Cloud</h1>
        <div className="flex justify-center items-center gap-3 my-10">
          <button
            className="gap-5 flex justify-center items-center p-2 w-64 rounded-lg bg-slate-100"
            onClick={() => signIn("google")}
          >
            <FaGoogle />
            <p>Sign in with Google</p>
          </button>
          <button
            className="gap-5 flex justify-center items-center p-2 w-64 rounded-lg bg-slate-100"
            onClick={() => signIn("github")}
          >
            <FaGithub />
            <p>Sign in with GitHub</p>
          </button>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
