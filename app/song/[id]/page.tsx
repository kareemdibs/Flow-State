"use client";

import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { sprintSongs } from "@/lib/data";
import { Sparkles, Check } from "lucide-react";
import clsx from "clsx";

const positiveReasons = [
  { id: "energy", label: "More energy", emoji: "⚡️" },
  { id: "focus", label: "Better focus", emoji: "🎯" },
  { id: "rhythm", label: "Better rhythm", emoji: "🥁" },
  { id: "confidence", label: "Confidence", emoji: "🦁" },
  { id: "memory", label: "Reminded me of a moment", emoji: "🧠" },
  { id: "other-pos", label: "Other", emoji: "✨" },
];

const negativeReasons = [
  { id: "distract", label: "Distracting", emoji: "🌀" },
  { id: "slow", label: "Too slow", emoji: "🐢" },
  { id: "mood", label: "Wrong mood", emoji: "🌧️" },
  { id: "intense", label: "Too intense", emoji: "🔥" },
  { id: "loud", label: "Too loud", emoji: "🔊" },
  { id: "other-neg", label: "Other", emoji: "✏️" },
];

export default function SongReflectionPage() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const activity = search.get("activity") ?? "sprinting";

  const song = useMemo(
    () => sprintSongs.find((s) => s.id === params.id) ?? sprintSongs[0],
    [params.id]
  );

  const [verdict, setVerdict] = useState<"worked" | "failed" | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reasons = verdict === "failed" ? negativeReasons : positiveReasons;

  const togglePick = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div>
      <Header
        back={`/activity/${activity}`}
        title="Song reflection"
        subtitle={`On your ${activity} path`}
      />

      {/* Album hero */}
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={clsx(
            "rounded-[28px] bg-gradient-to-br p-5 text-white shadow-card",
            song.cover
          )}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-semibold">
            Now reflecting
          </div>
          <div className="mt-2 text-[26px] font-semibold tracking-tight leading-tight text-balance">
            {song.title}
          </div>
          <div className="text-white/80">{song.artist}</div>
          <div className="mt-3 flex gap-2">
            <Tag>{song.bpm} BPM</Tag>
            <Tag>{song.effect}</Tag>
            <Tag>
              {song.delta > 0 ? "+" : ""}
              {song.delta}% impact
            </Tag>
          </div>
        </motion.div>
      </div>

      {/* AI Observation */}
      <section className="mt-5 px-5">
        <div className="rounded-3xl bg-paper-card border border-black/5 shadow-soft p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-paper-warm grid place-items-center text-accent-flame">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink-muted font-semibold">
                AI observation
              </div>
              <p className="mt-1 text-[15px] text-ink leading-snug">
                {song.observation}
              </p>
              <p className="mt-2 text-[12px] text-ink-muted leading-relaxed">
                Drawn from {Math.max(3, Math.abs(song.delta) + 2)} of your past
                sessions. The AI doesn&apos;t know{" "}
                <span className="text-ink/80 font-medium">why</span> — that part is
                yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="mt-6 px-5">
        <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          Did this song work for you?
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setVerdict("worked");
              setPicked([]);
            }}
            className={clsx(
              "rounded-2xl border p-4 text-left transition",
              verdict === "worked"
                ? "bg-accent-mint/20 border-accent-mint shadow-soft"
                : "bg-paper-card border-black/5"
            )}
          >
            <div className="text-2xl">💪</div>
            <div className="mt-1 font-semibold">It worked</div>
            <div className="text-[12px] text-ink-muted">Lifted my session</div>
          </button>
          <button
            onClick={() => {
              setVerdict("failed");
              setPicked([]);
            }}
            className={clsx(
              "rounded-2xl border p-4 text-left transition",
              verdict === "failed"
                ? "bg-rose-100 border-rose-300 shadow-soft"
                : "bg-paper-card border-black/5"
            )}
          >
            <div className="text-2xl">🌧️</div>
            <div className="mt-1 font-semibold">It didn&apos;t</div>
            <div className="text-[12px] text-ink-muted">Felt off / dragged me</div>
          </button>
        </div>
      </section>

      {/* Reasons */}
      {verdict && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 px-5"
        >
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Why? <span className="text-ink-muted/70 font-medium normal-case tracking-normal">(pick any)</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {reasons.map((r) => {
              const active = picked.includes(r.id);
              return (
                <button
                  key={r.id}
                  onClick={() => togglePick(r.id)}
                  className={clsx(
                    "px-3 py-2 rounded-2xl border text-[13px] font-medium transition flex items-center gap-1.5",
                    active
                      ? "bg-ink text-white border-ink shadow-soft"
                      : "bg-paper-card text-ink border-black/5"
                  )}
                >
                  <span>{r.emoji}</span>
                  {r.label}
                  {active && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything else? (optional)"
            className="mt-4 w-full rounded-2xl bg-paper-card border border-black/5 shadow-soft p-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-accent-flame/40 min-h-[80px]"
          />
        </motion.section>
      )}

      {/* Submit */}
      <section className="mt-6 px-5">
        <button
          onClick={() => setSubmitted(true)}
          disabled={!verdict || submitted}
          className={clsx(
            "w-full rounded-2xl py-4 font-semibold tracking-tight transition shadow-card",
            submitted
              ? "bg-accent-mint text-emerald-900"
              : "bg-ink text-white active:scale-[0.99] disabled:opacity-50"
          )}
        >
          {submitted ? "Saved to your patterns ✓" : "Save reflection"}
        </button>
        <p className="mt-3 text-center text-[11px] text-ink-muted leading-relaxed">
          Reflections train the AI on{" "}
          <span className="text-ink/80 font-medium">your</span> meaning of a song —
          not a global average.
        </p>
      </section>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20">
      {children}
    </span>
  );
}
