"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { PerformancePath } from "@/components/PerformancePath";
import { sprintSongs, performanceGoals, Song } from "@/lib/data";
import { Plus, Minus, Sparkles } from "lucide-react";
import clsx from "clsx";

const candidatePool: Song[] = [
  {
    id: "p1",
    title: "Mo Bamba",
    artist: "Sheck Wes",
    bpm: 146,
    effect: "energy",
    delta: +5,
    observation: "Sustained energy through interval 4.",
    cover: "from-[#1A1A22] to-[#FF8A4C]",
  },
  {
    id: "p2",
    title: "Lose Yourself",
    artist: "Eminem",
    bpm: 171,
    effect: "focus",
    delta: +8,
    observation: "Lock-in effect during warmup.",
    cover: "from-[#0B0B10] to-[#9B8CFF]",
  },
  {
    id: "p3",
    title: "Stronger",
    artist: "Kanye West",
    bpm: 104,
    effect: "confidence",
    delta: +6,
    observation: "Emotional lift before first sprint.",
    cover: "from-[#1F2937] to-[#FFD37A]",
  },
  {
    id: "p4",
    title: "Heat Waves",
    artist: "Glass Animals",
    bpm: 81,
    effect: "drain",
    delta: -5,
    observation: "Pace drops on interval 5+.",
    cover: "from-[#FFB347] to-[#7AB8FF]",
  },
];

export default function PlaylistBuilder() {
  const [goal, setGoal] = useState<(typeof performanceGoals)[number]["id"]>("speed");
  const [songs, setSongs] = useState<Song[]>(sprintSongs);

  const projection = useMemo(() => {
    if (songs.length === 0) return 0;
    const sum = songs.reduce((s, x) => s + x.delta, 0);
    return Math.round((sum / songs.length) * 10) / 10;
  }, [songs]);

  const remove = (id: string) => setSongs((s) => s.filter((x) => x.id !== id));
  const add = (song: Song) =>
    setSongs((s) => (s.find((x) => x.id === song.id) ? s : [...s, song]));

  const available = candidatePool.filter((p) => !songs.find((s) => s.id === p.id));

  return (
    <div>
      <Header
        back="/activity/sprinting"
        title="Shape your path"
        subtitle="Sprinting · tonight"
      />

      {/* Goal selector */}
      <section className="px-5">
        <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          Performance goal
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {performanceGoals.map((g) => (
            <button
              key={g.id}
              onClick={() => setGoal(g.id)}
              className={clsx(
                "rounded-2xl border py-3 text-center transition",
                goal === g.id
                  ? "bg-ink text-white border-ink shadow-soft"
                  : "bg-paper-card border-black/5"
              )}
            >
              <div className="text-xl">{g.emoji}</div>
              <div className="mt-0.5 text-[11px] font-medium">{g.label}</div>
            </button>
          ))}
        </div>
      </section>

      {/* The Path — primary visual */}
      <section className="mt-5 px-5">
        <PerformancePath songs={songs} activitySlug="sprinting" />
        <div className="mt-3 rounded-3xl bg-paper-card border border-black/5 shadow-soft p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-paper-warm grid place-items-center text-accent-flame">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1 text-[13px] text-ink leading-snug">
              <span className="font-semibold">AI projection</span> · with{" "}
              {songs.length} songs the path averages{" "}
              <span
                className={clsx(
                  "font-semibold",
                  projection >= 0 ? "text-accent-flame" : "text-rose-600"
                )}
              >
                {projection > 0 ? "+" : ""}
                {projection}%
              </span>{" "}
              vs. baseline.
            </div>
          </div>
        </div>
      </section>

      {/* Current songs (secondary) */}
      <section className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Songs on this path
          </div>
          <span className="text-[12px] text-ink-muted">{songs.length} tracks</span>
        </div>

        <div className="mt-3 space-y-2">
          <AnimatePresence initial={false}>
            {songs.map((s) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="rounded-2xl bg-paper-card border border-black/5 shadow-soft p-3 flex items-center gap-3"
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
                    {s.artist} · {s.bpm} BPM
                  </div>
                </div>
                <div
                  className={clsx(
                    "text-[12px] font-semibold tabular-nums",
                    s.delta >= 0 ? "text-emerald-700" : "text-rose-600"
                  )}
                >
                  {s.delta > 0 ? "+" : ""}
                  {s.delta}%
                </div>
                <button
                  onClick={() => remove(s.id)}
                  className="w-8 h-8 rounded-full bg-paper-warm grid place-items-center active:scale-95 transition"
                  aria-label="Remove"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Suggestions */}
      {available.length > 0 && (
        <section className="mt-6 px-5">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            AI suggests adding
          </div>
          <div className="mt-3 space-y-2">
            {available.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl bg-white border border-dashed border-accent-flame/40 p-3 flex items-center gap-3"
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
                    {s.artist} · {s.observation}
                  </div>
                </div>
                <button
                  onClick={() => add(s)}
                  className="w-8 h-8 rounded-full bg-accent-flame text-white grid place-items-center active:scale-95 transition"
                  aria-label="Add"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-5 mt-6">
        <Link
          href="/activity/sprinting"
          className="block rounded-2xl bg-ink text-white py-4 text-center font-semibold tracking-tight active:scale-[0.99] transition shadow-card"
        >
          Save path
        </Link>
        <p className="mt-3 text-center text-[11px] text-ink-muted">
          The path — not the playlist — is the central object.
        </p>
      </section>
    </div>
  );
}
