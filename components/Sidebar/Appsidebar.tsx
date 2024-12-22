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
  SidebarFooter,
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
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import CreateNoteModal from "../Modals/CreateNoteModal";

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
  const exitHandle = async () => {
    await signOut(auth);
  };

  const [notes, setNotes] = useState<
    { id: string; title: string; content: string }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const notesRef = collection(db, "notes");
      const notesDoc = await getDocs(notesRef);

      const notesData = notesDoc.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || "Untitled",
        content: doc.data().content || "No content",
      }));

      setNotes(notesData);
    } catch (error: any) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
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
          {loading ? (
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
        <SidebarFooter>
          <Button onClick={exitHandle}>Çıkış yap</Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default Appsidebar;
