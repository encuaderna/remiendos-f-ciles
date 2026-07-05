import React from "react";
import { TOOLS, SECURITY_TIPS } from "@/lib/guides-data";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { X, ShieldCheck } from "lucide-react";

export default function Tools() {
  const [tipDismissed, setTipDismissed] = useLocalStorage("remiendos-tools-tip-dismissed", false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">Herramientas y materiales</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm leading-relaxed">
          Estas son las cosas básicas que deberías tener en casa para empezar a remendar. No necesitas comprar todo de una vez — ve armando tu kit poco a poco.
        </p>
      </div>

      {/* First-visit tip */}
      {!tipDismissed && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-800/40 relative">
          <button
            onClick={() => setTipDismissed(true)}
            className="absolute top-3 right-3 text-amber-500 hover:text-amber-700"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">💡 ¿Recién empiezas?</p>
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            No necesitas todo para comenzar. Tu <strong>set mínimo</strong> para el 90% de los arreglos es solo: <strong>aguja · hilo · tijera</strong>. Puedes ir sumando el resto poco a poco.
          </p>
        </div>
      )}

      {/* Tools list */}
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

      {/* Security tips */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Consejos de seguridad</h2>
        </div>
        <div className="space-y-3">
          {SECURITY_TIPS.map((tip) => (
            <div key={tip.title} className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800/40">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{tip.icon}</span>
                <div>
                  <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 text-sm">{tip.title}</h3>
                  <p className="text-sm text-emerald-800 dark:text-emerald-300 mt-0.5 leading-relaxed">{tip.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}