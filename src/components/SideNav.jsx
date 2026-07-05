import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Recycle, ClipboardCheck, Wrench } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/herramientas", label: "Herramientas", icon: Wrench },
  { path: "/guias", label: "Guías", icon: BookOpen },
  { path: "/reciclaje", label: "Reciclaje", icon: Recycle },
  { path: "/progreso", label: "Mi progreso", icon: ClipboardCheck },
];

export default function SideNav({ dark, setDark }) {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-56 lg:w-64 fixed top-0 left-0 bottom-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-40">
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-800">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🧵</span>
          <span className="font-heading font-bold text-lg text-zinc-900 dark:text-zinc-100">Remiendos Fáciles</span>
        </Link>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const active = path === "/" ? pathname === "/" : pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${active
                  ? "bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
        <ThemeToggle dark={dark} setDark={setDark} />
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Modo {dark ? "oscuro" : "claro"}</span>
      </div>
    </aside>
  );
}