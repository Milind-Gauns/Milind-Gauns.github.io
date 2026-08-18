import Image from "next/image";
import HeroBoard from "./board/HeroBoard";
import Reveal from "./Reveal";
import { PERSON, PHOTOS } from "@/lib/content";

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative mx-auto flex min-h-svh max-w-content flex-col justify-center px-6 pb-24 pt-32 lg:pb-0 lg:pt-0"
    >
      <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        {/* ---- left: the claim ---- */}
        <div className="lg:pr-8">
          <Reveal>
<<<<<<< HEAD
            <p className="eyebrow">{PERSON.positioning}</p>
=======
            <p className="eyebrow">Portfolio — 2026</p>
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-[clamp(2.75rem,8vw,5.5rem)] font-medium leading-[0.92] tracking-tight">
              Milind
              <br />
              Gauns
            </h1>
          </Reveal>
<<<<<<< HEAD
          <Reveal delay={180}>
            <p className="mt-8 max-w-md text-balance text-xl leading-snug text-ink md:text-2xl">
              {PERSON.pitch}
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 max-w-sm font-mono text-sm leading-relaxed text-muted">
              {PERSON.now}
              <br />
              {PERSON.previously}
            </p>
          </Reveal>
          <Reveal delay={340}>
            <p className="mt-8 inline-flex max-w-sm items-start gap-3 rounded-md bg-surface px-4 py-3 font-mono text-[11px] leading-relaxed text-ink/85">
              <span
                aria-hidden="true"
                className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {PERSON.availability}
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs">
              <a
                href="#projects"
                className="rounded-md bg-accent px-5 py-3 font-medium text-base transition-opacity hover:opacity-90"
              >
                View projects
              </a>
              <a
                href={PERSON.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-5 py-3 text-ink ring-1 ring-ink/20 transition-colors hover:text-accent hover:ring-accent/60"
              >
                Download résumé ↓
              </a>
              <span className="hidden text-muted lg:inline">
=======
          <Reveal delay={200}>
            <p className="mt-10 max-w-md text-balance text-xl leading-snug text-ink md:text-2xl">
              {PERSON.thesis}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 max-w-sm font-mono text-sm leading-relaxed text-muted">
              {PERSON.now}
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs">
              <a
                href="#work"
                className="text-accent underline decoration-accent-dim underline-offset-[6px] transition-colors hover:decoration-accent"
              >
                see the work
              </a>
              <span className="hidden text-muted sm:inline">
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
                or press{" "}
                <kbd className="rounded border border-ink/15 px-1.5 py-0.5 text-[10px] text-ink/70">
                  ⌘K
                </kbd>
              </span>
            </div>
          </Reveal>
        </div>

        {/* ---- right: the board, with him standing in front of it ---- */}
        <Reveal delay={250} className="relative">
          <div className="mx-auto w-full max-w-[30rem] lg:ml-auto lg:mr-0 lg:max-w-none lg:pl-[22%]">
            <HeroBoard>
              <Image
                src={PHOTOS.portrait.src}
                alt={PHOTOS.portrait.alt}
                width={PHOTOS.portrait.width}
                height={PHOTOS.portrait.height}
                priority
                sizes="(max-width: 1024px) 55vw, 30vw"
                /* Stands in front of the board's left edge. The cutout ends at
                   the shins, so the base is faded out rather than cut. */
                className="pointer-events-none absolute bottom-0 left-0 h-[94%] w-auto max-w-none select-none object-contain object-bottom drop-shadow-[0_30px_70px_rgba(0,0,0,0.7)] lg:left-[-30%] lg:h-[112%]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, #000 86%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 86%, transparent 100%)",
                }}
              />
            </HeroBoard>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-6 hidden items-center gap-4 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
          scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-accent-dim/25">
          <span className="scroll-line absolute inset-0 block bg-accent-dim" />
        </span>
      </div>
    </section>
  );
}
