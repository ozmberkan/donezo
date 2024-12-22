"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

export default function Home() {
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/giris");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col">
      <h1 className="text-[75px] font-black bg-clip-text text-transparent bg-gradient-to-l from-slate-700 to-slate-900 ">
        Anasayfa
      </h1>
    </div>
  );
}
