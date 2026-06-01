"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { PerformancePath } from "@/components/PerformancePath";
import { sprintSongs, moodOptions } from "@/lib/data";
import { Play, MoreHorizontal, Sparkles } from "lucide-react";
import clsx from "clsx";

const goals = [
  { id: "max", label: "Max speed" },
  { id: "consistency", label: "Consistency" },
  { id: "endurance", label: "Endurance" },
];

export default function SprintingActivity() {
  const [mood, setMood] = useState("stressed");
  const [energy, setEnergy] = useState(40);
  const [activeGoals, setActiveGoals] = useState<string[]>(["max", "consistency"]);

  const toggleGoal = (id: string) =>
    setActiveGoals((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));

  return (
    <div>
      <Header
        back="/"
        title="Sprinting"
        subtitle="Drake Stadium · 30 min from now"
        right={
          <button className="w-10 h-10 rounded-full bg-white shadow-soft border border-black/5 grid place-items-center">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        }
      />

      {/* Hero */}
      <div className="px-5">
        <div className="rounded-3xl bg-gradient-to-br from-[#FFE3D1] to-[#FFB48A] p-5 shadow-card">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ink/70 font-semibold">
            Tonight&apos;s session
          </div>
          <h1 className="mt-1 text-[28px] font-semibold tracking-tight text-balance leading-tight">
            6 × 100m sprints,
            <br />
            <span className="text-ink/70 font-medium">
              cued to your nervous system.
            </span>
          </h1>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat label="PB" value="10.92s" />
            <Stat label="Confidence" value="82" />
            <Stat label="Trend" value="+6%" tone="up" />
          </div>
        </div>
      </div>

      {/* Mood */}
      <section className="mt-6 px-5">
        <Label>How are you feeling right now?</Label>
        <div className="mt-3 -mx-5 px-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {moodOptions.map((m) => (
            <button
              key={m.id}
              onClick={() => setMood(m.id)}
              className={clsx(
                "shrink-0 px-3 py-2 rounded-2xl border transition flex items-center gap-1.5 text-[13px] font-medium",
                mood === m.id
                  ? "bg-ink text-white border-ink shadow-soft"
                  : "bg-paper-card text-ink border-black/5"
              )}
            >
              <span>{m.emoji}</span>
              {m.label}
            </button>
          ))}
        </div>
      </section>

      {/* Energy slider */}
      <section className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <Label>Energy in your body</Label>
          <span className="text-[12px] font-medium text-ink-muted">{energy}%</span>
        </div>
        <div className="mt-3 rounded-3xl bg-paper-card border border-black/5 shadow-soft p-4">
          <input
            type="range"
            min={0}
            max={100}
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full accent-accent-flame"
          />
          <div className="mt-1 flex justify-between text-[11px] text-ink-muted">
            <span>Heavy legs</span>
            <span>Lit</span>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="mt-6 px-5">
        <Label>Workout goals</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {goals.map((g) => {
            const active = activeGoals.includes(g.id);
            return (
              <button
                key={g.id}
                onClick={() => toggleGoal(g.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-full text-[13px] font-medium border transition",
                  active
                    ? "bg-accent-flame text-white border-accent-flame shadow-soft"
                    : "bg-paper-card text-ink border-black/5"
                )}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* AI suggestion banner */}
      <section className="mt-6 px-5">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-paper-card border border-black/5 shadow-soft p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-paper-warm grid place-items-center text-accent-flame">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-semibold">
                AI noticed
              </div>
              <div className="mt-1 text-[14px] text-ink leading-snug">
                You&apos;re <span className="font-semibold">stressed</span> with{" "}
                <span className="font-semibold">low energy</span>. On past nights
                like this, high-tempo confidence tracks lifted your splits by{" "}
                <span className="text-accent-flame font-semibold">~6%</span>.
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* THE PATH */}
      <section className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <Label>Your performance path</Label>
          <Link
            href="/builder/sprinting"
            className="text-[12px] font-medium text-accent-flame"
          >
            Edit songs →
          </Link>
        </div>
        <p className="mt-1 text-[12px] text-ink-muted leading-relaxed">
          Each node is a song. The curve is how the AI thinks they&apos;ll move
          your performance — based on your past sessions.
        </p>

        <div className="mt-3">
          <PerformancePath songs={sprintSongs} activitySlug="sprinting" />
        </div>
      </section>

      {/* Start CTA */}
      <section className="px-5 mt-6">
        <Link
          href="/summary/sprinting"
          className="block rounded-2xl bg-ink text-white py-4 text-center font-semibold tracking-tight active:scale-[0.99] transition shadow-card"
        >
          <span className="inline-flex items-center gap-2">
            <Play className="w-4 h-4 fill-white" />
            Start workout
          </span>
        </Link>
        <p className="mt-3 text-center text-[11px] text-ink-muted">
          Tap any song node to reflect on its impact.
        </p>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up" | "down";
}) {
  return (
    <div className="rounded-2xl bg-white/60 backdrop-blur px-2 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-ink/60 font-semibold">
        {label}
      </div>
      <div
        className={clsx(
          "mt-0.5 text-[16px] font-semibold tracking-tight",
          tone === "up" && "text-emerald-700",
          tone === "down" && "text-rose-700"
        )}
      >
        {value}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
      {children}
    </div>
  );
}
