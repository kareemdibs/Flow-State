"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { sprintSongs } from "@/lib/data";
import { ArrowRight, Sparkles } from "lucide-react";
import clsx from "clsx";

const impacts = [
  { label: "Energy", value: 12, color: "#FF5A1F" },
  { label: "Confidence", value: 8, color: "#FFD37A" },
  { label: "Focus", value: 15, color: "#7AB8FF" },
];

export default function WorkoutSummary() {
  return (
    <div>
      <Header back="/activity/sprinting" title="Workout summary" subtitle="Sprinting · just now" />

      {/* Score */}
      <section className="px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-[28px] bg-gradient-to-b from-[#0B0B10] to-[#1A1A22] text-white p-6 shadow-card relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent-flame/30 blur-3xl" />
          <div className="relative">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-semibold">
              Performance score
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <ScoreRing score={87} />
              <div>
                <div className="text-[12px] text-white/70 uppercase tracking-wider">
                  vs your average
                </div>
                <div className="text-[28px] font-semibold tracking-tight text-accent-glow">
                  +8.4%
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <Mini label="Best split" value="11.04s" />
              <Mini label="Consistency" value="93%" />
              <Mini label="HR avg" value="168" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* What did music do */}
      <section className="mt-6 px-5">
        <h2 className="text-[20px] font-semibold tracking-tight">
          What did music do for you today?
        </h2>
        <div className="mt-4 space-y-3">
          {impacts.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="rounded-2xl bg-paper-card border border-black/5 shadow-soft p-4"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{m.label}</div>
                <div
                  className="font-semibold tabular-nums"
                  style={{ color: m.color }}
                >
                  +{m.value}%
                </div>
              </div>
              <div className="mt-2 h-2 rounded-full bg-paper-warm overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, m.value * 5)}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: m.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Reflection */}
      <section className="mt-6 px-5">
        <div className="rounded-3xl bg-gradient-to-br from-paper-warm to-white border border-black/5 shadow-soft p-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white grid place-items-center text-accent-flame border border-black/5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-semibold">
              Reflection
            </div>
          </div>
          <p className="mt-3 text-[16px] leading-relaxed text-ink text-balance">
            Fast-paced hip-hop{" "}
            <span className="font-semibold text-accent-flame">improved your sprint consistency</span>{" "}
            today. Slower tracks reduced acceleration during later intervals — try
            saving them for cooldown.
          </p>
          <p className="mt-3 text-[13px] text-ink-muted leading-relaxed">
            This isn&apos;t a verdict. It&apos;s a hypothesis. Reflect on the songs
            below to confirm or push back.
          </p>
        </div>
      </section>

      {/* Per-song quick reflect */}
      <section className="mt-6 px-5">
        <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          Reflect on tonight&apos;s songs
        </div>
        <div className="mt-3 space-y-2">
          {sprintSongs.slice(0, 4).map((s) => (
            <Link
              key={s.id}
              href={`/song/${s.id}?activity=sprinting`}
              className="flex items-center gap-3 rounded-2xl bg-paper-card border border-black/5 shadow-soft p-3 active:scale-[0.99] transition"
            >
              <div
                className={clsx(
                  "w-11 h-11 rounded-xl bg-gradient-to-br shrink-0",
                  s.cover
                )}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[14px] truncate">{s.title}</div>
                <div className="text-[12px] text-ink-muted truncate">
                  {s.artist} ·{" "}
                  <span
                    className={clsx(
                      s.delta >= 0 ? "text-emerald-700" : "text-rose-600"
                    )}
                  >
                    {s.delta > 0 ? "+" : ""}
                    {s.delta}% impact
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-muted" />
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 mt-6">
        <Link
          href="/insights"
          className="block rounded-2xl bg-ink text-white py-4 text-center font-semibold tracking-tight active:scale-[0.99] transition shadow-card"
        >
          See long-term insights
        </Link>
      </section>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 32;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);
  return (
    <div className="relative w-[88px] h-[88px]">
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
        <circle cx="40" cy="40" r={r} stroke="rgba(255,255,255,0.15)" strokeWidth="8" fill="none" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          stroke="url(#ringG)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="ringG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF5A1F" />
            <stop offset="100%" stopColor="#FFD37A" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-[28px] font-semibold tracking-tight">{score}</div>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur px-2 py-2">
      <div className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
        {label}
      </div>
      <div className="mt-0.5 text-[15px] font-semibold tracking-tight">{value}</div>
    </div>
  );
}
