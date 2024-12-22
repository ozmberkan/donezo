import { Toaster } from "sonner";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full  min-h-screen flex-col flex justify-center items-center">
      <div className="items-start flex justify-start flex-col w-[500px] ">
        <div className="mb-5">
          <h1 className="mb-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black to-neutral-500 text-5xl ">
            Donezo
          </h1>
          <p className="text-sm text-neutral-600 font-medium">
            Hemen donezo'ya katıl
          </p>
        </div>
        <main className="w-full">
          <Toaster />
          {children}
        </main>
      </div>
    </div>
  );
}
