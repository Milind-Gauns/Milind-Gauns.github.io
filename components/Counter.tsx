"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// useLayoutEffect warns during SSR; there is no layout phase on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Thousands separators. Off for things like a chess rating. */
  grouping?: boolean;
  className?: string;
};

/** Counts up once, when it first scrolls into view. */
export default function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  grouping = true,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  /**
   * Starts at the real figure so the server-rendered HTML carries the actual
   * number — crawlers that don't run JS were previously indexing "0". The
   * reset to zero happens in a layout effect, before the browser paints, so
   * the animation still starts from nothing with no visible flash.
   */
  const [shown, setShown] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // power3.out
          setShown(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const formatted = shown.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouping,
  });

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
