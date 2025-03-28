import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Search from "./search";
import FileUploader from "./file-uploader";
import { signOutUser } from "@/lib/actions/user.actions";

interface HeaderProps {
  userId: string;
  accountId: string;
}

const Header = ({ userId, accountId }: HeaderProps) => {
  return (
    <header className="hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10">
      <Search />
      <div className=" flex-center min-w-fit gap-4">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            "use server";
            await signOutUser();
          }}
        >
          <Button
            type="submit"
            className="flex-center h-[52px] min-w-[54px] items-center rounded-full bg-cyan-700/10 p-0 text-cyan-900 shadow-none transition-all hover:bg-cyan-700/20"
          >
            <Image
              src={"/assets/icons/logout.svg"}
              alt="logo"
              width={24}
              height={24}
              className="w-6 cursor-pointer"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
