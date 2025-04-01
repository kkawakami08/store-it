import Header from "@/components/header";
import MobileNav from "@/components/mobile-nav";
import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "sonner";

export const dyanmic = "force-dynamic";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNav {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="h-full flex-1 overflow-auto bg-[#F2F4F8] px-5 py-7 sm:mr-7 sm:rounded-[30px] md:mb-7 md:px-9 md:py-10">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default RootLayout;
