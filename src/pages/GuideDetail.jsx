import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, AlertTriangle, Lightbulb, Package, Share2, Copy, CheckCheck, Heart, Clock, Star } from "lucide-react";
import { GUIDES, LEVELS } from "@/lib/guides-data";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { Button } from "@/components/ui/button";
import CompletionModal from "@/components/CompletionModal";
import PhotoGallery from "@/components/PhotoGallery";

const levelColors = {
  basico: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  intermedio: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  avanzado: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

const DifficultyStars = ({ difficulty }) => (
  <span className="flex gap-0.5">
    {[1, 2, 3].map((i) => (
      <Star key={i} className={`h-3.5 w-3.5 ${i <= difficulty ? "text-amber-500 fill-amber-500" : "text-zinc-300 dark:text-zinc-600"}`} />
    ))}
  </span>
);

export default function GuideDetail() {
  const { id } = useParams();
  const guide = GUIDES.find((g) => g.id === id);
  const [completed, setCompleted] = useLocalStorage("remiendos-completed", []);
  const [favorites, setFavorites] = useLocalStorage("remiendos-favorites", []);
  const [lastVisited, setLastVisited] = useLocalStorage("remiendos-last-visited", null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Track last visited
  useEffect(() => {
    if (guide) setLastVisited(guide.id);
  }, [id]);

  if (!guide) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-zinc-500 dark:text-zinc-400">Guía no encontrada</p>
        <Link to="/guias" className="text-amber-700 dark:text-amber-400 underline">Volver a guías</Link>
      </div>
    );
  }

  const isDone = completed.includes(guide.id);
  const isFav = favorites.includes(guide.id);

  const toggleDone = () => {
    const wasNotDone = !isDone;
    setCompleted((prev) =>
      prev.includes(guide.id) ? prev.filter((x) => x !== guide.id) : [...prev, guide.id]
    );
    if (wasNotDone) setShowModal(true);
  };

  const toggleFav = () => {
    setFavorites((prev) =>
      prev.includes(guide.id) ? prev.filter((x) => x !== guide.id) : [...prev, guide.id]
    );
  };

  const shareUrl = window.location.href;
  const shareText = `🧵 Aprendí a "${guide.title}" con Remiendos Fáciles. ¡Dale una segunda vida a tu ropa!`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: guide.title, text: shareText, url: shareUrl });
      } else {
        setShowShareMenu((v) => !v);
      }
    } catch (e) {
      // User cancelled — no action needed
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => { setCopied(false); setShowShareMenu(false); }, 2000);
    } catch (e) {
      setShowShareMenu(false);
    }
  };

  const easierGuide = guide.easier ? GUIDES.find((g) => g.id === guide.easier) : null;
  const nextGuide = guide.next ? GUIDES.find((g) => g.id === guide.next) : null;

  return (
    <div className="space-y-6">
      {showModal && <CompletionModal guide={guide} onClose={() => setShowModal(false)} />}

      {/* Top nav */}
      <div className="flex items-center justify-between">
        <Link to="/guias" className="inline-flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
          <ArrowLeft className="h-4 w-4" /> Volver a guías
        </Link>

        <div className="flex items-center gap-3">
          {/* Favorite */}
          <button
            onClick={toggleFav}
            className={`transition-colors ${isFav ? "text-rose-500" : "text-zinc-400 hover:text-rose-400"}`}
            aria-label={isFav ? "Quitar de favoritas" : "Agregar a favoritas"}
          >
            <Heart className={`h-5 w-5 ${isFav ? "fill-rose-500" : ""}`} />
          </button>

          {/* Share */}
          <div className="relative">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <Share2 className="h-4 w-4" /> Compartir
            </button>
            {showShareMenu && (
              <div className="absolute right-0 top-8 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-2 w-48 space-y-1">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => setShowShareMenu(false)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  <span>💬</span> WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => setShowShareMenu(false)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  <span>𝕏</span> Twitter / X
                </a>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  {copied ? <CheckCheck className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Link copiado' : 'Copiar link'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${levelColors[guide.level]}`}>
            {LEVELS[guide.level].emoji} {LEVELS[guide.level].label}
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <Clock className="h-3.5 w-3.5" /> {guide.time}
          </span>
          <DifficultyStars difficulty={guide.difficulty} />
        </div>
        <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">{guide.title}</h1>
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

      {/* Photo gallery */}
      <PhotoGallery key={guide.id} guideId={guide.id} />

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

      {/* Contextual navigation */}
      {(easierGuide || nextGuide) && (
        <div className="space-y-3">
          {easierGuide && (
            <div className="bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Si te resultó difícil, prueba antes:</p>
              <Link
                to={`/guias/${easierGuide.id}`}
                className="flex items-center justify-between text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-amber-700 dark:hover:text-amber-400 group"
              >
                <span>← {easierGuide.title}</span>
                <span className="text-xs text-zinc-400">{easierGuide.time}</span>
              </Link>
            </div>
          )}
          {nextGuide && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-800/40">
              <p className="text-xs text-amber-700 dark:text-amber-400 mb-2">¿Lista para más? Continúa con:</p>
              <Link
                to={`/guias/${nextGuide.id}`}
                className="flex items-center justify-between text-sm font-medium text-amber-900 dark:text-amber-200 hover:text-amber-700 group"
              >
                <span>{nextGuide.title} →</span>
                <span className="text-xs text-amber-600 dark:text-amber-500">{nextGuide.time}</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}