"use client";
import { navlinks } from "@/constants/navlinks";
import { Navlink } from "@/types/navlink";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./Heading";
import { socials } from "@/constants/socials";
import { Badge } from "./Badge";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconLayoutSidebarRightCollapse,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { isMobile } from "@/lib/utils";
import profile from "../../public/images/profile.jpg";

export const Sidebar = () => {
  const [open, setOpen] = useState(isMobile() ? false : true);
  const [theme, setTheme] = useState("light");

  // Initialize theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            exit={{ x: -200 }}
            className="px-6 z-[100] py-10 bg-gradient-to-b from-[#3D1F1F] via-[#2D1212] to-[#1F0D0D] dark:from-[#1D1B28] dark:via-[#191622] dark:to-[#16141E] backdrop-blur-lg lg:w-fit fixed lg:relative h-screen left-0 flex flex-col justify-between shadow-lg border-r border-neutral-700"
          >
            <div className="flex-1 overflow-auto">
              <SidebarHeader />
              <Navigation setOpen={setOpen} />
            </div>
            <div className="flex items-center justify-between mt-4">
              <Badge
                href="https://docs.google.com/document/d/1ZsNolCtx5OpjIAObFt6-3Y_0ieBjqDIKfRYTp-sYitY/edit?usp=sharing"
                text="Read Resume"
              />
              <button
                onClick={toggleTheme}
                className="h-8 w-8 flex items-center justify-center rounded-full border border-neutral-700 bg-[#2D1212] dark:bg-[#1F1F2E] shadow-md"
              >
                {theme === "light" ? (
                  <IconMoon className="h-5 w-5 text-[#FFD700]" />
                ) : (
                  <IconSun className="h-5 w-5 text-orange-500" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="fixed lg:hidden bottom-4 right-4 h-10 w-10 border border-neutral-200 dark:border-neutral-700 rounded-full backdrop-blur-md flex items-center justify-center z-50 bg-[#3D1F1F] dark:bg-[#1F0D0D] shadow-md"
        onClick={() => setOpen(!open)}
      >
        <IconLayoutSidebarRightCollapse className="h-5 w-5 text-orange-500" />
      </button>
    </>
  );
};

export const Navigation = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col space-y-1 my-10 relative z-[100]">
      {navlinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "text-[#D1D5DB] hover:text-[#FFD700] transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
            isActive(link.href) &&
              "bg-[#2D1212] dark:bg-[#1F0D0D] shadow-lg text-[#FFD700]"
          )}
        >
          <link.icon
            className={twMerge(
              "h-5 w-5 flex-shrink-0",
              isActive(link.href) && "text-orange-500"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}

      <Heading
        as="p"
        className="text-sm md:text-sm lg:text-sm pt-10 px-2 text-[#D1D5DB]"
      >
        Links
      </Heading>
      {socials.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          className={twMerge(
            "text-[#D1D5DB] hover:text-[#FFD700] transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm"
          )}
        >
          <link.icon
            className={twMerge(
              "h-5 w-5 flex-shrink-0",
              isActive(link.href) && "text-orange-500"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
};

const SidebarHeader = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <Image
          src={profile}
          alt="Avatar"
          height="48"
          width="48"
          className="object-cover object-top rounded-full flex-shrink-0 border-2 border-[#FFD700]"
        />
        <span className="absolute bottom-1 right-1 h-3 w-3 bg-green-500 border-2 border-[#2D1212] dark:border-[#1F0D0D] rounded-full" />
      </div>
      <div className="flex text-sm flex-col">
        <p className="font-bold text-[#FFD700]">ABDUL WAHID</p>
        <p className="font-light text-[#D1D5DB]">SOFTWARE ENGINEER</p>
      </div>
    </div>
  );
};
