import React, { useRef, useState } from "react";
import { Sparkles, Plus, X, ZoomIn, Pencil, Check } from "lucide-react";

const TAGS = ["Transformar", "Parche", "Teñir", "Recortar", "Remendar", "Otro"];

function loadIdeas() {
  try { return JSON.parse(localStorage.getItem("remiendos-inspiration")) || []; }
  catch { return []; }
}
function saveIdeas(ideas) {
  try { localStorage.setItem("remiendos-inspiration", JSON.stringify(ideas)); }
  catch { /* quota */ }
}

function compressImage(file, maxWidth = 1000, quality = 0.72) {
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

export default function Inspiration() {
  const [ideas, setIdeas] = useState(loadIdeas);
  const [showForm, setShowForm] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const inputRef = useRef(null);

  // Form state
  const [formNote, setFormNote] = useState("");
  const [formTag, setFormTag] = useState("");
  const [formImage, setFormImage] = useState(null); // base64

  const persist = (next) => { setIdeas(next); saveIdeas(next); };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const dataUrl = await compressImage(file);
    if (dataUrl) setFormImage(dataUrl);
    e.target.value = "";
  };

  const handleAdd = () => {
    if (!formNote.trim() && !formImage) return;
    const newIdea = {
      id: Date.now(),
      note: formNote.trim(),
      tag: formTag,
      image: formImage,
      date: new Date().toLocaleDateString("es-CL"),
    };
    persist([newIdea, ...ideas]);
    setFormNote("");
    setFormTag("");
    setFormImage(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    persist(ideas.filter((i) => i.id !== id));
    if (lightbox?.id === id) setLightbox(null);
  };

  const startEdit = (idea) => {
    setEditingId(idea.id);
    setEditText(idea.note);
  };

  const saveEdit = (id) => {
    persist(ideas.map((i) => i.id === id ? { ...i, note: editText } : i));
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-500" /> Tablero de Inspiración
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Guarda ideas y fotos de prendas que quieres reciclar más adelante.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" /> Nueva idea
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-amber-200 dark:border-amber-800/40 shadow-sm space-y-4">
          <p className="font-semibold text-zinc-800 dark:text-zinc-100 text-sm">Agregar nueva idea</p>

          {/* Image picker */}
          <div
            onClick={() => inputRef.current?.click()}
            className={`relative rounded-xl border-2 border-dashed cursor-pointer transition-colors flex items-center justify-center overflow-hidden
              ${formImage ? "border-transparent h-40" : "border-zinc-300 dark:border-zinc-700 h-28 hover:border-amber-400"}`}
          >
            {formImage ? (
              <>
                <img src={formImage} alt="Vista previa" className="w-full h-full object-cover rounded-xl" />
                <button
                  onClick={(e) => { e.stopPropagation(); setFormImage(null); }}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <span className="text-sm text-zinc-400">📷 Toca para agregar una foto (opcional)</span>
            )}
          </div>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />

          {/* Note */}
          <textarea
            value={formNote}
            onChange={(e) => setFormNote(e.target.value)}
            placeholder="Escribe tu idea, ej: 'Convertir este jean en bolso'…"
            rows={3}
            className="w-full text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 text-zinc-800 dark:text-zinc-200 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-zinc-400"
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setFormTag(formTag === tag ? "" : tag)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  formTag === tag
                    ? "bg-amber-500 border-amber-500 text-white"
                    : "border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 hover:border-amber-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={!formNote.trim() && !formImage}
              className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-sm font-medium transition-colors"
            >
              Guardar idea
            </button>
            <button
              onClick={() => { setShowForm(false); setFormNote(""); setFormTag(""); setFormImage(null); }}
              className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {ideas.length === 0 && !showForm && (
        <div className="text-center py-16 space-y-3">
          <span className="text-5xl">✨</span>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Aún no tienes ideas guardadas.</p>
          <p className="text-xs text-zinc-400">Toca "Nueva idea" para empezar tu tablero.</p>
        </div>
      )}

      {/* Ideas grid */}
      {ideas.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col"
            >
              {/* Image */}
              {idea.image && (
                <div
                  className="relative group cursor-pointer aspect-video"
                  onClick={() => setLightbox(idea)}
                >
                  <img src={idea.image} alt="Inspiración" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
              )}

              <div className="p-3 flex-1 flex flex-col gap-2">
                {idea.tag && (
                  <span className="self-start text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-medium">
                    {idea.tag}
                  </span>
                )}

                {/* Note — editable inline */}
                {editingId === idea.id ? (
                  <div className="flex gap-1">
                    <input
                      autoFocus
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(idea.id)}
                      className="flex-1 text-xs rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <button onClick={() => saveEdit(idea.id)} className="text-emerald-600 dark:text-emerald-400">
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  idea.note && (
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed flex-1">{idea.note}</p>
                  )
                )}

                <div className="flex items-center justify-between mt-auto pt-1">
                  <span className="text-xs text-zinc-400">{idea.date}</span>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(idea)} className="text-zinc-400 hover:text-amber-500 transition-colors">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(idea.id)} className="text-zinc-400 hover:text-rose-500 transition-colors">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-sm w-full space-y-3" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image} alt="Inspiración" className="w-full rounded-2xl object-contain max-h-[70vh]" />
            {lightbox.note && <p className="text-white text-sm text-center px-2">{lightbox.note}</p>}
            <button
              onClick={() => setLightbox(null)}
              className="w-full py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}