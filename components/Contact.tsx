import Board from "./board/Board";
import Reveal from "./Reveal";
import { PERSON } from "@/lib/content";
import { CAREER_PATH } from "@/lib/knightTour";

const LINKS = [
  { label: "LinkedIn", href: PERSON.linkedin, hint: "in/milindgauns" },
  { label: "GitHub", href: PERSON.github, hint: "Milind-Gauns" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-24 md:py-44"
    >
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="eyebrow">06 — Contact</p>
          <h2 id="contact-heading" className="mt-4 h-section text-balance">
            The board&rsquo;s still open
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
          <div>
            <Reveal delay={100}>
              <ul className="space-y-10">
                <li>
                  <p className="eyebrow">Student</p>
                  <a
                    href={`mailto:${PERSON.emails.student}`}
                    className="mt-3 block break-all text-xl font-medium tracking-tight text-ink underline decoration-accent-dim decoration-1 underline-offset-[10px] transition-colors hover:text-accent hover:decoration-accent sm:text-2xl md:text-3xl"
                  >
                    {PERSON.emails.student}
                  </a>
                </li>
                <li>
                  <p className="eyebrow">Personal</p>
                  <a
                    href={`mailto:${PERSON.emails.personal}`}
                    className="mt-3 block break-all text-xl font-medium tracking-tight text-ink underline decoration-accent-dim decoration-1 underline-offset-[10px] transition-colors hover:text-accent hover:decoration-accent sm:text-2xl md:text-3xl"
                  >
                    {PERSON.emails.personal}
                  </a>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={220}>
              <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm">
                {LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-baseline gap-2 text-muted transition-colors hover:text-accent"
                    >
                      {link.label.toLowerCase()}
                      <span className="text-accent-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* the tour, completed — a quiet bookend */}
          <Reveal delay={180} className="justify-self-center lg:justify-self-end">
            <div className="w-56 md:w-64">
              <Board
                path={CAREER_PATH}
                step={CAREER_PATH.length - 1}
                className="w-full"
              />
              <p className="mt-5 text-center font-mono text-[11px] text-muted">
                a1 → e8 · six moves
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
