"use client";

import Link from "next/link";
import { activities } from "@/lib/data";
import { Header } from "@/components/Header";
import clsx from "clsx";

export default function ActivitiesPage() {
  return (
    <div>
      <Header title="Activities" subtitle="Pick what you're doing today" />

      <div className="px-5">
        <p className="text-[14px] text-ink-muted leading-relaxed">
          Each activity has its own performance fingerprint. The same song can
          help you sprint and hurt you on the green.
        </p>
      </div>

      <div className="px-5 mt-5 grid grid-cols-2 gap-3">
        {activities.map((a) => (
          <Link
            key={a.id}
            href={a.id === "sprinting" ? `/activity/sprinting` : `/activities`}
            className="block"
          >
            <div className="rounded-3xl border border-black/5 shadow-card p-4 bg-paper-card relative overflow-hidden">
              <div
                className={clsx(
                  "absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl opacity-70 bg-gradient-to-br",
                  a.hue
                )}
              />
              <div className="relative">
                <div
                  className={clsx(
                    "w-12 h-12 rounded-2xl bg-gradient-to-br grid place-items-center text-2xl shadow-soft",
                    a.hue
                  )}
                >
                  {a.emoji}
                </div>
                <div className="mt-3 font-semibold tracking-tight">{a.name}</div>
                <div className="text-[11px] text-ink-muted">
                  {a.workouts} sessions
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-ink-muted">
                      {a.metricLabel}
                    </div>
                    <div className="text-[16px] font-semibold tracking-tight">
                      {a.metric}
                    </div>
                  </div>
                  <div
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: a.accent + "22", color: a.accent }}
                  >
                    {a.confidence}/100
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-5 mt-6">
        <button className="w-full rounded-2xl border border-dashed border-ink/20 py-4 text-ink-muted text-[14px] font-medium">
          + Add a new activity
        </button>
      </div>
    </div>
  );
}
