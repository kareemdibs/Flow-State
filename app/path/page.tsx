"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { PerformancePath } from "@/components/PerformancePath";
import { sprintSongs } from "@/lib/data";

export default function PathPage() {
  return (
    <div>
      <Header title="Path" subtitle="Tonight's sprint session" />

      <div className="px-5">
        <p className="text-[14px] text-ink-muted leading-relaxed">
          A Performance Path is a felt curve — not a tracklist. Tap any node to
          tell us what worked.
        </p>
      </div>

      <div className="px-5 mt-5">
        <PerformancePath songs={sprintSongs} activitySlug="sprinting" />
      </div>

      <div className="px-5 mt-6 grid grid-cols-2 gap-3">
        <Link
          href="/builder/sprinting"
          className="rounded-2xl bg-paper-card border border-black/5 shadow-soft p-4 text-center font-medium"
        >
          Edit songs
        </Link>
        <Link
          href="/summary/sprinting"
          className="rounded-2xl bg-ink text-white py-4 text-center font-semibold shadow-card"
        >
          Finish & reflect
        </Link>
      </div>
    </div>
  );
}
