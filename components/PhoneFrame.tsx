"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { BottomNav } from "@/components/BottomNav";

/**
 * On large screens, present the prototype inside a tasteful phone frame so the
 * demo feels like a real product. On small screens, render full bleed.
 *
 * In both modes the page content scrolls inside a dedicated scroll container
 * while the BottomNav stays pinned to the bottom of the frame.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      {/* Mobile: full screen, fixed shell, scroll inside */}
      <div className="md:hidden fixed inset-0 bg-paper">
        <ScrollShell>{children}</ScrollShell>
      </div>

      {/* Desktop: phone frame on a calm canvas */}
      <div className="hidden md:flex min-h-screen items-center justify-center bg-gradient-to-br from-paper via-paper-warm to-[#EDE7DC] p-10">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-12 w-full max-w-7xl">
          <DemoNotes side="left" />

          <div
            className={clsx(
              "relative w-[400px] h-[840px] rounded-[56px] bg-ink shadow-[0_30px_80px_rgba(0,0,0,0.25)] p-3"
            )}
          >
            {/* Notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-3 w-32 h-6 bg-ink rounded-b-2xl z-30" />
            <div className="absolute left-1/2 -translate-x-1/2 top-4 w-20 h-4 bg-black rounded-full z-40" />

            <div className="relative w-full h-full rounded-[44px] overflow-hidden bg-paper">
              <ScrollShell>{children}</ScrollShell>
            </div>
          </div>

          <DemoNotes side="right" />
        </div>
      </div>
    </div>
  );
}

function ScrollShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 overflow-y-auto overscroll-contain pb-nav">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}

function DemoNotes({ side }: { side: "left" | "right" }) {
  const items =
    side === "left"
      ? [
          {
            title: "Representation",
            body: "The Performance Path replaces the playlist as the central object.",
          },
          {
            title: "Value",
            body: "Self-understanding. Users learn how music shapes their performance.",
          },
          {
            title: "AI Role",
            body: "Quiet pattern detection — never the protagonist.",
          },
        ]
      : [
          {
            title: "User Role",
            body: "Reflection & decision making. The athlete is the central actor.",
          },
          {
            title: "From user testing",
            body: "Earlier versions felt like “Spotify with AI.” We removed playlist UI as a primary surface.",
          },
          {
            title: "Activity-first",
            body: "Organized by sport, mood, and energy — not by artist or genre.",
          },
        ];

  return (
    <div className="space-y-5 max-w-xs">
      {items.map((it) => (
        <div
          key={it.title}
          className="rounded-3xl bg-white/60 backdrop-blur p-5 shadow-soft border border-black/5"
        >
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold">
            {it.title}
          </div>
          <div className="mt-2 text-[15px] leading-snug text-ink/90 text-balance">
            {it.body}
          </div>
        </div>
      ))}
    </div>
  );
}
