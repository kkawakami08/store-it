"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "./ui/separator";
import FileUploader from "./file-uploader";
import { Button } from "./ui/button";

interface MobileNavProps {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNav = ({
  ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="flex h-[60px] justify-between px-5 sm:hidden">
      <Image
        src={"/assets/icons/logo-full-brand.svg"}
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src={"/assets/icons/menu.svg"}
            alt="search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="h-screen px-3">
          <SheetTitle>
            <div className="my-3 flex items-center gap-2 rounded-full p-1 text-cyan-700 sm:justify-center sm:bg-cyan-700/10 lg:justify-start lg:p-3">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="w-10 rounded-full object-cover"
              />
              <div className="sm:hidden lg:block">
                <p className="capitalize">{fullName}</p>
                <p className="text-xs text-cyan-700/40">{email}</p>
              </div>
            </div>
            <Separator className="mb-4  bg-cyan-700/40" />
          </SheetTitle>
          <nav className="mobile-navh5 flex-1 gap-1 text-cyan-700">
            <ul className="flex flex-1 flex-col gap-4">
              {navItems.map(({ url, name, icon }) => (
                <Link href={url} key={name} className="">
                  <li
                    className={cn(
                      "flex text-cyan-900 gap-4 w-full justify-start items-center h5 px-6 h-[52px] rounded-full ",
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

                    <p className=" lg:block">{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className="my-5 bg-cyan-700/20" />
          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader />
            <Button
              onClick={() => {}}
              type="submit"
              className="h5 flex h-[52px] w-full items-center gap-4 rounded-full bg-cyan-700/10 px-6 text-cyan-900 shadow-none transition-all hover:bg-cyan-700/20"
            >
              <Image
                src={"/assets/icons/logout.svg"}
                alt="logo"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNav;
