"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

export function Header({
  title,
  back,
  right,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
  back?: string;
  right?: ReactNode;
}) {
  return (
    <header className="px-5 pt-5 pb-3 flex items-center gap-3">
      {back ? (
        <Link
          href={back}
          className="w-10 h-10 rounded-full bg-white shadow-soft border border-black/5 flex items-center justify-center active:scale-95 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <div className="w-10 h-10" />
      )}
      <div className="flex-1 min-w-0">
        {title && (
          <div className="text-[15px] font-semibold tracking-tight">{title}</div>
        )}
        {subtitle && (
          <div className="text-[12px] text-ink-muted truncate">{subtitle}</div>
        )}
      </div>
      <div className="min-w-10 flex justify-end">{right}</div>
    </header>
  );
}
