"use client";
import {
  Home,
  Inbox,
  LoaderPinwheel,
  MessageCircle,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useEffect } from "react";
import CreateNoteModal from "../Modals/CreateNoteModal";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllNotes } from "@/redux/slices/noteSlice";

const items = [
  {
    title: "Anasayfa",
    url: "/",
    icon: Home,
  },
  {
    title: "Notlarım",
    url: "/notlarim",
    icon: Inbox,
  },
];

const items2 = [
  {
    title: "Hakkımızda",
    url: "/hakkimizda",
    icon: Users,
  },
  {
    title: "İletişim",
    url: "/iletisim",
    icon: MessageCircle,
  },
];

const Appsidebar = () => {
  const { notes, status } = useSelector((state: RootState) => state.notes);

  const dispatch = useDispatch<AppDispatch>();

  const fetchNotes = async () => {
    try {
      dispatch(getAllNotes());
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Notlar getirilirken bir hata oluştu.");
      } else {
        toast.error("Bilinmeyen bir hata oluştu.");
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <CreateNoteModal />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>KİŞİSEL</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>TEMEL</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items2.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          {status === "loading" ? (
            <p className="p-3">
              <LoaderPinwheel className="animate-spin" />
            </p>
          ) : (
            notes.length > 0 && (
              <SidebarGroup>
                <SidebarGroupLabel>NOTLARIM</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {notes.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton asChild>
                          <Link href={`/note/${item.id}`}>
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
          )}
        </SidebarContent>
        <SidebarSeparator />
      </Sidebar>
    </>
  );
};

export default Appsidebar;
