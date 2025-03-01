"use client";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { linkSync } from "fs";

const links = {
  socials: [
    {
      name: "Brothers' Instagram",
      icon: InstagramIcon,
      href: "https://www.instagram.com/unmisocbrothers/?hl=en",
    },
    {
      name: "Sisters' Instagram",
      icon: InstagramIcon,
      href: "https://www.instagram.com/unmisocsisters/?hl=en",
    },
    {
      name: "Youtube Channel",
      icon: YouTubeIcon,
      href: "https://www.youtube.com/learnyourreligion",
    },
  ],
  navigate: [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "Prayer Times",
      href: "/prayertimes",
    },
    {
      name: "Events",
      href: "events/future",
    },
    {
      name: "Announcements",
      href: "/announcements",
    },
  ],
  contribute: [
    {
      name: "Github Repository",
      href: "https://github.com/Mubashir21/isoc-website",
      icon: GitHubIcon,
      description: "Help us improve!",
    },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  return (
    <>
      <footer className="flex flex-col gap-3 md:hidden">
        <div>
          <span className="block text-2xl font-semibold mb-3 text-white">
            Join Our Socials
          </span>
          <div className="flex flex-col gap-2">
            {links.socials.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  className="flex hover:text-blue-600"
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="text-slate-200" />
                  <span className="mx-3 font-medium text-slate-200">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <hr className="border-blue-600" />
        <div>
          <span className="block text-2xl font-semibold mb-3 text-white">
            Navigate
          </span>
          <div className="flex flex-col gap-2">
            {links.navigate.map((link) => {
              return (
                <Link
                  className="flex hover:text-blue-600 text-md"
                  key={link.name}
                  href={link.href}
                >
                  <span
                    className={clsx(" font-medium text-slate-200", {
                      underline: pathname == link.href,
                    })}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <hr className="border-blue-600" />
        <div>
          <span className="block text-2xl font-semibold mb-3 text-white">
            Contribute
          </span>
          <div className="flex flex-col gap-2">
            {" "}
            <Link
              className="flex hover:text-blue-600"
              key={links.contribute[0].name}
              href={links.contribute[0].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="text-slate-200" />
              <span className="mx-3 font-medium text-slate-200">
                {links.contribute[0].description}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-muted-foreground text-sm text-slate-200">
            {" "}
            &#174; UNM ISOC 2025
          </p>
        </div>
      </footer>
      <footer className="hidden md:flex gap-3 justify-between">
        <div>
          <span className="block text-2xl font-semibold mb-3 text-blue-500">
            Join Our Socials
          </span>
          <div className="flex flex-col gap-2">
            {links.socials.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  className="flex hover:text-blue-600"
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="text-slate-200" />
                  <span className="mx-3 font-medium text-slate-200">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <hr className="border-blue-600" />
        <div>
          <span className="block text-2xl font-semibold mb-3 text-blue-500">
            Navigate
          </span>
          <div className="flex flex-col gap-2">
            {links.navigate.map((link) => {
              return (
                <Link
                  className="flex hover:text-blue-600 text-md"
                  key={link.name}
                  href={link.href}
                >
                  <span
                    className={clsx(" font-medium text-slate-200", {
                      underline: pathname == link.href,
                    })}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <hr className="border-blue-600" />
        <div className="">
          <span className="block text-2xl font-semibold mb-3 text-blue-500">
            Contribute
          </span>
          <div className="flex flex-col justify-between h-full pb-11">
            <div className="flex flex-col gap-2">
              <Link
                className="flex hover:text-blue-600"
                key={links.contribute[0].name}
                href={links.contribute[0].href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="text-slate-200" />
                <span className="mx-3 font-medium text-slate-200">
                  {links.contribute[0].description}
                </span>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm text-right text-slate-200">
              &#174; UNM ISOC 2025
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
