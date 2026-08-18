import Reveal from "./Reveal";
<<<<<<< HEAD
import { PERSON, PROJECTS } from "@/lib/content";
=======
import { PROJECTS } from "@/lib/content";
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 py-24 md:py-36"
    >
      <div className="mx-auto max-w-content px-6">
        <Reveal>
<<<<<<< HEAD
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">03 — Projects</p>
              <h2 id="projects-heading" className="mt-4 h-section">
                Things that shipped
              </h2>
            </div>
            <a
              href={PERSON.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              code on github
              <span className="text-accent-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent">
                ↗
              </span>
            </a>
          </div>
=======
          <p className="eyebrow">03 — Projects</p>
          <h2 id="projects-heading" className="mt-4 h-section">
            Things that shipped
          </h2>
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
        </Reveal>

        <div className="mt-16 space-y-6 md:mt-20">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.index} delay={i * 90}>
<<<<<<< HEAD
              <article
                className={`grid gap-8 rounded-lg p-8 transition-colors duration-500 md:p-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 ${
                  project.featured
                    ? "bg-surface ring-1 ring-accent/25"
                    : "bg-surface hover:bg-ink/[0.05]"
                }`}
              >
=======
              <article className="group grid gap-8 rounded-lg bg-surface p-8 transition-colors duration-500 hover:bg-ink/[0.05] md:p-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
                <header>
                  <div className="flex items-baseline gap-4 font-mono text-[11px]">
                    <span className="text-accent">{project.index}</span>
                    <span className="text-muted">{project.year}</span>
<<<<<<< HEAD
                    {project.featured && (
                      <span className="ml-auto rounded-full bg-accent/15 px-3 py-1 uppercase tracking-[0.18em] text-accent">
                        Government of Goa
                      </span>
                    )}
                  </div>
                  <h3
                    className={`mt-6 font-medium leading-tight tracking-tight text-ink ${
                      project.featured
                        ? "text-3xl md:text-4xl"
                        : "text-2xl md:text-3xl"
                    }`}
                  >
=======
                  </div>
                  <h3 className="mt-6 text-2xl font-medium leading-tight tracking-tight text-ink md:text-3xl">
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {project.org}
                  </p>
                  {project.status && (
                    <p className="mt-6 inline-flex items-center gap-2.5 font-mono text-[11px] text-accent">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                      />
                      {project.status}
                    </p>
                  )}
                </header>

                <div>
                  <p className="text-lg leading-relaxed text-ink/90">
                    {project.summary}
                  </p>
                  <ul className="mt-7 space-y-3.5">
                    {project.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 28)}
                        className="flex gap-4 text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-accent-dim"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
<<<<<<< HEAD

                  {project.outcome && (
                    <p className="mt-8 border-l-2 border-accent/40 pl-5 text-sm leading-relaxed text-ink/90">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                        Result
                      </span>
                      <br />
                      <span className="mt-1.5 inline-block">
                        {project.outcome}
                      </span>
                    </p>
                  )}

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-muted">
                      {project.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    {project.links && project.links.length > 0 && (
                      <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px]">
                        {project.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent underline decoration-accent-dim underline-offset-4 transition-colors hover:decoration-accent"
                            >
                              {link.label} ↗
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
=======
                  <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-muted">
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
