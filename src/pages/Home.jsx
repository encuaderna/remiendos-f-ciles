import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Recycle, ClipboardCheck, Wrench, ChevronRight, Map } from "lucide-react";
import { GUIDES } from "@/lib/guides-data";
import { useLocalStorage } from "@/lib/useLocalStorage";
import Onboarding from "@/components/Onboarding";

const SECTIONS = [
{ path: "/herramientas", label: "Herramientas y materiales", desc: "Lo básico que necesitas en casa", icon: Wrench, color: "bg-primary/10 text-primary" },
{ path: "/guias", label: "Guías paso a paso", desc: "Aprende a remendar y arreglar", icon: BookOpen, color: "bg-primary/15 text-primary" },
{ path: "/reciclaje", label: "Reciclaje textil", desc: "Dale nueva vida a tu ropa vieja", icon: Recycle, color: "bg-secondary text-foreground" },
{ path: "/progreso", label: "Mi progreso y notas", desc: "Marca lo que aprendiste", icon: ClipboardCheck, color: "bg-muted/50 text-muted-foreground" },
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
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Remiendos Fáciles
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Aprende a remendar, arreglar y reciclar tu ropa en casa. Sin experiencia previa, paso a paso.
          </p>
        </section>

        {/* Progress */}
        {done > 0 && (
          <section className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Tu progreso</span>
              <span className="text-sm font-semibold text-primary">{done}/{total} guías</span>
            </div>
            <div className="w-full bg-muted/50 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </section>
        )}

        {/* Recommended route */}
        {recommendedGuides.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Map className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-foreground text-sm">Tu ruta recomendada</h2>
            </div>
            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20 space-y-2">
              {recommendedGuides.map((guide, idx) => (
                <Link
                  key={guide.id}
                  to={`/guias/${guide.id}`}
                  className="flex items-center gap-3 group"
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    completed.includes(guide.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/20 text-primary"
                  }`}>
                    {completed.includes(guide.id) ? "✓" : idx + 1}
                  </span>
                  <span className={`text-sm font-medium group-hover:text-primary transition-colors ${
                    completed.includes(guide.id) ? "text-muted-foreground line-through" : "text-foreground"
                  }`}>
                    {guide.title}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">{guide.time}</span>
                </Link>
              ))}
              <button
                onClick={() => { setOnboardingDone(false); setProfile(null); }}
                className="text-xs text-primary hover:underline mt-1 block"
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
              className="flex items-center gap-4 bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-foreground text-base">{label}</h2>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          ))}
        </section>

        {/* Tip */}
        <section className="bg-primary/5 rounded-2xl p-5 border border-primary/20">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-semibold">💡 Consejo:</span> Agrega esta app a tu pantalla de inicio para acceder rápido, incluso sin conexión. Tu progreso y notas se guardan en tu dispositivo.
          </p>
        </section>
      </div>
    </>
  );
}