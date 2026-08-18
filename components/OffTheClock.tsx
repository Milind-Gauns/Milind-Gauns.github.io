import Image from "next/image";
import KnightPuzzle from "./KnightPuzzle";
import Reveal from "./Reveal";
import ScrollRevealPhoto from "./ScrollRevealPhoto";
import { OFF_THE_CLOCK, PHOTOS } from "@/lib/content";

export default function OffTheClock() {
  return (
    <section
      id="play"
      aria-labelledby="play-heading"
      className="scroll-mt-24 py-24 md:py-36"
    >
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="eyebrow">05 — Off the clock</p>
          <h2 id="play-heading" className="mt-4 h-section text-balance">
            Your move
          </h2>
        </Reveal>

        {/* the puzzle */}
        <div className="mt-16 grid gap-14 md:mt-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <Reveal>
            <KnightPuzzle />
          </Reveal>

          <Reveal delay={120} className="lg:pt-4">
            <p className="text-xl leading-relaxed text-ink md:text-2xl">
              A knight&rsquo;s tour visits all sixty-four squares without
              landing on one twice.
            </p>
            <p className="mt-6 leading-relaxed text-muted">
              It&rsquo;s the oldest proof that an awkward-looking move can still
              be the efficient one — and the reason this site is built the way
              it is. Start anywhere. See how far you get before the board runs
              out of room.
            </p>
            <p className="mt-6 font-mono text-xs leading-relaxed text-muted">
              I&rsquo;m FIDE rated 1687 and have represented Goa at national
              championships, so I&rsquo;d take the rematch.
            </p>
          </Reveal>
        </div>

        {/* the rest of life */}
        <div className="mt-28 grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <Reveal>
            <ScrollRevealPhoto
              top={PHOTOS.palace}
              bottom={PHOTOS.strays}
              topCaption="Thirumalai Nayakkar Mahal, Madurai"
              bottomCaption="Morning roster, Goa"
            />
          </Reveal>

          <Reveal delay={120}>
            <ul className="space-y-10">
              {OFF_THE_CLOCK.map((item) => (
                <li key={item.title} className="border-t border-ink/10 pt-6">
                  <h3 className="font-mono text-sm text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>

<<<<<<< HEAD
            {/* the pickleball result, with him standing on the card's baseline */}
            <div className="relative mt-12 flex h-64 items-end overflow-hidden rounded-lg bg-surface pl-8 pr-40 md:h-72 md:pr-48">
              <div className="pb-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  Runner-up
                </p>
                <p className="mt-3 text-lg font-medium leading-snug text-ink">
                  State-level pickleball
                </p>
                <p className="mt-1 font-mono text-xs text-muted">Goa, 2026</p>
              </div>
=======
            <div className="mt-12 overflow-hidden rounded-lg bg-surface">
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
              <Image
                src={PHOTOS.pickleball.src}
                alt={PHOTOS.pickleball.alt}
                width={PHOTOS.pickleball.width}
                height={PHOTOS.pickleball.height}
<<<<<<< HEAD
                sizes="(max-width: 1024px) 45vw, 20rem"
                className="pointer-events-none absolute bottom-0 right-2 h-[112%] w-auto max-w-none select-none object-contain object-bottom"
=======
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="mx-auto h-72 w-auto object-contain"
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
