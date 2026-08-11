"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Board from "./board/Board";
import { MILESTONES } from "@/lib/content";
import { CAREER_PATH } from "@/lib/knightTour";

const YEARS = MILESTONES.map((m) => m.year);

/**
 * The tour, told step by step. On desktop the section pins and scroll
 * progress drives the knight from square to square, each landing swapping
 * the milestone copy. On mobile — and under reduced motion — it degrades to
 * a plain vertical list with the completed board above it.
 */
export default function TourSection() {
  const section = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        setPinned(true);
        const el = section.current;
        if (!el) return;

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * (MILESTONES.length - 1) * 0.9}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(
              MILESTONES.length - 1,
              Math.floor(self.progress * MILESTONES.length),
            );
            setStep(next);
          },
        });

        return () => {
          st.kill();
          setPinned(false);
        };
      },
    );

    return () => mm.revert();
  }, []);

  const active = MILESTONES[step];

  return (
    <section
      id="tour"
      aria-labelledby="tour-heading"
      className="scroll-mt-24 py-24 md:py-32"
    >
      <div
        ref={section}
        className={pinned ? "flex h-svh flex-col justify-center" : ""}
      >
        <div className="mx-auto w-full max-w-content px-6">
          <p className="eyebrow">The tour</p>
          <h2 id="tour-heading" className="mt-4 h-section">
            Six moves
          </h2>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
            {/* board */}
            <div className="mx-auto w-full max-w-[26rem] lg:mx-0 lg:max-w-none">
              <Board
                path={CAREER_PATH}
                step={pinned ? step : CAREER_PATH.length - 1}
                labels={YEARS}
                coordinates
                className="w-full"
              />
            </div>

            {/* copy — swaps on desktop, lists in full elsewhere */}
            {pinned ? (
              <div className="min-h-[16rem]">
                <div className="flex items-baseline gap-5 font-mono text-xs">
                  <span className="tabular-nums text-accent">
                    {String(step + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted">{active.square}</span>
                </div>
                <p
                  key={`${active.year}-y`}
                  className="mt-6 font-mono text-5xl text-ink"
                  style={{
                    animation:
                      "palette-in 0.5s cubic-bezier(0.33,1,0.68,1) both",
                  }}
                >
                  {active.year}
                </p>
                <h3
                  key={`${active.year}-t`}
                  className="mt-6 max-w-lg text-2xl font-medium leading-snug tracking-tight text-ink"
                  style={{
                    animation:
                      "palette-in 0.5s cubic-bezier(0.33,1,0.68,1) 0.05s both",
                  }}
                >
                  {active.title}
                </h3>
                <p
                  key={`${active.year}-d`}
                  className="mt-5 max-w-lg text-lg leading-relaxed text-muted"
                  style={{
                    animation:
                      "palette-in 0.5s cubic-bezier(0.33,1,0.68,1) 0.1s both",
                  }}
                >
                  {active.detail}
                </p>
              </div>
            ) : (
              <ol className="space-y-12">
                {MILESTONES.map((m, i) => (
                  <li key={m.year + m.title}>
                    <div className="flex items-baseline gap-5 font-mono text-xs">
                      <span className="tabular-nums text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-muted">{m.square}</span>
                      <span className="text-ink">{m.year}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-medium leading-snug tracking-tight text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted">
                      {m.detail}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
