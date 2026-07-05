import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    key: "level",
    question: "¿Cuál es tu nivel de costura?",
    emoji: "🧵",
    options: [
      { value: "nunca", label: "Nunca he cosido", desc: "Empezamos desde cero, sin apuro." },
      { value: "basico", label: "Ya sé lo básico", desc: "Conozco la aguja y el hilo." },
      { value: "experiencia", label: "Tengo experiencia", desc: "He cosido antes varias veces." },
    ],
  },
  {
    key: "goal",
    question: "¿Qué quieres lograr?",
    emoji: "🎯",
    options: [
      { value: "arreglar", label: "Arreglar mi ropa", desc: "Remendar, coser botones, costuras." },
      { value: "reciclar", label: "Reciclar prendas", desc: "Transformar ropa vieja en algo nuevo." },
      { value: "aprender", label: "Aprender a coser", desc: "Dominar la técnica paso a paso." },
    ],
  },
  {
    key: "time",
    question: "¿Cuánto tiempo tienes para practicar?",
    emoji: "⏱️",
    options: [
      { value: "poco", label: "10–15 min", desc: "Proyectos rápidos y concretos." },
      { value: "medio", label: "30 min", desc: "Con calma y sin apuros." },
      { value: "mucho", label: "Más de 30 min", desc: "Me puedo sentar a aprender bien." },
    ],
  },
];

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = STEPS[step];

  const select = (value) => {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onFinish(next);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-primary" : i < step ? "w-2 bg-primary/50" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        <div className="text-center space-y-2">
          <span className="text-5xl">{current.emoji}</span>
          <h2 className="font-heading text-xl font-bold text-foreground">{current.question}</h2>
        </div>

        <div className="space-y-3">
          {current.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => select(opt.value)}
              className="w-full text-left bg-card border border-border rounded-2xl p-4 hover:border-primary hover:shadow-md transition-all group"
            >
              <p className="font-semibold text-foreground group-hover:text-primary">{opt.label}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{opt.desc}</p>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Puedes ajustar tu ruta cuando quieras desde el inicio.
        </p>

        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="w-full text-center text-sm text-muted-foreground hover:text-foreground">
            ← Volver
          </button>
        )}
      </div>
    </div>
  );
}