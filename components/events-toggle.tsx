"use client";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Future Events",
    href: "/events/future",
  },
  { name: "Past Events", href: "/events/past" },
];

export function EventsToggle() {
  const pathname = usePathname();
  return (
    <div className="flex 2xl:w-1/4 p-2 bg-slate-300 gap-2 rounded-lg">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(buttonVariants({ variant: "default" }), "w-full ", {
            "bg-sky-100 hover:bg-sky-200": pathname !== link.href,
          })}
        >
          <p
            className={clsx("text-base", {
              "text-blue-600": pathname !== link.href,
            })}
          >
            {link.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
