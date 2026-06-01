"use client";

import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import clsx from "clsx";

const patterns = [
  {
    title: "Confidence rises with Kanye",
    body: "Your sprint confidence averages +9 after Kanye West tracks. Strongest correlation in your library.",
    color: "from-[#FFD37A] to-[#FF8A4C]",
  },
  {
    title: "Slow tempo hurts intervals 4–6",
    body: "Tracks under 100 BPM coincide with a 4% drop in late-interval acceleration. Move them to cooldown.",
    color: "from-[#7AB8FF] to-[#E0F0FF]",
  },
  {
    title: "Stressed days respond to rhythm",
    body: "When your logged mood is 'stressed', steady-cadence songs lift your splits more than energetic ones.",
    color: "from-[#9B8CFF] to-[#EDE7FF]",
  },
];

const stats = [
  { label: "Songs tracked", value: 142 },
  { label: "Reflections", value: 38 },
  { label: "Patterns found", value: 7 },
];

export default function InsightsPage() {
  return (
    <div>
      <Header title="Insights" subtitle="What we're learning together" />

      <div className="px-5">
        <p className="text-[14px] text-ink-muted leading-relaxed">
          The AI doesn&apos;t tell you who you are. It surfaces hypotheses — you
          decide what&apos;s true.
        </p>
      </div>

      {/* Stats */}
      <div className="px-5 mt-5 grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-paper-card border border-black/5 shadow-soft p-3 text-center"
          >
            <div className="text-[22px] font-semibold tracking-tight">
              {s.value}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Patterns */}
      <div className="px-5 mt-6 space-y-3">
        <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          Patterns the AI noticed
        </div>
        {patterns.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-3xl bg-paper-card border border-black/5 shadow-card p-4 relative overflow-hidden"
          >
            <div
              className={clsx(
                "absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl opacity-60 bg-gradient-to-br",
                p.color
              )}
            />
            <div className="relative flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-paper-warm grid place-items-center text-accent-flame">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-semibold tracking-tight">{p.title}</div>
                <div className="mt-1 text-[13px] text-ink-muted leading-relaxed">
                  {p.body}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-ink text-white">
                    This is true
                  </button>
                  <button className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-paper-warm">
                    Not quite
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Past sessions */}
      <div className="px-5 mt-7">
        <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          Recent paths
        </div>
        <div className="mt-3 space-y-2">
          {[
            { day: "Tonight", sport: "Sprinting", delta: "+8.4%" },
            { day: "Sunday", sport: "Running", delta: "+2.1%" },
            { day: "Friday", sport: "Weightlifting", delta: "-1.3%" },
          ].map((r) => (
            <div
              key={r.day}
              className="flex items-center justify-between rounded-2xl bg-paper-card border border-black/5 shadow-soft p-3"
            >
              <div>
                <div className="font-medium">{r.sport}</div>
                <div className="text-[12px] text-ink-muted">{r.day}</div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    "text-[13px] font-semibold tabular-nums",
                    r.delta.startsWith("+") ? "text-emerald-700" : "text-rose-600"
                  )}
                >
                  {r.delta}
                </div>
                <ArrowRight className="w-4 h-4 text-ink-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
