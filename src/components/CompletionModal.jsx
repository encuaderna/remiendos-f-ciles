import React, { useState } from "react";
import { Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CompletionModal({ guide, onClose }) {
  const [shareText, setShareText] = useState(
    `¡Acabo de aprender a "${guide.title}" con Remiendos Fáciles 🧵 ¡Dale una segunda vida a tu ropa!`
  );

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: guide.title, text: shareText, url });
    } else {
      await navigator.clipboard.writeText(shareText + " " + url);
      alert("¡Copiado al portapapeles!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-5 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-2">
          <span className="text-5xl">🎉</span>
          <h2 className="font-heading text-xl font-bold text-zinc-900 dark:text-zinc-100">¡Lo lograste!</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Completaste <span className="font-semibold text-amber-700 dark:text-amber-400">"{guide.title}"</span>. ¡Un paso más en tu camino costurero!
          </p>
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1 block">Personaliza tu mensaje</label>
          <textarea
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            rows={3}
            className="w-full text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 text-zinc-800 dark:text-zinc-200 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleShare}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white rounded-xl flex items-center justify-center gap-2"
          >
            <Share2 className="h-4 w-4" /> Compartir logro
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-xl text-zinc-500"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}