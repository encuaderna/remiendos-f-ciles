import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Recycle, ClipboardCheck, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/guias", label: "Guías", icon: BookOpen },
  { path: "/inspiracion", label: "Tablero", icon: Sparkles },
  { path: "/reciclaje", label: "Reciclaje", icon: Recycle },
  { path: "/progreso", label: "Progreso", icon: ClipboardCheck },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-t border-border md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex justify-around items-center h-16 px-1">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const active = path === "/" ? pathname === "/" : pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-xl transition-all active:scale-90
                ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {/* Active pill background */}
              {active && (
                <span className="absolute inset-x-2 top-1 bottom-1 rounded-xl bg-primary/10" />
              )}
              <Icon className={`relative h-5 w-5 transition-transform ${active ? "scale-110" : ""}`} />
              <span className={`relative text-[10px] leading-tight font-medium ${active ? "font-semibold" : ""}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}