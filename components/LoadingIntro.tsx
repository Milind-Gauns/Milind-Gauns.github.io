"use client";

import { useEffect, useRef, useState } from "react";
import { KNIGHT_PATH } from "./board/KnightGlyph";
import { CAREER_PATH, fromSquare } from "@/lib/knightTour";

const SEEN_KEY = "mg-intro-seen";
const CELL = 40;

/**
 * Brief intro: a board fades up square by square, the knight traces the first
 * moves of the career path, then the whole thing dissolves into the hero.
 * Plays once per session, and any click or keypress cuts it short.
 */
export default function LoadingIntro() {
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage unavailable — just play it */
    }
    const remember = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    };

    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      remember();
      setGone(true);
      return;
    }

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      remember();
      setLeaving(true);
      window.setTimeout(() => setGone(true), 520);
    };

    const timer = window.setTimeout(finish, 1500);
    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };
  }, []);

  if (gone) return null;

  const pts = CAREER_PATH.map((sq) => {
    const [file, rank] = fromSquare(sq);
    return [file * CELL + CELL / 2, (7 - rank) * CELL + CELL / 2] as const;
  });

  return (
    <div
      id="intro-overlay"
      aria-hidden="true"
      className={`fixed inset-0 z-[100] grid place-items-center bg-base ${
        leaving ? "intro-leaving" : ""
      }`}
    >
      <svg viewBox="-4 -4 328 328" className="w-56 md:w-64" fill="none">
        {Array.from({ length: 64 }, (_, i) => {
          const file = i % 8;
          const rank = 7 - Math.floor(i / 8);
          const light = (file + rank) % 2 === 1;
          if (!light) return null;
          return (
            <rect
              key={i}
              className="intro-square"
              x={file * CELL}
              y={(7 - rank) * CELL}
              width={CELL}
              height={CELL}
              fill="rgba(242,239,233,0.05)"
              style={{ animationDelay: `${(file + (7 - rank)) * 0.028}s` }}
            />
          );
        })}
        <rect
          x={0}
          y={0}
          width={CELL * 8}
          height={CELL * 8}
          stroke="#2E4A52"
          strokeWidth={1}
        />
        <polyline
          className="intro-trail"
          points={pts.map((p) => p.join(",")).join(" ")}
          pathLength={1}
          stroke="#6EC1D6"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <g
          style={{
            transform: `translate(${pts[pts.length - 1][0] - 14}px, ${
              pts[pts.length - 1][1] - 15
            }px)`,
            opacity: 0,
            animation:
              "intro-square-in 0.4s cubic-bezier(0.33,1,0.68,1) 1.05s forwards",
          }}
        >
          <path d={KNIGHT_PATH} fill="#F2EFE9" transform="scale(0.28)" />
        </g>
      </svg>
    </div>
  );
}
