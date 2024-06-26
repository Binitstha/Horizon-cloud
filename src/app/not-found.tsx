import Link from 'next/link';
import { FaRegFaceFrownOpen } from "react-icons/fa6";
export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center text-black justify-center gap-2">
      <FaRegFaceFrownOpen className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}