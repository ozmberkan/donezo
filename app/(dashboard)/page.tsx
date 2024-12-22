"use client";
import { authListener } from "@/hooks/auth-listener";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    authListener(dispatch, router);
  }, [dispatch, router]);

  return (
    <div className="flex flex-col">
      <h1 className="text-[75px] font-black bg-clip-text text-transparent bg-gradient-to-l from-slate-700 to-slate-900 ">
        Anasayfa
      </h1>
    </div>
  );
}
