"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Photo = { src: string; alt: string; width: number; height: number };

type Props = {
  top: Photo;
  bottom: Photo;
  topCaption?: string;
  bottomCaption?: string;
  className?: string;
};

/**
 * Scroll-driven wipe: the top photo retracts as the block moves through the
 * viewport, revealing the one beneath, with a thin accent edge riding the
 * boundary like a scan line.
 *
 * Under reduced motion the wipe is skipped and both photos are shown as a
 * plain pair, so nothing is hidden from anyone.
 */
export default function ScrollRevealPhoto({
  top,
  bottom,
  topCaption,
  bottomCaption,
  className = "",
}: Props) {
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const edge = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const el = root.current;
      const coverEl = cover.current;
      const edgeEl = edge.current;
      if (!el || !coverEl || !edgeEl) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "bottom 55%",
          scrub: 0.8,
        },
      });

      tl.fromTo(
        coverEl,
        { clipPath: "inset(0% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 100% 0%)", ease: "none" },
        0,
      ).fromTo(
        edgeEl,
        { top: "0%", opacity: 0 },
        { top: "100%", opacity: 1, ease: "none" },
        0,
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([coverEl, edgeEl], { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  // Without the wipe the top photo would cover the bottom one forever, so
  // reduced motion gets both, stacked.
  if (reduced) {
    return (
      <figure className={className}>
        <div className="space-y-4">
          {[bottom, top].map((photo, i) => (
            <div
              key={photo.src}
              className="overflow-hidden rounded-lg bg-surface"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 768px) 90vw, 45vw"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="sr-only">
                {i === 0 ? bottomCaption : topCaption}
              </figcaption>
            </div>
          ))}
        </div>
        {(topCaption || bottomCaption) && (
          <figcaption className="mt-4 flex items-baseline justify-between gap-6 font-mono text-[11px] text-muted">
            <span>{topCaption}</span>
            <span className="text-right">{bottomCaption}</span>
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure ref={root} className={className}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface">
        {/* revealed underneath */}
        <Image
          src={bottom.src}
          alt={bottom.alt}
          width={bottom.width}
          height={bottom.height}
          sizes="(max-width: 768px) 90vw, 45vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* wipes away */}
        <div ref={cover} className="absolute inset-0">
          <Image
            src={top.src}
            alt={top.alt}
            width={top.width}
            height={top.height}
            sizes="(max-width: 768px) 90vw, 45vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div
          ref={edge}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-px bg-accent opacity-0 shadow-[0_0_18px_2px_rgba(110,193,214,0.55)]"
        />
      </div>
      {(topCaption || bottomCaption) && (
        <figcaption className="mt-4 flex items-baseline justify-between gap-6 font-mono text-[11px] text-muted">
          <span>{topCaption}</span>
          <span className="text-right">{bottomCaption}</span>
        </figcaption>
      )}
    </figure>
  );
}
