"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { activities, tasteSuggestions } from "@/lib/data";
import { ArrowUpRight, TrendingUp, TrendingDown, Flame, Plus } from "lucide-react";
import clsx from "clsx";

export default function HomePage() {
  return (
    <div className="bg-paper">
      {/* Top bar — workouts tracked + avatar */}
      <div className="px-5 pt-7 flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold">
            Workouts tracked
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-[44px] leading-none font-semibold tracking-tight">
              69
            </span>
            <span className="text-ink-muted text-sm">this quarter</span>
          </div>
        </div>
        <Link href="/profile" className="active:scale-95 transition">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-flame to-accent-glow grid place-items-center text-white font-semibold shadow-glow">
              KD
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent-mint border-2 border-paper" />
          </div>
        </Link>
      </div>

      {/* Greeting */}
      <div className="px-5 mt-6">
        <h1 className="text-[26px] font-semibold tracking-tight leading-tight text-balance">
          Good evening, Kareem.
          <br />
          <span className="text-ink-muted font-medium">
            Sprint practice in 30 minutes.
          </span>
        </h1>
      </div>

      {/* Activities */}
      <section className="mt-7">
        <div className="px-5 flex items-center justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Your activities
          </h2>
          <button className="text-[12px] text-ink-muted flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        <div className="mt-3 px-5 space-y-3">
          {activities.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.35, ease: "easeOut" }}
            >
              <Link
                href={a.id === "sprinting" ? "/activity/sprinting" : "/activities"}
                className="group block"
              >
                <div className="relative rounded-3xl bg-paper-card border border-black/5 shadow-card p-4 overflow-hidden">
                  <div
                    className={clsx(
                      "absolute -right-10 -top-10 w-44 h-44 rounded-full blur-2xl opacity-60 bg-gradient-to-br",
                      a.hue
                    )}
                  />

                  <div className="relative flex items-center gap-4">
                    <div
                      className={clsx(
                        "w-14 h-14 rounded-2xl bg-gradient-to-br grid place-items-center text-2xl shadow-soft",
                        a.hue
                      )}
                    >
                      {a.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-[17px] tracking-tight">
                          {a.name}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-ink-muted">
                          · {a.workouts} sessions
                        </span>
                      </div>
                      <div className="mt-1 text-[12px] text-ink-muted">
                        {a.metricLabel}
                      </div>
                      <div className="mt-0.5 text-[20px] font-semibold tracking-tight">
                        {a.metric}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-ink-muted">
                        Confidence
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 justify-end">
                        <span className="text-[18px] font-semibold tracking-tight">
                          {a.confidence}
                        </span>
                        <span className="text-ink-muted text-xs">/100</span>
                      </div>
                      <div
                        className={clsx(
                          "mt-1 inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full",
                          a.trend >= 0
                            ? "bg-accent-mint/20 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        )}
                      >
                        {a.trend >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {a.trend > 0 ? "+" : ""}
                        {a.trend}%
                      </div>
                    </div>
                  </div>

                  {/* Mini sparkline */}
                  <div className="relative mt-4 h-8">
                    <Sparkline accent={a.accent} />
                    <div className="absolute right-0 top-0 text-ink-muted text-[10px] flex items-center gap-1">
                      Open <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Taste */}
      <section className="mt-8 px-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Taste
            </h2>
            <p className="mt-1 text-[13px] text-ink-muted">
              Songs your body might respond to — based on your patterns.
            </p>
          </div>
          <Flame className="w-5 h-5 text-accent-flame" />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {tasteSuggestions.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-paper-card border border-black/5 shadow-soft p-3"
            >
              <div
                className={clsx(
                  "aspect-square rounded-2xl bg-gradient-to-br",
                  t.cover
                )}
              />
              <div className="mt-3 px-1">
                <div className="text-[14px] font-semibold tracking-tight truncate">
                  {t.title}
                </div>
                <div className="text-[12px] text-ink-muted truncate">{t.artist}</div>
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-paper-warm text-ink/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-flame" />
                  {t.chip}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-ink-muted text-center px-6 leading-relaxed">
          Suggestions evolve as the AI learns which sounds support{" "}
          <span className="text-ink/80 font-medium">your</span> performance.
        </p>
      </section>
    </div>
  );
}

function Sparkline({ accent }: { accent: string }) {
  const points = [4, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 100;
  const h = 100;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / (max - min)) * h;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id={`g-${accent}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${path} L ${w} ${h} L 0 ${h} Z`}
        fill={`url(#g-${accent})`}
      />
      <path d={path} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
