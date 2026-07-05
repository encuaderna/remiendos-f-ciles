import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Recycle, ClipboardCheck, Wrench, Sparkles, Settings } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/herramientas", label: "Herramientas", icon: Wrench },
  { path: "/guias", label: "Guías", icon: BookOpen },
  { path: "/inspiracion", label: "Tablero de Inspiración", icon: Sparkles },
  { path: "/reciclaje", label: "Reciclaje", icon: Recycle },
  { path: "/progreso", label: "Mi progreso", icon: ClipboardCheck },
  { path: "/ajustes", label: "Ajustes", icon: Settings },
];

export default function SideNav({ dark, setDark }) {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-56 lg:w-64 fixed top-0 left-0 bottom-0 bg-card border-r border-border z-40">
      <div className="p-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🧵</span>
          <span className="font-heading font-bold text-lg text-foreground">Remiendos Fáciles</span>
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
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <ThemeToggle dark={dark} setDark={setDark} />
      </div>
    </aside>
  );
}