import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Recycle, ClipboardCheck, Wrench, ChevronRight, Map } from "lucide-react";
import { GUIDES } from "@/lib/guides-data";
import { useLocalStorage } from "@/lib/useLocalStorage";
import Onboarding from "@/components/Onboarding";

const SECTIONS = [
  { path: "/herramientas", label: "Herramientas y materiales", desc: "Lo básico que necesitas en casa", icon: Wrench, color: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400" },
  { path: "/guias", label: "Guías paso a paso", desc: "Aprende a remendar y arreglar", icon: BookOpen, color: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400" },
  { path: "/reciclaje", label: "Reciclaje textil", desc: "Dale nueva vida a tu ropa vieja", icon: Recycle, color: "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-400" },
  { path: "/progreso", label: "Mi progreso y notas", desc: "Marca lo que aprendiste", icon: ClipboardCheck, color: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400" },
];

// Map user answers to recommended guide IDs
function getRecommendedGuides(profile) {
  if (!profile) return [];
  const { level, goal, time } = profile;

  if (goal === "reciclar") return ["parche", "elastico", "deshacer-chaleco", "transformar-ropa"];
  if (level === "nunca" || time === "poco") return ["boton", "costura-abierta", "parche", "basta"];
  if (level === "experiencia") return ["punto-corrido", "elastico", "deshacer-chaleco", "transformar-ropa"];
  return ["boton", "parche", "costura-abierta", "basta"];
}

export default function Home() {
  const [completed] = useLocalStorage("remiendos-completed", []);
  const [profile, setProfile] = useLocalStorage("remiendos-profile", null);
  const [onboardingDone, setOnboardingDone] = useLocalStorage("remiendos-onboarding-done", false);

  const total = GUIDES.length;
  const done = completed.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const handleOnboardingFinish = (answers) => {
    setProfile(answers);
    setOnboardingDone(true);
  };

  const recommended = getRecommendedGuides(profile);
  const recommendedGuides = recommended.map((id) => GUIDES.find((g) => g.id === id)).filter(Boolean);

  return (
    <>
      {!onboardingDone && <Onboarding onFinish={handleOnboardingFinish} />}

      <div className="space-y-8">
        {/* Hero */}
        <section className="text-center space-y-3 pt-2">
          <span className="text-5xl">🧵</span>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Remiendos Fáciles
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Aprende a remendar, arreglar y reciclar tu ropa en casa. Sin experiencia previa, paso a paso.
          </p>
        </section>

        {/* Progress */}
        {done > 0 && (
          <section className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tu progreso</span>
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">{done}/{total} guías</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2.5">
              <div
                className="bg-amber-500 dark:bg-amber-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </section>
        )}

        {/* Recommended route */}
        {recommendedGuides.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Map className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Tu ruta recomendada</h2>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-800/40 space-y-2">
              {recommendedGuides.map((guide, idx) => (
                <Link
                  key={guide.id}
                  to={`/guias/${guide.id}`}
                  className="flex items-center gap-3 group"
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    completed.includes(guide.id)
                      ? "bg-emerald-500 text-white"
                      : "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200"
                  }`}>
                    {completed.includes(guide.id) ? "✓" : idx + 1}
                  </span>
                  <span className={`text-sm font-medium group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors ${
                    completed.includes(guide.id) ? "text-zinc-400 line-through" : "text-zinc-800 dark:text-zinc-200"
                  }`}>
                    {guide.title}
                  </span>
                  <span className="text-xs text-zinc-400 ml-auto">{guide.time}</span>
                </Link>
              ))}
              <button
                onClick={() => { setOnboardingDone(false); setProfile(null); }}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline mt-1 block"
              >
                Cambiar mi perfil
              </button>
            </div>
          </section>
        )}

        {/* Sections */}
        <section className="space-y-3">
          {SECTIONS.map(({ path, label, desc, icon: Icon, color }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center gap-4 bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-zinc-900 dark:text-zinc-100 text-base">{label}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
            </Link>
          ))}
        </section>

        {/* Tip */}
        <section className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-800/40">
          <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-semibold">💡 Consejo:</span> Agrega esta app a tu pantalla de inicio para acceder rápido, incluso sin conexión. Tu progreso y notas se guardan en tu dispositivo.
          </p>
        </section>
      </div>
    </>
  );
}