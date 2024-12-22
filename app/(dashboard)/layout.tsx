import CreateNoteModal from "@/components/Modals/CreateNoteModal";
import Appsidebar from "@/components/Sidebar/Appsidebar";
import BreadC from "@/components/Sidebar/BreadC";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Toaster } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <SidebarProvider>
        <Toaster />
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
    </div>
  );
};

export default DashboardLayout;
