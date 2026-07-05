import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, AlertTriangle, Lightbulb, Package } from "lucide-react";
import { GUIDES, LEVELS } from "@/lib/guides-data";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { Button } from "@/components/ui/button";

export default function GuideDetail() {
  const { id } = useParams();
  const guide = GUIDES.find((g) => g.id === id);
  const [completed, setCompleted] = useLocalStorage("remiendos-completed", []);

  if (!guide) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-zinc-500 dark:text-zinc-400">Guía no encontrada</p>
        <Link to="/guias" className="text-amber-700 dark:text-amber-400 underline">Volver a guías</Link>
      </div>
    );
  }

  const isDone = completed.includes(guide.id);
  const toggleDone = () => {
    setCompleted((prev) =>
      prev.includes(guide.id) ? prev.filter((x) => x !== guide.id) : [...prev, guide.id]
    );
  };

  const levelColors = {
    basico: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    intermedio: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    avanzado: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  };

  return (
    <div className="space-y-6">
      <Link to="/guias" className="inline-flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
        <ArrowLeft className="h-4 w-4" /> Volver a guías
      </Link>

      <div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${levelColors[guide.level]}`}>
          {LEVELS[guide.level].emoji} {LEVELS[guide.level].label}
        </span>
        <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-3">{guide.title}</h1>
      </div>

      {/* When */}
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-800/40">
        <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">¿Cuándo usar esta técnica?</p>
        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">{guide.when}</p>
      </div>

      {/* Materials */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          <Package className="h-5 w-5 text-zinc-500" /> Materiales necesarios
        </h2>
        <ul className="space-y-1.5">
          {guide.materials.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="text-amber-500 mt-0.5">•</span> {m}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Paso a paso</h2>
        <ol className="space-y-4">
          {guide.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Mistakes */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          <AlertTriangle className="h-5 w-5 text-rose-500" /> Errores comunes
        </h2>
        <ul className="space-y-2">
          {guide.mistakes.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="text-rose-500 mt-0.5">✗</span>
              <span className="leading-relaxed">{m}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tips */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          <Lightbulb className="h-5 w-5 text-amber-500" /> Consejos útiles
        </h2>
        <ul className="space-y-2">
          {guide.tips.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="text-amber-500 mt-0.5">💡</span>
              <span className="leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mark complete */}
      <Button
        onClick={toggleDone}
        className={`w-full py-6 text-base rounded-2xl font-semibold transition-colors ${
          isDone
            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
            : "bg-amber-600 hover:bg-amber-700 text-white"
        }`}
      >
        {isDone ? (
          <span className="flex items-center gap-2"><Check className="h-5 w-5" /> ¡Completada! Toca para desmarcar</span>
        ) : (
          "Marcar como completada ✓"
        )}
      </Button>
    </div>
  );
}