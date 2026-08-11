/**
 * Knight geometry for the site's central motif.
 *
 * Coordinates are [file, rank] with 0-indexed origin at a1 (bottom-left),
 * matching how a board is read rather than how the screen is drawn.
 * Rendering flips the rank axis.
 */

export type Coord = [file: number, rank: number];

export const BOARD_SIZE = 8;

const FILES = "abcdefgh";

export const KNIGHT_OFFSETS: Coord[] = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

export function toSquare([file, rank]: Coord): string {
  return `${FILES[file]}${rank + 1}`;
}

export function fromSquare(square: string): Coord {
  return [FILES.indexOf(square[0]), Number(square[1]) - 1];
}

export function onBoard([file, rank]: Coord): boolean {
  return file >= 0 && file < BOARD_SIZE && rank >= 0 && rank < BOARD_SIZE;
}

export function knightMovesFrom([file, rank]: Coord): Coord[] {
  return KNIGHT_OFFSETS.map(
    ([df, dr]) => [file + df, rank + dr] as Coord,
  ).filter(onBoard);
}

export function isKnightMove(a: Coord, b: Coord): boolean {
  const df = Math.abs(a[0] - b[0]);
  const dr = Math.abs(a[1] - b[1]);
  return (df === 1 && dr === 2) || (df === 2 && dr === 1);
}

/** Light squares are the ones where file+rank is even, as on a real board. */
export function isLightSquare([file, rank]: Coord): boolean {
  return (file + rank) % 2 === 1;
}

/**
 * The career path: six squares, each one legal knight move from the last.
 * Verified by `assertCareerPath` below and by the unit check in scripts/.
 */
export const CAREER_PATH: string[] = ["a1", "c2", "e3", "g4", "f6", "e8"];

export function assertCareerPath(path: string[] = CAREER_PATH): boolean {
  return path.every((sq, i) => {
    if (i === 0) return true;
    return isKnightMove(fromSquare(path[i - 1]), fromSquare(sq));
  });
}

const TOTAL_SQUARES = BOARD_SIZE * BOARD_SIZE;

/**
 * Complete knight's tour from any starting square.
 *
 * Plain Warnsdorff (always hop to the square with the fewest onward moves)
 * dead-ends from some starts — e3 strands at 60 squares — so candidates are
 * explored in Warnsdorff order with backtracking. The heuristic ordering means
 * the first branch is almost always right, and the node budget bounds the
 * worst case so this can never hang the UI.
 *
 * Deterministic: ties break toward the lowest knight-offset index, so the
 * "solve" button always draws the same tour for a given start.
 */
export function knightsTour(start: Coord, nodeBudget = 200_000): Coord[] {
  const visited = new Set<string>([start.join(",")]);
  const path: Coord[] = [start];
  let nodes = 0;

  const onwardDegree = (c: Coord) =>
    knightMovesFrom(c).filter((n) => !visited.has(n.join(","))).length;

  const search = (current: Coord): boolean => {
    if (path.length === TOTAL_SQUARES) return true;
    if (++nodes > nodeBudget) return false;

    const candidates = knightMovesFrom(current)
      .filter((c) => !visited.has(c.join(",")))
      .map((c, i) => ({ c, i, degree: onwardDegree(c) }))
      .sort((a, b) => a.degree - b.degree || a.i - b.i);

    for (const { c } of candidates) {
      const key = c.join(",");
      visited.add(key);
      path.push(c);
      if (search(c)) return true;
      path.pop();
      visited.delete(key);
    }
    return false;
  };

  search(start);
  return path;
}
