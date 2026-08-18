import Reveal from "./Reveal";
<<<<<<< HEAD
import { SKILL_GROUPS, SKILL_MARQUEE } from "@/lib/content";
=======
import { SKILLS, SKILL_MARQUEE } from "@/lib/content";
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739

function MarqueeRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex w-max items-center font-mono text-sm text-muted"
    >
      {SKILL_MARQUEE.map((skill) => (
        <li key={skill} className="flex items-center">
          <span className="whitespace-nowrap">{skill}</span>
          <span
            aria-hidden="true"
            className="mx-8 h-1 w-1 shrink-0 rounded-full bg-accent-dim md:mx-12"
          />
        </li>
      ))}
    </ul>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 py-24 md:py-36"
    >
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="eyebrow">04 — Skills</p>
          <h2 id="skills-heading" className="mt-4 h-section">
            Tools of the trade
          </h2>
        </Reveal>

<<<<<<< HEAD
        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.name} delay={i * 70}>
              <div className="border-t border-ink/10 pt-6">
                <h3 className="eyebrow">{group.name}</h3>
                <ul className="mt-5 space-y-2.5 font-mono text-sm text-ink/90">
                  {group.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
=======
        <Reveal delay={120}>
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:gap-20">
            <div>
              <h3 className="eyebrow">Programming</h3>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm text-ink/90">
                {SKILLS.programming.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow">Analysis &amp; tooling</h3>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm text-ink/90">
                {SKILLS.tools.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
>>>>>>> 5c27625259916a350bdd5e8163d6633baca77739
      </div>

      <Reveal delay={160}>
        <div
          className="marquee mt-20 overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:mt-28"
          tabIndex={0}
          aria-label="Skills ticker — hover or focus to pause"
        >
          <div className="marquee-track flex w-max">
            <MarqueeRow />
            <MarqueeRow hidden />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
