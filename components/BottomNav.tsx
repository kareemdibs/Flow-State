"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, Sparkles, LineChart, User } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

const tabs = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  {
    href: "/activities",
    label: "Activities",
    icon: Activity,
    match: (p: string) => p.startsWith("/activities") || p.startsWith("/activity"),
  },
  {
    href: "/path",
    label: "Path",
    icon: Sparkles,
    match: (p: string) => p.startsWith("/path") || p.startsWith("/builder") || p.startsWith("/song"),
  },
  {
    href: "/insights",
    label: "Insights",
    icon: LineChart,
    match: (p: string) => p.startsWith("/insights") || p.startsWith("/summary"),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
    match: (p: string) => p.startsWith("/profile"),
  },
];

export function BottomNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="absolute bottom-0 inset-x-0 z-50">
      <div className="mx-3 mb-3 rounded-3xl glass border border-black/5 shadow-card">
        <ul className="grid grid-cols-5 px-2 py-2">
          {tabs.map(({ href, label, icon: Icon, match }) => {
            const active = match(pathname);
            return (
              <li key={href} className="flex">
                <Link
                  href={href}
                  className={clsx(
                    "relative flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-2xl transition-colors",
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-1 rounded-2xl bg-paper-warm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon
                    className={clsx(
                      "relative w-5 h-5",
                      active && "text-accent-flame"
                    )}
                    strokeWidth={active ? 2.4 : 2}
                  />
                  <span className="relative text-[10px] font-medium tracking-wide">
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
