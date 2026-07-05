import React, { useState } from "react";
import { Share2, X, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CompletionModal({ guide, onClose }) {
  const [shareText, setShareText] = useState(
    `¡Acabo de aprender a "${guide.title}" con Remiendos Fáciles 🧵 ¡Dale una segunda vida a tu ropa!`
  );
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: guide.title, text: shareText, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText + " " + url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      // User cancelled or permission denied — no action needed
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40">
      <div className="bg-card rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-5 relative border border-border">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-2">
          <span className="text-5xl">🎉</span>
          <h2 className="font-heading text-xl font-bold text-foreground">¡Lo lograste!</h2>
          <p className="text-sm text-muted-foreground">
            Completaste <span className="font-semibold text-primary">"{guide.title}"</span>. ¡Un paso más en tu camino costurero!
          </p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Personaliza tu mensaje</label>
          <textarea
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            rows={3}
            className="w-full text-sm rounded-xl border border-input bg-background p-3 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleShare}
            className="flex-1 rounded-xl flex items-center justify-center gap-2"
          >
            {copied ? <CheckCheck className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {copied ? "¡Copiado!" : "Compartir logro"}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-xl"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}