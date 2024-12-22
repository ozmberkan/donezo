"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.currentUser);

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
