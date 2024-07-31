import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const links = [
  {
    name: "Future Events",
    href: "/events",
  },
  { name: "Past Events", href: "/events" },
];

export function EventsToggle() {
  return (
    <div className="flex p-2 bg-slate-300 w-fit gap-2 rounded-md">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`${buttonVariants({ variant: "default" })}`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
