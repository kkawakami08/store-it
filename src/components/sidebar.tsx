"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { navItems, placeholderUrl } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <aside className="hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px]">
      <Link href={"/"}>
        <Image
          src={"/assets/icons/logo-full-brand.svg"}
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
        <Image
          src={"/assets/icons/logo-brand.svg"}
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden h-auto "
        />
      </Link>
      <nav className="h5 mt-9 flex-1 gap-1 text-cyan-900 ">
        <ul className="flex flex-1 flex-col gap-5">
          {navItems.map(({ url, name, icon }) => (
            <Link href={url} key={name}>
              <li
                className={cn(
                  "flex gap-5 lg:px-5 lg:py-5 py-2 justify-center lg:justify-start",
                  pathname === url && "bg-cyan-700 text-white  rounded-3xl"
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "w-6 filter invert opacity-25",
                    pathname === url && "invert-0 opacity-100"
                  )}
                />

                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src={"/assets/images/files-2.png"}
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />
      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-cyan-700/10 p-1 text-amber-50 lg:justify-start lg:p-3">
        <Image
          src={avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="w-10 rounded-full object-cover"
        />
        <div className="hidden lg:block text-cyan-900">
          <p className="capitalize">{fullName}</p>
          <p className="text-xs text-cyan-900/60">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
