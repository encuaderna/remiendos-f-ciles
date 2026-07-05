import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

export default function MobileHeader({ dark, setDark }) {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl">🧵</span>
          <span className="font-heading font-bold text-base text-foreground">Remiendos Fáciles</span>
        </Link>
        <ThemeToggle dark={dark} setDark={setDark} />
      </div>
    </header>
  );
}