import Image from "next/image";
import Reveal from "./Reveal";
import { INTRO, PHOTOS } from "@/lib/content";

export default function Intro() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 py-24 md:py-36"
    >
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="eyebrow">01 — About</p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <h2 id="about-heading" className="h-section text-balance">
              Three directions, one lesson
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-7 text-lg leading-relaxed text-muted md:text-xl">
              {INTRO.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-20 md:mt-28">
          <figure>
            <div className="overflow-hidden rounded-lg bg-surface">
              <Image
                src={PHOTOS.gim.src}
                alt={PHOTOS.gim.alt}
                width={PHOTOS.gim.width}
                height={PHOTOS.gim.height}
                sizes="(max-width: 1280px) 100vw, 78rem"
                className="h-[42vh] w-full object-cover md:h-[56vh]"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-4 font-mono text-[11px] text-muted">
              <span>Goa Institute of Management — Sanquelim campus</span>
              <span>PGDM Big Data Analytics, 2026–28</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
