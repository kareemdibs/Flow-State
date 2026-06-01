"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Song } from "@/lib/data";
import clsx from "clsx";

/**
 * The Performance Path. Songs are nodes plotted against a vertical
 * "performance" axis (above center = boost, below = drag). The X axis is
 * time through the workout. The result is a felt curve, not a tracklist.
 */
export function PerformancePath({
  songs,
  activitySlug,
}: {
  songs: Song[];
  activitySlug: string;
}) {
  const W = 360;
  const H = 280;
  const PAD_X = 28;
  const PAD_Y = 32;
  const usableW = W - PAD_X * 2;
  const usableH = H - PAD_Y * 2;
  const center = H / 2;

  // Scale delta into y position. Clamp range to roughly ±10.
  const deltaToY = (d: number) => {
    const clamped = Math.max(-10, Math.min(10, d));
    return center - (clamped / 10) * (usableH / 2);
  };

  const nodes = songs.map((s, i) => {
    const x = PAD_X + (usableW * i) / Math.max(songs.length - 1, 1);
    const y = deltaToY(s.delta);
    return { song: s, x, y };
  });

  // Smooth path via mid-point bezier
  const path =
    nodes.length === 0
      ? ""
      : nodes
          .map((n, i) => {
            if (i === 0) return `M ${n.x} ${n.y}`;
            const prev = nodes[i - 1];
            const cx = (prev.x + n.x) / 2;
            return `C ${cx} ${prev.y}, ${cx} ${n.y}, ${n.x} ${n.y}`;
          })
          .join(" ");

  return (
    <div className="relative">
      {/* Frame */}
      <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-b from-[#0B0B10] to-[#1A1A22] text-white shadow-card">
        {/* Soft halo */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[260px] rounded-full bg-accent-flame/20 blur-3xl" />

        {/* Header */}
        <div className="relative px-5 pt-5 flex items-start justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-semibold">
              Performance Path
            </div>
            <div className="mt-1 text-[18px] font-semibold tracking-tight">
              Tonight&apos;s sprint session
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">
              AI projection
            </div>
            <div className="mt-1 text-[16px] font-semibold text-accent-glow">
              +8.3% effort
            </div>
          </div>
        </div>

        {/* SVG Path */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="relative mt-2 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pathStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF5A1F" />
              <stop offset="50%" stopColor="#FFD37A" />
              <stop offset="100%" stopColor="#7AB8FF" />
            </linearGradient>
            <linearGradient id="fillUp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Center axis (baseline) */}
          <line
            x1={PAD_X}
            x2={W - PAD_X}
            y1={center}
            y2={center}
            stroke="rgba(255,255,255,0.15)"
            strokeDasharray="3 4"
          />
          <text
            x={PAD_X}
            y={center - 6}
            fill="rgba(255,255,255,0.5)"
            fontSize="9"
            fontFamily="var(--font-sans)"
          >
            baseline
          </text>

          {/* Top/bottom labels */}
          <text x={W - PAD_X} y={PAD_Y - 10} textAnchor="end" fill="rgba(255,255,255,0.45)" fontSize="9">
            ↑ boost
          </text>
          <text x={W - PAD_X} y={H - PAD_Y + 18} textAnchor="end" fill="rgba(255,255,255,0.45)" fontSize="9">
            ↓ drag
          </text>

          {/* Area fill above baseline */}
          {path && (
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              d={path}
              fill="none"
              stroke="url(#pathStroke)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Nodes */}
          {nodes.map((n, i) => {
            const positive = n.song.delta >= 0;
            return (
              <motion.g
                key={n.song.id}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 280, damping: 18 }}
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={9}
                  fill={positive ? "#FF5A1F" : "#7AB8FF"}
                  opacity={0.25}
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={5}
                  fill={positive ? "#FFD37A" : "#7AB8FF"}
                  stroke="white"
                  strokeWidth="1.5"
                />
              </motion.g>
            );
          })}
        </svg>

        {/* Node labels (interactive list) */}
        <div className="relative px-3 pb-4 -mt-2 flex justify-between gap-1">
          {nodes.map((n) => {
            const positive = n.song.delta >= 0;
            return (
              <Link
                key={n.song.id}
                href={`/song/${n.song.id}?activity=${activitySlug}`}
                className="flex-1 min-w-0 text-center"
              >
                <div className="mx-auto text-[10px] text-white/50 truncate px-0.5">
                  {n.song.title}
                </div>
                <div
                  className={clsx(
                    "mt-0.5 text-[10px] font-semibold",
                    positive ? "text-accent-glow" : "text-accent-sky"
                  )}
                >
                  {n.song.delta > 0 ? "+" : ""}
                  {n.song.delta}%
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-ink-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-flame" /> lifts performance
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-sky" /> drags performance
        </span>
      </div>
    </div>
  );
}
