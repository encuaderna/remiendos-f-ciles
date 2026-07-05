import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import SideNav from "@/components/SideNav";
import MobileHeader from "@/components/MobileHeader";
import { useLocalStorage } from "@/lib/useLocalStorage";

export default function AppLayout() {
  const [dark, setDark] = useLocalStorage("remiendos-dark", false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-amber-50/30 dark:bg-zinc-950 transition-colors">
      <SideNav dark={dark} setDark={setDark} />
      <MobileHeader dark={dark} setDark={setDark} />
      <main className="md:ml-56 lg:ml-64 pb-20 md:pb-8">
        <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}