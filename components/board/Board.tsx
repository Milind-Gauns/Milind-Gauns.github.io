"use client";

import { Fragment } from "react";
import { KNIGHT_CENTER, KNIGHT_PATH } from "./KnightGlyph";
import { BOARD_SIZE, fromSquare, isLightSquare } from "@/lib/knightTour";

const CELL = 100;
const SIZE = BOARD_SIZE * CELL;
/** Knight fills ~78% of a square. */
const KNIGHT_SCALE = 0.78;

export type BoardProps = {
  /** Squares of the path, in order (algebraic, e.g. "a1"). */
  path: string[];
  /** How many hops have completed: 0 = knight on path[0], nothing drawn yet. */
  step: number;
  /** Optional short label drawn on each landed square (e.g. a year). */
  labels?: string[];
  /** Draw file/rank coordinates outside the board. */
  coordinates?: boolean;
  className?: string;
};

function center(square: string): [number, number] {
  const [file, rank] = fromSquare(square);
  return [file * CELL + CELL / 2, (BOARD_SIZE - 1 - rank) * CELL + CELL / 2];
}

/**
 * Presentational board. Owns no timing — the parent decides `step`, so the
 * same component serves the autoplaying hero and the scroll-scrubbed timeline.
 */
export default function Board({
  path,
  step,
  labels,
  coordinates = false,
  className = "",
}: BoardProps) {
  const squares = [];
  for (let rank = BOARD_SIZE - 1; rank >= 0; rank--) {
    for (let file = 0; file < BOARD_SIZE; file++) {
      squares.push({ file, rank });
    }
  }

  const clamped = Math.max(0, Math.min(step, path.length - 1));
  const [kx, ky] = center(path[clamped]);
  const pad = coordinates ? 34 : 6;

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${SIZE + pad * 2} ${SIZE + pad * 2}`}
      className={className}
      aria-hidden="true"
    >
      {/* squares */}
      {squares.map(({ file, rank }) => (
        <rect
          key={`${file}-${rank}`}
          x={file * CELL}
          y={(BOARD_SIZE - 1 - rank) * CELL}
          width={CELL}
          height={CELL}
          className={isLightSquare([file, rank]) ? "board-square-light" : ""}
          fill={isLightSquare([file, rank]) ? undefined : "transparent"}
        />
      ))}

      {/* frame */}
      <rect
        x={0}
        y={0}
        width={SIZE}
        height={SIZE}
        fill="none"
        stroke="#2E4A52"
        strokeWidth={2}
      />

      {/* coordinates */}
      {coordinates && (
        <g fill="#8B8B90" fontSize={20} fontFamily="var(--font-mono)">
          {"abcdefgh".split("").map((f, i) => (
            <text
              key={f}
              x={i * CELL + CELL / 2}
              y={SIZE + 26}
              textAnchor="middle"
            >
              {f}
            </text>
          ))}
          {Array.from({ length: BOARD_SIZE }, (_, i) => (
            <text
              key={i}
              x={-14}
              y={(BOARD_SIZE - 1 - i) * CELL + CELL / 2 + 7}
              textAnchor="end"
            >
              {i + 1}
            </text>
          ))}
        </g>
      )}

      {/* landed squares + their labels */}
      {path.slice(0, clamped + 1).map((square, i) => {
        const [cx, cy] = center(square);
        const active = i === clamped;
        return (
          <Fragment key={square}>
            <rect
              x={cx - CELL / 2}
              y={cy - CELL / 2}
              width={CELL}
              height={CELL}
              fill="#6EC1D6"
              opacity={active ? 0.14 : 0.07}
              style={{ transition: "opacity 0.6s cubic-bezier(0.33,1,0.68,1)" }}
            />
            {labels?.[i] && (
              <text
                x={cx}
                y={cy + CELL / 2 - 12}
                textAnchor="middle"
                fontSize={19}
                fontFamily="var(--font-mono)"
                fill={active ? "#6EC1D6" : "#8B8B90"}
                style={{ transition: "fill 0.6s ease" }}
              >
                {labels[i]}
              </text>
            )}
          </Fragment>
        );
      })}

      {/* the tour trail — each segment draws itself as it becomes active */}
      <g fill="none" stroke="#6EC1D6" strokeWidth={3} strokeLinecap="round">
        {path.slice(0, clamped).map((square, i) => {
          const [x1, y1] = center(square);
          const [x2, y2] = center(path[i + 1]);
          return (
            <line
              key={`${square}-${path[i + 1]}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={0}
              style={{
                animation:
                  "intro-draw 0.7s cubic-bezier(0.65,0,0.35,1) backwards",
              }}
            />
          );
        })}
      </g>

      {/* origin marker */}
      {(() => {
        const [ox, oy] = center(path[0]);
        return <circle cx={ox} cy={oy} r={6} fill="#6EC1D6" opacity={0.8} />;
      })()}

      {/* the knight */}
      <g
        className="knight-piece"
        style={{ transform: `translate(${kx}px, ${ky}px)` }}
      >
        <path
          d={KNIGHT_PATH}
          fill="#F2EFE9"
          transform={`translate(${-KNIGHT_CENTER.x * KNIGHT_SCALE} ${
            -KNIGHT_CENTER.y * KNIGHT_SCALE
          }) scale(${KNIGHT_SCALE})`}
        />
      </g>
    </svg>
  );
}
