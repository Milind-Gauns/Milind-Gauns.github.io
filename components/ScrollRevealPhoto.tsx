"use client";

import Image from "next/image";
<<<<<<< HEAD
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Wipe runs from the top edge at 88% of the viewport to 26%. */
const START = 0.88;
const END = 0.26;

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Focal point for the crop, e.g. "50% 60%". */
  objectPosition?: string;
};
=======
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Photo = { src: string; alt: string; width: number; height: number };
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739

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

<<<<<<< HEAD
  /**
   * Driven by live geometry rather than ScrollTrigger.
   *
   * The effect is a linear map from the element's position to a clip-path,
   * so it needs none of ScrollTrigger's machinery. Reading the rect each
   * frame also means it cannot go stale when the GSAP-pinned section above
   * changes the page height after first paint.
   */
  useEffect(() => {
    if (reduced) return;

    const el = root.current;
    const coverEl = cover.current;
    const edgeEl = edge.current;
    if (!el || !coverEl || !edgeEl) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const { top } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = (START - END) * vh;
      const progress = Math.min(Math.max((START * vh - top) / span, 0), 1);
      const pct = progress * 100;

      coverEl.style.clipPath = `inset(0% 0% ${pct.toFixed(2)}% 0%)`;
      edgeEl.style.top = `${pct.toFixed(2)}%`;
      // the scan line fades in off the ends rather than popping
      edgeEl.style.opacity = String(
        Math.min(progress * 6, (1 - progress) * 6, 1),
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      coverEl.style.clipPath = "";
      edgeEl.style.top = "";
      edgeEl.style.opacity = "";
    };
  }, [reduced]);
=======
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
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739

  // Without the wipe the top photo would cover the bottom one forever, so
  // reduced motion gets both, stacked.
  if (reduced) {
    return (
      <figure className={className}>
<<<<<<< HEAD
        <div className="max-w-[26rem] space-y-4">
=======
        <div className="space-y-4">
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
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
<<<<<<< HEAD
                sizes="(max-width: 768px) 90vw, 26rem"
                style={{ objectPosition: photo.objectPosition }}
=======
                sizes="(max-width: 768px) 90vw, 45vw"
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
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
<<<<<<< HEAD
      <div className="relative h-[clamp(20rem,56vh,32rem)] w-full max-w-[26rem] overflow-hidden rounded-lg bg-surface">
=======
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface">
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
        {/* revealed underneath */}
        <Image
          src={bottom.src}
          alt={bottom.alt}
          width={bottom.width}
          height={bottom.height}
<<<<<<< HEAD
          sizes="(max-width: 768px) 90vw, 26rem"
          style={{ objectPosition: bottom.objectPosition }}
=======
          sizes="(max-width: 768px) 90vw, 45vw"
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* wipes away */}
        <div ref={cover} className="absolute inset-0">
          <Image
            src={top.src}
            alt={top.alt}
            width={top.width}
            height={top.height}
<<<<<<< HEAD
            sizes="(max-width: 768px) 90vw, 26rem"
            style={{ objectPosition: top.objectPosition }}
=======
            sizes="(max-width: 768px) 90vw, 45vw"
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
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
