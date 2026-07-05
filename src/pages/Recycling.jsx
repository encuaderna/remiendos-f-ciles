import React from "react";
import { RECYCLING_IDEAS } from "@/lib/guides-data";

const difficultyColors = {
  "Básico": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Intermedio": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
};

export default function Recycling() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Reciclaje textil</h1>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          Ideas simples para darle nueva vida a ropa que ya no usas. No tires nada — ¡transfórmalo!
        </p>
      </div>

      <div className="space-y-3">
        {RECYCLING_IDEAS.map((idea) => (
          <div
            key={idea.title}
            className="bg-card rounded-2xl p-5 border border-border shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground">{idea.title}</h3>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColors[idea.difficulty]}`}>
                {idea.difficulty}
              </span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{idea.description}</p>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="font-medium">Sirve con:</span> {idea.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}