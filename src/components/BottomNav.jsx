import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Recycle, ClipboardCheck, Wrench } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/herramientas", label: "Herramientas", icon: Wrench },
  { path: "/guias", label: "Guías", icon: BookOpen },
  { path: "/reciclaje", label: "Reciclaje", icon: Recycle },
  { path: "/progreso", label: "Progreso", icon: ClipboardCheck },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 md:hidden">
      <div className="flex justify-around items-center h-16 px-1">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const active = path === "/" ? pathname === "/" : pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors text-xs
                ${active
                  ? "text-amber-700 dark:text-amber-400 font-semibold"
                  : "text-zinc-500 dark:text-zinc-400"
                }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-amber-700 dark:text-amber-400" : ""}`} />
              <span className="leading-tight">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}