import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { GUIDES, LEVELS } from "@/lib/guides-data";
import { useLocalStorage } from "@/lib/useLocalStorage";

export default function Guides() {
  const [filter, setFilter] = useState("todos");
  const [completed] = useLocalStorage("remiendos-completed", []);

  const filtered = filter === "todos" ? GUIDES : GUIDES.filter((g) => g.level === filter);

  const levelColors = {
    basico: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    intermedio: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    avanzado: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">Guías paso a paso</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm">
          Elige una guía y aprende a tu ritmo. Cada una te lleva de la mano.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[{ key: "todos", label: "Todas" }, ...Object.entries(LEVELS).map(([k, v]) => ({ key: k, label: `${v.emoji} ${v.label}` }))].map(
          ({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${filter === key
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
            >
              {label}
            </button>
          )
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((guide) => {
          const done = completed.includes(guide.id);
          return (
            <Link
              key={guide.id}
              to={`/guias/${guide.id}`}
              className="flex items-center gap-4 bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[guide.level]}`}>
                    {LEVELS[guide.level].emoji} {LEVELS[guide.level].label}
                  </span>
                  {done && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      ✓ Completada
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{guide.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">{guide.when}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}