import Reveal from "./Reveal";
import { PROJECTS } from "@/lib/content";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 py-24 md:py-36"
    >
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="eyebrow">03 — Projects</p>
          <h2 id="projects-heading" className="mt-4 h-section">
            Things that shipped
          </h2>
        </Reveal>

        <div className="mt-16 space-y-6 md:mt-20">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.index} delay={i * 90}>
              <article className="group grid gap-8 rounded-lg bg-surface p-8 transition-colors duration-500 hover:bg-ink/[0.05] md:p-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                <header>
                  <div className="flex items-baseline gap-4 font-mono text-[11px]">
                    <span className="text-accent">{project.index}</span>
                    <span className="text-muted">{project.year}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-medium leading-tight tracking-tight text-ink md:text-3xl">
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
                  <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-muted">
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
