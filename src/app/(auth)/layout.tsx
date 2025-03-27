import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" min-h-screen flex bg-amber-50">
      <section className="bg-cyan-950 p-10  flex-col items-center justify-between py-80 hidden lg:flex xl:w-2/5 w-1/2">
        <Image
          src={"/assets/icons/logo-full-brand.svg"}
          alt="logo"
          width={224}
          height={82}
        />

        <div className="space-y-5 text-white ">
          <h1 className="h1">Manage your files the best way</h1>
          <p className="body">
            This is a place where you can store all your documents
          </p>{" "}
        </div>
        <Image
          src={"/assets/images/files.png"}
          alt="sign up image"
          height={342}
          width={342}
          className="transition-all hover:rotate-2 hover:scale-105"
        />
      </section>

      <section className="flex flex-1 flex-col items-center p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src={"/assets/icons/logo-full-brand.svg"}
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px] "
          />
        </div>
        {children}
      </section>
    </main>
  );
}
