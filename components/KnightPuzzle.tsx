"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { KNIGHT_PATH } from "./board/KnightGlyph";
import {
  BOARD_SIZE,
  type Coord,
  isKnightMove,
  isLightSquare,
  knightMovesFrom,
  knightsTour,
  toSquare,
} from "@/lib/knightTour";

const TOTAL = BOARD_SIZE * BOARD_SIZE;
const BEST_KEY = "mg-tour-best";

const key = (c: Coord) => c.join(",");

/**
 * The knight's tour, playable. Land on every square without repeating one.
 * It's the site's whole premise as a game — and unlike a mate-in-N puzzle,
 * the rules are small enough to be provably right.
 */
export default function KnightPuzzle() {
  const [path, setPath] = useState<Coord[]>([]);
  const [best, setBest] = useState<number | null>(null);
  const [solving, setSolving] = useState(false);
  const solveTimers = useRef<number[]>([]);

  const visited = useMemo(() => new Set(path.map(key)), [path]);
  const current = path[path.length - 1];

  const legal = useMemo(() => {
    if (!current) return [];
    return knightMovesFrom(current).filter((c) => !visited.has(key(c)));
  }, [current, visited]);

  const stuck = path.length > 0 && legal.length === 0 && path.length < TOTAL;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(BEST_KEY);
      if (stored) setBest(Number(stored));
    } catch {
      /* storage unavailable — scores just won't persist */
    }
  }, []);

  useEffect(() => {
    if (path.length > (best ?? 0)) {
      setBest(path.length);
      try {
        localStorage.setItem(BEST_KEY, String(path.length));
      } catch {
        /* ignore */
      }
    }
  }, [path.length, best]);

  const clearTimers = useCallback(() => {
    // wrapped rather than passed by reference: clearTimeout throws if called
    // unbound from window
    solveTimers.current.forEach((id) => window.clearTimeout(id));
    solveTimers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setSolving(false);
    setPath([]);
  }, [clearTimers]);

  const play = (c: Coord) => {
    if (solving) return;
    if (path.length === 0) {
      setPath([c]);
      return;
    }
    if (visited.has(key(c))) return;
    if (!isKnightMove(current, c)) return;
    setPath((p) => [...p, c]);
  };

  const solve = () => {
    if (solving) return;
    const start = current ?? ([0, 0] as Coord);
    const full = knightsTour(start);
    setSolving(true);
    clearTimers();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      setPath(full);
      setSolving(false);
      return;
    }

    full.forEach((_, i) => {
      const t = window.setTimeout(() => {
        setPath(full.slice(0, i + 1));
        if (i === full.length - 1) setSolving(false);
      }, i * 55);
      solveTimers.current.push(t);
    });
  };

  const squares: Coord[] = [];
  for (let rank = BOARD_SIZE - 1; rank >= 0; rank--) {
    for (let file = 0; file < BOARD_SIZE; file++) squares.push([file, rank]);
  }

  const status = !current
    ? "Pick any square to place the knight."
    : path.length === TOTAL
      ? "Complete tour — all 64 squares, no repeats."
      : stuck
        ? `Stuck on ${path.length}. Every remaining square is out of reach.`
        : `${path.length} of 64.`;

  return (
    <div className="w-full">
      <div className="relative">
        <div
          className="grid aspect-square w-full grid-cols-8 overflow-hidden rounded-lg ring-1 ring-accent-dim"
          role="group"
          aria-label="Knight's tour puzzle board"
        >
          {squares.map((c) => {
            const k = key(c);
            const isVisited = visited.has(k);
            const isCurrent = current && k === key(current);
            const isLegal = legal.some((l) => key(l) === k);
            const order = path.findIndex((p) => key(p) === k);
            return (
              <button
                key={k}
                type="button"
                onClick={() => play(c)}
                disabled={solving}
                aria-label={`${toSquare(c)}${
                  isVisited ? ", visited" : isLegal ? ", available" : ""
                }`}
                className={`relative flex items-center justify-center transition-colors duration-300 ${
                  isLightSquare(c) ? "bg-ink/[0.035]" : "bg-transparent"
                } ${isLegal ? "cursor-pointer" : ""} ${
                  solving ? "cursor-default" : ""
                }`}
              >
                {isVisited && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-accent transition-opacity duration-300"
                    style={{ opacity: isCurrent ? 0.2 : 0.09 }}
                  />
                )}
                {isLegal && !solving && (
                  <span
                    aria-hidden="true"
                    className="absolute h-1.5 w-1.5 rounded-full bg-accent/70"
                  />
                )}
                {isVisited && !isCurrent && (
                  <span className="relative font-mono text-[9px] text-accent/80 sm:text-[11px]">
                    {order + 1}
                  </span>
                )}
                {isCurrent && (
                  <svg
                    viewBox="0 0 100 100"
                    className="relative h-[68%] w-[68%] text-ink"
                    aria-hidden="true"
                  >
                    <path d={KNIGHT_PATH} fill="currentColor" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-mono text-xs">
        <p
          aria-live="polite"
          className={
            path.length === TOTAL
              ? "text-accent"
              : stuck
                ? "text-ink"
                : "text-muted"
          }
        >
          {status}
        </p>
        <div className="flex items-center gap-5">
          {best !== null && best > 0 && (
            <span className="text-muted">best {best}</span>
          )}
          <button
            type="button"
            onClick={solve}
            disabled={solving || path.length === TOTAL}
            className="text-accent underline decoration-accent-dim underline-offset-4 transition-colors hover:decoration-accent disabled:text-muted disabled:no-underline"
          >
            {solving ? "solving…" : "solve it"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="text-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/40"
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
}
