"use client";

import { Header } from "@/components/Header";
import { ChevronRight } from "lucide-react";

const sections: { title: string; rows: { label: string; value?: string }[] }[] = [
  {
    title: "About you",
    rows: [
      { label: "Name", value: "Kareem Dibs" },
      { label: "School", value: "UCLA" },
      { label: "Primary sport", value: "Sprinting" },
      { label: "Other sports", value: "Running · Weights · Basketball · Golf" },
    ],
  },
  {
    title: "How AI learns from you",
    rows: [
      { label: "Reflection style", value: "Quick chips + notes" },
      { label: "Mood logging", value: "Pre & post workout" },
      { label: "Suggestion confidence", value: "Conservative" },
    ],
  },
  {
    title: "Privacy",
    rows: [
      { label: "Music data", value: "On-device only" },
      { label: "Performance data", value: "Yours alone" },
      { label: "Export", value: "Anytime" },
    ],
  },
];

export default function ProfilePage() {
  return (
    <div>
      <Header title="Profile" />

      <div className="px-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-flame to-accent-glow grid place-items-center text-white text-xl font-semibold shadow-glow">
          KD
        </div>
        <div>
          <div className="text-[18px] font-semibold tracking-tight">
            Kareem Dibs
          </div>
          <div className="text-[12px] text-ink-muted">
            69 sessions · 38 reflections · since Jan 2026
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 grid grid-cols-3 gap-2 text-center">
        <Pill label="Streak" value="12d" />
        <Pill label="Top mood" value="Fired" />
        <Pill label="Top genre" value="Hip-hop" />
      </div>

      {sections.map((s) => (
        <div key={s.title} className="px-5 mt-7">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {s.title}
          </div>
          <div className="mt-3 rounded-2xl bg-paper-card border border-black/5 shadow-soft divide-y divide-black/5 overflow-hidden">
            {s.rows.map((r) => (
              <button
                key={r.label}
                className="w-full flex items-center justify-between px-4 py-3 text-left active:bg-paper-warm"
              >
                <div className="text-[14px]">{r.label}</div>
                <div className="flex items-center gap-2 text-ink-muted">
                  {r.value && <span className="text-[13px]">{r.value}</span>}
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="px-5 mt-8 mb-8">
        <div className="rounded-3xl bg-paper-warm border border-black/5 p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold">
            HCI prototype
          </div>
          <p className="mt-2 text-[13px] text-ink/80 leading-relaxed">
            This is a UCLA CS 188 prototype. All data is fabricated. The point is
            the <span className="font-semibold">representation</span> — not the
            backend.
          </p>
        </div>
      </div>
    </div>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-paper-card border border-black/5 shadow-soft py-3">
      <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
        {label}
      </div>
      <div className="mt-0.5 text-[15px] font-semibold tracking-tight">
        {value}
      </div>
    </div>
  );
}
