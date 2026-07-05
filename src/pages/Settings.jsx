import React, { useState } from "react";
import { Trash2, Moon, Sun, Monitor, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/useLocalStorage";

const STORAGE_KEYS = [
  "remiendos-completed",
  "remiendos-notes",
  "remiendos-favorites",
  "remiendos-last-visited",
  "remiendos-profile",
  "remiendos-onboarding-done",
  "remiendos-tools-tip-dismissed",
  "remiendos-inspiration",
];

const THEME_OPTIONS = [
  { value: "system", label: "Automático (sistema)", icon: Monitor },
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Oscuro", icon: Moon },
];

export default function Settings() {
  const [darkPref, setDarkPref] = useLocalStorage("remiendos-dark", "system");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDeleteData = () => {
    STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    setDeleted(true);
    setConfirmDelete(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Ajustes</h1>
        <p className="text-muted-foreground mt-1 text-sm">Preferencias de la app y gestión de tus datos.</p>
      </div>

      {/* Theme */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-sm space-y-3">
        <h2 className="font-semibold text-foreground">Apariencia</h2>
        <div className="grid grid-cols-3 gap-2">
          {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
            const active = darkPref === value || (value === "system" && darkPref !== "dark" && darkPref !== "light" && darkPref !== true && darkPref !== false);
            return (
              <button
                key={value}
                onClick={() => setDarkPref(value)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-sm font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-accent"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs text-center leading-tight">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Account / Data deletion */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-sm space-y-4">
        <h2 className="font-semibold text-foreground">Mis datos</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Toda tu información (progreso, notas, favoritas e inspiración) se almacena localmente en este dispositivo. Puedes eliminarla en cualquier momento.
        </p>

        {deleted ? (
          <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 text-sm text-primary font-medium text-center">
            ✓ Todos tus datos fueron eliminados.
          </div>
        ) : confirmDelete ? (
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 space-y-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive font-medium">Esta acción es permanente e irreversible. ¿Confirmas que deseas eliminar todo tu progreso, notas y favoritas?</p>
            </div>
            <div className="flex gap-2">
              <Button variant="destructive" size="sm" onClick={handleDeleteData} className="rounded-lg">
                Sí, eliminar todo
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)} className="rounded-lg">
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-2 text-sm text-destructive hover:underline font-medium"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar todos mis datos
          </button>
        )}
      </div>

      {/* App info */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-sm space-y-2">
        <h2 className="font-semibold text-foreground">Sobre la app</h2>
        <p className="text-sm text-muted-foreground">Remiendos Fáciles · Versión 1.0</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Esta app no recopila ni transmite datos personales. Todo se guarda localmente en tu dispositivo.
        </p>
      </div>
    </div>
  );
}