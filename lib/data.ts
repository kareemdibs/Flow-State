// Mock data for the Performance Path HCI prototype.
// Everything here is hardcoded — no APIs, no persistence.

export type ActivityId = "sprinting" | "running" | "weights" | "basketball" | "golf";

export type Activity = {
  id: ActivityId;
  name: string;
  emoji: string;
  metric: string;
  metricLabel: string;
  personalBest: string;
  pbContext: string;
  confidence: number; // 0-100
  trend: number; // pct
  workouts: number;
  hue: string; // tailwind gradient class fragment
  accent: string; // hex
};

export const activities: Activity[] = [
  {
    id: "sprinting",
    name: "Sprinting",
    emoji: "⚡️",
    metric: "10.92s",
    metricLabel: "100m PB",
    personalBest: "10.92s",
    pbContext: "Apr 14 · Drake Stadium",
    confidence: 82,
    trend: +6,
    workouts: 14,
    hue: "from-[#FFE3D1] to-[#FFB48A]",
    accent: "#FF5A1F",
  },
  {
    id: "running",
    name: "Running",
    emoji: "🏃",
    metric: "7:42 /mi",
    metricLabel: "Avg pace · last 5",
    personalBest: "6:58 /mi",
    pbContext: "Mar 02 · Sunset loop",
    confidence: 74,
    trend: +3,
    workouts: 22,
    hue: "from-[#E0F0FF] to-[#9BC6FF]",
    accent: "#7AB8FF",
  },
  {
    id: "weights",
    name: "Weightlifting",
    emoji: "🏋️",
    metric: "245 lb",
    metricLabel: "Bench 1RM",
    personalBest: "245 lb",
    pbContext: "May 10 · Wooden Center",
    confidence: 68,
    trend: -2,
    workouts: 18,
    hue: "from-[#EDE7FF] to-[#B6A6FF]",
    accent: "#9B8CFF",
  },
  {
    id: "basketball",
    name: "Basketball",
    emoji: "🏀",
    metric: "62%",
    metricLabel: "FG · pickup",
    personalBest: "71%",
    pbContext: "Feb 20 · IM Field",
    confidence: 71,
    trend: +4,
    workouts: 9,
    hue: "from-[#FFE7C2] to-[#FFB347]",
    accent: "#FF8A4C",
  },
  {
    id: "golf",
    name: "Golf",
    emoji: "⛳️",
    metric: "82",
    metricLabel: "18-hole avg",
    personalBest: "76",
    pbContext: "Jan 08 · Rancho Park",
    confidence: 64,
    trend: +1,
    workouts: 6,
    hue: "from-[#DDF6E5] to-[#92D9AE]",
    accent: "#7BD3B0",
  },
];

export type Song = {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  effect: "confidence" | "energy" | "focus" | "rhythm" | "drain";
  delta: number; // performance impact %, can be negative
  observation: string;
  cover: string; // gradient class
};

export const sprintSongs: Song[] = [
  {
    id: "s1",
    title: "SICKO MODE",
    artist: "Travis Scott",
    bpm: 155,
    effect: "energy",
    delta: +6,
    observation:
      "Your average sprint speed is 6% faster when this song plays during the first 200m.",
    cover: "from-[#1A1A22] to-[#FF5A1F]",
  },
  {
    id: "s2",
    title: "POWER",
    artist: "Kanye West",
    bpm: 138,
    effect: "confidence",
    delta: +9,
    observation:
      "Confidence rating after this song averages 9 points higher than your baseline.",
    cover: "from-[#3B0E0E] to-[#FFD37A]",
  },
  {
    id: "s3",
    title: "Sunflower",
    artist: "Post Malone",
    bpm: 90,
    effect: "drain",
    delta: -4,
    observation:
      "Your acceleration in interval 3 drops ~4% with slower tempo tracks like this one.",
    cover: "from-[#FFB347] to-[#FFE7C2]",
  },
  {
    id: "s4",
    title: "DNA.",
    artist: "Kendrick Lamar",
    bpm: 142,
    effect: "focus",
    delta: +7,
    observation:
      "Lap-to-lap consistency improves when this plays during your warmup.",
    cover: "from-[#0B0B10] to-[#7BD3B0]",
  },
  {
    id: "s5",
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    bpm: 150,
    effect: "rhythm",
    delta: +5,
    observation:
      "Your stride cadence locks into the beat — splits get more consistent.",
    cover: "from-[#1F2937] to-[#9B8CFF]",
  },
  {
    id: "s6",
    title: "Redbone",
    artist: "Childish Gambino",
    bpm: 80,
    effect: "drain",
    delta: -3,
    observation:
      "Tempo too low — start times slip by ~0.2s after this song plays.",
    cover: "from-[#7AB8FF] to-[#E0F0FF]",
  },
];

export const tasteSuggestions = [
  {
    id: "t1",
    title: "Pop Out",
    artist: "Polo G",
    chip: "boosts focus",
    cover: "from-[#0B0B10] to-[#7AB8FF]",
  },
  {
    id: "t2",
    title: "Goosebumps",
    artist: "Travis Scott",
    chip: "increases energy",
    cover: "from-[#FF5A1F] to-[#FFD37A]",
  },
  {
    id: "t3",
    title: "Weightless",
    artist: "Marconi Union",
    chip: "helps recovery",
    cover: "from-[#7BD3B0] to-[#E0F0FF]",
  },
  {
    id: "t4",
    title: "Alright",
    artist: "Kendrick Lamar",
    chip: "improves consistency",
    cover: "from-[#1F2937] to-[#9B8CFF]",
  },
];

export const performanceGoals = [
  { id: "speed", label: "Max Speed", emoji: "⚡️" },
  { id: "endurance", label: "Endurance", emoji: "🫁" },
  { id: "recovery", label: "Recovery", emoji: "🌿" },
  { id: "focus", label: "Focus", emoji: "🎯" },
] as const;

export const moodOptions = [
  { id: "stressed", label: "Stressed", emoji: "😮‍💨" },
  { id: "tired", label: "Tired", emoji: "🥱" },
  { id: "neutral", label: "Neutral", emoji: "🙂" },
  { id: "fired", label: "Fired up", emoji: "🔥" },
  { id: "calm", label: "Calm", emoji: "🌊" },
];
