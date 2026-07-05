import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Search, Heart, Clock } from "lucide-react";
import { GUIDES, LEVELS, LEARNING_PATHS } from "@/lib/guides-data";
import { useLocalStorage } from "@/lib/useLocalStorage";

const levelColors = {
  basico: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  intermedio: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  avanzado: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

const pathColors = {
  emerald: "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20",
  sky: "border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20",
};

const DifficultyDots = ({ level }) => {
  const map = { basico: 1, intermedio: 2, avanzado: 3 };
  const n = map[level] || 1;
  return (
    <span className="flex gap-0.5 items-center">
      {[1, 2, 3].map((i) => (
        <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= n ? "bg-amber-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
      ))}
    </span>
  );
};

export default function Guides() {
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [completed] = useLocalStorage("remiendos-completed", []);
  const [favorites] = useLocalStorage("remiendos-favorites", []);

  const filtered = GUIDES.filter((g) => {
    const matchLevel = filter === "todos" || g.level === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || g.title.toLowerCase().includes(q) || g.when.toLowerCase().includes(q);
    return matchLevel && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">Guías paso a paso</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm">
          Elige una guía y aprende a tu ritmo. Cada una te lleva de la mano.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por palabra clave..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
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

      {/* Learning Paths — only show when no search/filter active */}
      {!search && filter === "todos" && (
        <div>
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">Rutas de aprendizaje</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LEARNING_PATHS.map((path) => {
              const doneCount = path.guideIds.filter((id) => completed.includes(id)).length;
              return (
                <div key={path.id} className={`rounded-2xl p-4 border ${pathColors[path.color]}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{path.emoji}</span>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{path.title}</h3>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">{path.description}</p>
                  <div className="space-y-1">
                    {path.guideIds.map((gid, idx) => {
                      const g = GUIDES.find((x) => x.id === gid);
                      if (!g) return null;
                      return (
                        <Link
                          key={gid}
                          to={`/guias/${gid}`}
                          className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                        >
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${completed.includes(gid) ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`}>
                            {completed.includes(gid) ? "✓" : idx + 1}
                          </span>
                          {g.title}
                        </Link>
                      );
                    })}
                  </div>
                  <p className="text-xs text-zinc-400 mt-2">{doneCount}/{path.guideIds.length} completadas</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List */}
      <div>
        {search || filter !== "todos" ? (
          <p className="text-xs text-zinc-400 mb-3">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</p>
        ) : (
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">Todas las guías</h2>
        )}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-zinc-400 py-6 text-center">No se encontraron guías con esa búsqueda.</p>
          ) : (
            filtered.map((guide) => {
              const done = completed.includes(guide.id);
              const isFav = favorites.includes(guide.id);
              return (
                <Link
                  key={guide.id}
                  to={`/guias/${guide.id}`}
                  className="flex items-center gap-4 bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[guide.level]}`}>
                        {LEVELS[guide.level].emoji} {LEVELS[guide.level].label}
                      </span>
                      {done && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          ✓ Completada
                        </span>
                      )}
                      {isFav && <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />}
                    </div>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{guide.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-zinc-400">
                        <Clock className="h-3 w-3" /> {guide.time}
                      </span>
                      <DifficultyDots level={guide.level} />
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 flex-shrink-0" />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}