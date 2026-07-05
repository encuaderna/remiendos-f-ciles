import React from "react";
import { TOOLS, SECURITY_TIPS } from "@/lib/guides-data";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { X, ShieldCheck } from "lucide-react";

export default function Tools() {
  const [tipDismissed, setTipDismissed] = useLocalStorage("remiendos-tools-tip-dismissed", false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Herramientas y materiales</h1>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          Estas son las cosas básicas que deberías tener en casa para empezar a remendar. No necesitas comprar todo de una vez — ve armando tu kit poco a poco.
        </p>
      </div>

      {/* First-visit tip */}
      {!tipDismissed && (
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20 relative">
          <button
            onClick={() => setTipDismissed(true)}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-sm font-semibold text-foreground mb-1">💡 ¿Recién empiezas?</p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            No necesitas todo para comenzar. Tu <strong>set mínimo</strong> para el 90% de los arreglos es solo: <strong>aguja · hilo · tijera</strong>. Puedes ir sumando el resto poco a poco.
          </p>
        </div>
      )}

      {/* Tools list */}
      <div className="space-y-3">
        {TOOLS.map((tool) => (
          <div
            key={tool.name}
            className="bg-card rounded-2xl p-4 border border-border shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{tool.icon}</span>
              <div>
                <h3 className="font-semibold text-foreground">{tool.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{tool.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security tips */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Consejos de seguridad</h2>
        </div>
        <div className="space-y-3">
          {SECURITY_TIPS.map((tip) => (
            <div key={tip.title} className="bg-primary/5 rounded-2xl p-4 border border-primary/20">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{tip.icon}</span>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{tip.title}</h3>
                  <p className="text-sm text-foreground/80 mt-0.5 leading-relaxed">{tip.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}