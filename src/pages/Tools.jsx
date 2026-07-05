import React from "react";
import { TOOLS } from "@/lib/guides-data";

export default function Tools() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">Herramientas y materiales</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm leading-relaxed">
          Estas son las cosas básicas que deberías tener en casa para empezar a remendar. No necesitas comprar todo de una vez — ve armando tu kit poco a poco.
        </p>
      </div>

      <div className="space-y-3">
        {TOOLS.map((tool) => (
          <div
            key={tool.name}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{tool.icon}</span>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{tool.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">{tool.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}