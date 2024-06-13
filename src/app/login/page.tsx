"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";
import LoadingProgress from "@/components/ui/loadingProgress";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router, session]);

  if (status === "loading") {
    return <LoadingProgress />;
  }

  return (
    <main className=" h-screen flex text-black justify-center items-center">
      <section className="p-10 rounded-xl border-slate-300 border-2 flex flex-col gap-5 justify-center items-center">
        <h1 className="text-3xl">Horizon Cloud</h1>
        <div className="flex justify-center items-center gap-3 my-10">
          <button
            className="gap-5 flex justify-center items-center p-2 w-64 rounded-lg border-slate-300 border-2"
            onClick={() => signIn("google")}
          >
            <FaGoogle />
            <p>Sign in with Google</p>
          </button>
          <button
            className="gap-5 flex justify-center items-center p-2 w-64 rounded-lg border-slate-300 border-2"
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
