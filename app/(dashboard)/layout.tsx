import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Appsidebar from "@/components/Sidebar/Appsidebar";

import NextTopLoader from "nextjs-toploader";
import BreadC from "@/components/Sidebar/BreadC";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donezo",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="#000" showSpinner={false} />
        <SidebarProvider>
          <Appsidebar />
          <main className="p-3 flex flex-col gap-3 w-full">
            <div className="w-full flex justify-start items-center gap-1">
              <SidebarTrigger />
              <div className="w-1 h-4  border-r mr-3 "></div>

              <BreadC />
            </div>
            <div className="flex-grow  w-full">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}