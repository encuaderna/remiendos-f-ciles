import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Trash2, ChevronRight, Heart, ArrowRight } from "lucide-react";
import { GUIDES, LEVELS } from "@/lib/guides-data";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const NOTE_TAGS = ["Me faltó práctica", "Me quedó bien", "Quiero repetir"];

const levelColors = {
  basico: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  intermedio: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  avanzado: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

const byLevel = (level) => GUIDES.filter((g) => g.level === level);

export default function Progress() {
  const [completed, setCompleted] = useLocalStorage("remiendos-completed", []);
  const [notes, setNotes] = useLocalStorage("remiendos-notes", {});
  const [favorites] = useLocalStorage("remiendos-favorites", []);
  const [lastVisited] = useLocalStorage("remiendos-last-visited", null);
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [noteTag, setNoteTag] = useState("");
  const [activeTab, setActiveTab] = useState("todas"); // "todas" | "favoritas"

  const total = GUIDES.length;
  const done = completed.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const lastGuide = lastVisited ? GUIDES.find((g) => g.id === lastVisited) : null;
  const favGuides = GUIDES.filter((g) => favorites.includes(g.id));
  const displayGuides = activeTab === "favoritas" ? favGuides : GUIDES;

  const toggleGuide = (id) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const startNote = (id) => {
    setEditingNote(id);
    const existing = notes[id] || {};
    setNoteText(existing.text || "");
    setNoteTag(existing.tag || "");
  };

  const saveNote = (id) => {
    setNotes((prev) => {
      const updated = { ...prev };
      if (noteText.trim()) {
        updated[id] = { text: noteText.trim(), tag: noteTag };
      } else {
        delete updated[id];
      }
      return updated;
    });
    setEditingNote(null);
    setNoteText("");
    setNoteTag("");
  };

  const deleteNote = (id) => {
    setNotes((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    if (editingNote === id) {
      setEditingNote(null);
      setNoteText("");
      setNoteTag("");
    }
  };

  const levels = ["basico", "intermedio", "avanzado"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">Mi progreso y mis notas</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm">
          Marca las guías que completaste y anota lo que quieras recordar. Todo se guarda en tu navegador.
        </p>
      </div>

      {/* Progress overview */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Progreso general</span>
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">{done}/{total} guías ({pct}%)</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3">
            <div
              className="bg-amber-500 dark:bg-amber-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          {done === total && total > 0 && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 font-medium">🎉 ¡Completaste todas las guías! Eres un experto en remiendos.</p>
          )}
        </div>

        {/* By level bars */}
        <div>
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">Por nivel</p>
          <div className="space-y-2">
            {levels.map((level) => {
              const levelGuides = byLevel(level);
              const levelDone = levelGuides.filter((g) => completed.includes(g.id)).length;
              const levelPct = levelGuides.length > 0 ? Math.round((levelDone / levelGuides.length) * 100) : 0;
              const barColors = {
                basico: "bg-emerald-500",
                intermedio: "bg-amber-500",
                avanzado: "bg-rose-500",
              };
              return (
                <div key={level} className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 w-24 flex-shrink-0">{LEVELS[level].emoji} {LEVELS[level].label}</span>
                  <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                    <div className={`${barColors[level]} h-2 rounded-full transition-all duration-500`} style={{ width: `${levelPct}%` }} />
                  </div>
                  <span className="text-xs text-zinc-400 w-10 text-right">{levelDone}/{levelGuides.length}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Continue where you left off */}
      {lastGuide && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-800/40">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2 uppercase tracking-wide">Continuar donde quedaste</p>
          <Link to={`/guias/${lastGuide.id}`} className="flex items-center justify-between group">
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">{lastGuide.title}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{lastGuide.time}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
        {[{ key: "todas", label: "Todas las guías" }, { key: "favoritas", label: `❤️ Mis favoritas (${favGuides.length})` }].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === key ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Guides list */}
      <div className="space-y-3">
        {displayGuides.length === 0 && activeTab === "favoritas" && (
          <div className="text-center py-10 space-y-2">
            <Heart className="h-8 w-8 text-zinc-300 dark:text-zinc-600 mx-auto" />
            <p className="text-sm text-zinc-400">Aún no tienes guías favoritas.</p>
            <p className="text-xs text-zinc-400">Toca el ❤️ en cualquier guía para agregarla.</p>
          </div>
        )}
        {displayGuides.map((guide) => {
          const isDone = completed.includes(guide.id);
          const isFav = favorites.includes(guide.id);
          const rawNote = notes[guide.id];
          // Support both old string format and new {text, tag} format
          const noteData = rawNote && typeof rawNote === "string" ? { text: rawNote, tag: "" } : rawNote;
          const hasNote = !!noteData?.text;
          const isEditing = editingNote === guide.id;

          return (
            <div
              key={guide.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleGuide(guide.id)}
                  className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors mt-0.5 ${
                    isDone
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-zinc-300 dark:border-zinc-600 hover:border-amber-400"
                  }`}
                  aria-label={isDone ? "Desmarcar guía" : "Marcar como completada"}
                >
                  {isDone && <Check className="h-4 w-4" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[guide.level]}`}>
                      {LEVELS[guide.level].label}
                    </span>
                    {isFav && <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium text-sm ${isDone ? "text-zinc-400 dark:text-zinc-500 line-through" : "text-zinc-900 dark:text-zinc-100"}`}>
                      {guide.title}
                    </h3>
                    <Link to={`/guias/${guide.id}`} className="text-amber-600 dark:text-amber-400 hover:underline ml-2 flex-shrink-0">
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Note */}
                  {isEditing ? (
                    <div className="mt-3 space-y-2">
                      <Textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Escribe tu nota aquí..."
                        className="text-sm min-h-[70px] rounded-xl"
                        autoFocus
                      />
                      {/* Quick tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {NOTE_TAGS.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setNoteTag(noteTag === tag ? "" : tag)}
                            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                              noteTag === tag
                                ? "bg-amber-500 border-amber-500 text-white"
                                : "border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 hover:border-amber-400"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveNote(guide.id)} className="rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs">
                          Guardar
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingNote(null)} className="rounded-lg text-xs">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : hasNote ? (
                    <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-200 dark:border-amber-800/40">
                      {noteData.tag && (
                        <span className="inline-block text-xs bg-amber-200 dark:bg-amber-800/60 text-amber-800 dark:text-amber-300 rounded-full px-2 py-0.5 mb-1">
                          {noteData.tag}
                        </span>
                      )}
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{noteData.text || noteData}</p>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => startNote(guide.id)} className="text-xs text-amber-700 dark:text-amber-400 hover:underline">Editar</button>
                        <button onClick={() => deleteNote(guide.id)} className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-0.5">
                          <Trash2 className="h-3 w-3" /> Borrar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => startNote(guide.id)}
                      className="mt-1.5 text-xs text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      + Agregar nota
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}