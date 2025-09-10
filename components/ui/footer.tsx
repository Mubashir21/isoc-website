"use client";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
    <footer className="w-full">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Socials Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Connect With Us</h3>
          <div className="space-y-3">
            {links.socials.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-200 hover:text-white transition-colors duration-200 group"
                >
                  <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-blue-600 transition-colors duration-200">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Quick Links</h3>
          <div className="space-y-3">
            {links.navigate.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block text-slate-200 hover:text-white transition-colors duration-200 font-medium",
                  pathname === link.href && "text-blue-400",
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contribute Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Get Involved</h3>
          <div className="space-y-3">
            <Link
              href={links.contribute[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-200 hover:text-white transition-colors duration-200 group"
            >
              <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-green-600 transition-colors duration-200">
                <GitHubIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-medium block">Contribute</span>
                <span className="text-sm text-slate-400">
                  Help us improve our website
                </span>
              </div>
            </Link>
          </div>

          {/* About ISOC */}
          <div className="mt-6 p-4 bg-black rounded-lg">
            <p className="text-sm text-slate-200 leading-relaxed">
              The Islamic Society at UNM Malaysia - fostering brotherhood,
              sisterhood, and spiritual growth since 2006.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-slate-500 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-300 text-sm">
            <p>&copy; 2025 UNM Islamic Society. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-sm">
            <span>Made with ❤️ for the community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
