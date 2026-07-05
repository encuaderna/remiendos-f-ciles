import React, { useRef, useState, useEffect } from "react";
import { Camera, X, ZoomIn } from "lucide-react";

// Compress image to base64 via canvas to avoid hitting localStorage ~5MB limit
function compressImage(file, maxWidth = 1200, quality = 0.75) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

function loadPhotos(guideId) {
  try {
    return JSON.parse(localStorage.getItem(`remiendos-photos-${guideId}`)) || [];
  } catch {
    return [];
  }
}

function savePhotos(guideId, photos) {
  try {
    localStorage.setItem(`remiendos-photos-${guideId}`, JSON.stringify(photos));
  } catch {
    // Storage quota exceeded — silently fail
  }
}

export default function PhotoGallery({ guideId }) {
  // Re-initialize state when guideId changes (fix: hook with dynamic key)
  const [photos, setPhotosState] = useState(() => loadPhotos(guideId));
  const [lightbox, setLightbox] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setPhotosState(loadPhotos(guideId));
    setLightbox(null);
  }, [guideId]);

  const setPhotos = (updater) => {
    setPhotosState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      savePhotos(guideId, next);
      return next;
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      const dataUrl = await compressImage(file);
      if (!dataUrl) continue;
      setPhotos((prev) => [
        ...prev,
        { dataUrl, label: "", date: new Date().toLocaleDateString("es-CL") },
      ]);
    }
    e.target.value = "";
  };

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
    // Fix: adjust lightbox index after removal
    setLightbox((prev) => {
      if (prev === null) return null;
      if (prev === idx) return null;
      if (prev > idx) return prev - 1;
      return prev;
    });
  };

  const updateLabel = (idx, label) => {
    setPhotos((prev) => prev.map((p, i) => (i === idx ? { ...p, label } : p)));
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
          <Camera className="h-5 w-5 text-zinc-500" /> Mis fotos del trabajo
        </h2>
        <button
          onClick={() => inputRef.current?.click()}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/60 transition-colors"
        >
          + Agregar foto
        </button>
        {/* No capture="environment" — allows gallery + camera on mobile, files on desktop */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {photos.length === 0 ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl py-8 flex flex-col items-center gap-2 text-zinc-400 hover:border-amber-400 hover:text-amber-500 transition-colors"
        >
          <Camera className="h-8 w-8" />
          <span className="text-sm">Toca para subir fotos del antes y después</span>
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((photo, idx) => (
            <div key={idx} className="relative group aspect-square">
              <img
                src={photo.dataUrl}
                alt={photo.label || `Foto ${idx + 1}`}
                className="w-full h-full object-cover rounded-xl cursor-pointer"
                onClick={() => setLightbox(idx)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="h-5 w-5 text-white drop-shadow" />
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removePhoto(idx); }}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Eliminar foto"
              >
                <X className="h-3 w-3" />
              </button>
              {photo.date && (
                <span className="absolute bottom-1 left-1 text-xs bg-black/50 text-white rounded px-1 pointer-events-none">
                  {photo.date}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && photos[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-sm space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightbox].dataUrl}
              alt={photos[lightbox].label || `Foto ${lightbox + 1}`}
              className="w-full rounded-2xl object-contain max-h-[65vh]"
            />
            <input
              type="text"
              value={photos[lightbox].label}
              onChange={(e) => updateLabel(lightbox, e.target.value)}
              placeholder="Agrega una descripción (ej: antes, después…)"
              className="w-full text-sm rounded-xl border border-zinc-600 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-zinc-400"
            />
            <div className="flex gap-2">
              <button
                onClick={() => removePhoto(lightbox)}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium transition-colors"
              >
                Eliminar foto
              </button>
              <button
                onClick={() => setLightbox(null)}
                className="flex-1 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}