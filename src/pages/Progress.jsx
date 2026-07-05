import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Trash2, ChevronRight } from "lucide-react";
import { GUIDES, LEVELS } from "@/lib/guides-data";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Progress() {
  const [completed, setCompleted] = useLocalStorage("remiendos-completed", []);
  const [notes, setNotes] = useLocalStorage("remiendos-notes", {});
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState("");

  const total = GUIDES.length;
  const done = completed.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const toggleGuide = (id) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const startNote = (id) => {
    setEditingNote(id);
    setNoteText(notes[id] || "");
  };

  const saveNote = (id) => {
    setNotes((prev) => {
      const updated = { ...prev };
      if (noteText.trim()) {
        updated[id] = noteText.trim();
      } else {
        delete updated[id];
      }
      return updated;
    });
    setEditingNote(null);
    setNoteText("");
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
    }
  };

  const levelColors = {
    basico: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    intermedio: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    avanzado: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">Mi progreso y mis notas</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm">
          Marca las guías que completaste y anota lo que quieras recordar. Todo se guarda en tu navegador.
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
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

      {/* Guides list */}
      <div className="space-y-3">
        {GUIDES.map((guide) => {
          const isDone = completed.includes(guide.id);
          const hasNote = !!notes[guide.id];
          const isEditing = editingNote === guide.id;

          return (
            <div
              key={guide.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
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
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[guide.level]}`}>
                      {LEVELS[guide.level].label}
                    </span>
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
                        className="text-sm min-h-[80px] rounded-xl"
                        autoFocus
                      />
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
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{notes[guide.id]}</p>
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