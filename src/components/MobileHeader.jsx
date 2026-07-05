import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

export default function MobileHeader({ dark, setDark }) {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl">🧵</span>
          <span className="font-heading font-bold text-base text-zinc-900 dark:text-zinc-100">Remiendos Fáciles</span>
        </Link>
        <ThemeToggle dark={dark} setDark={setDark} />
      </div>
    </header>
  );
}