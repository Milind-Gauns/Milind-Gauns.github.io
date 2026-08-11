"use client";

import { useEffect, useState } from "react";
import Board from "./Board";
import { MILESTONES } from "@/lib/content";
import { CAREER_PATH } from "@/lib/knightTour";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const HOP_MS = 1700;
const HOLD_MS = 3200;

const YEARS = MILESTONES.map((m) => m.year);

/**
 * The hero board: walks the six-move career path on a loop, then rests on the
 * present before starting over. Under reduced motion it simply shows the
 * completed path.
 */
export default function HeroBoard({
  children,
}: {
  /** Rendered over the board — the hero puts the cutout portrait here. */
  children?: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const last = CAREER_PATH.length - 1;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStep(last);
      return;
    }
    let timer: number;
    const advance = () => {
      setStep((s) => {
        const next = s >= last ? 0 : s + 1;
        timer = window.setTimeout(advance, next === last ? HOLD_MS : HOP_MS);
        return next;
      });
    };
    timer = window.setTimeout(advance, HOP_MS);
    return () => window.clearTimeout(timer);
  }, [reduced, last]);

  const milestone = MILESTONES[Math.min(step, MILESTONES.length - 1)];

  return (
    <div className="w-full">
      {/* the board, with room for a figure to stand in front of it */}
      <div className="relative">
        <Board
          path={CAREER_PATH}
          step={step}
          labels={YEARS}
          coordinates
          className="w-full"
        />
        {children}
      </div>
      <div className="mt-6 flex items-baseline gap-4 font-mono text-xs">
        <span className="tabular-nums text-accent">
          {String(step + 1).padStart(2, "0")}/{String(CAREER_PATH.length).padStart(2, "0")}
        </span>
        <span className="text-muted">{milestone.square}</span>
        <span className="truncate text-muted">{milestone.title}</span>
      </div>
    </div>
  );
}
