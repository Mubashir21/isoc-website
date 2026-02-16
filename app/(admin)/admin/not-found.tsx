import Link from "next/link";
import { lusitana } from "@/components/ui/fonts";

export default function AdminNotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-5">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1
          className={`${lusitana.className} text-8xl font-bold text-blue-600 md:text-9xl`}
        >
          404
        </h1>
        <p className="text-xl font-medium text-gray-600 md:text-2xl">
          This page could not be found.
        </p>
        <Link
          href="/admin"
          className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
