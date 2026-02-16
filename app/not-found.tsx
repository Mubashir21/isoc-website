import Link from "next/link";
import { lusitana } from "@/components/ui/fonts";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-blue-600 p-5">
      <div className="flex flex-col items-center gap-6 text-center text-white">
        <h1 className={`${lusitana.className} text-8xl font-bold md:text-9xl`}>
          404
        </h1>
        <p className="text-xl font-medium md:text-2xl">
          This page could not be found.
        </p>
        <Link
          href="/home"
          className="mt-4 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-200"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
