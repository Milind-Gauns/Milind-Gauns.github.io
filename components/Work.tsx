import Counter from "./Counter";
import Reveal from "./Reveal";
import { HONOURS, LEADERSHIP, METRICS, ROLES } from "@/lib/content";

function Metrics() {
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:gap-y-16">
      {METRICS.map((m) => (
        <li key={m.label}>
          <p className="font-mono text-3xl text-ink md:text-4xl">
            {m.display ? (
              <span className="tabular-nums">{m.display}</span>
            ) : (
              <Counter
                value={m.value}
                decimals={m.decimals}
                prefix={m.prefix}
                suffix={m.suffix}
                grouping={m.grouping}
              />
            )}
          </p>
          <p className="mt-3 text-sm leading-snug text-muted">{m.label}</p>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-dim">
            {m.source}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 py-24 md:py-36"
    >
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="eyebrow">02 — Work</p>
          <h2 id="work-heading" className="mt-4 h-section">
            What it added up to
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-16 md:mt-20">
          <Metrics />
        </Reveal>

        {/* roles */}
        <div className="mt-24 space-y-16 md:mt-32">
          {ROLES.map((role) => (
            <Reveal key={role.org}>
              <article className="grid gap-6 border-t border-ink/10 pt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
                <header>
                  <h3 className="text-xl font-medium leading-snug tracking-tight text-ink">
                    {role.org}
                  </h3>
                  <p className="mt-3 text-sm leading-snug text-muted">
                    {role.role}
                  </p>
                  <p className="mt-4 font-mono text-[11px] text-accent-dim">
                    {role.period}
                    {role.place ? ` · ${role.place}` : ""}
                  </p>
                </header>
                <ul className="space-y-4">
                  {role.bullets.map((bullet) => (
                    <li
                      key={bullet.slice(0, 28)}
                      className="flex gap-4 leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent-dim"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* leadership + honours */}
        <div className="mt-24 grid gap-16 md:mt-32 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h3 className="eyebrow">Leading</h3>
            <ul className="mt-8 space-y-8">
              {LEADERSHIP.map((item) => (
                <li key={item.role} className="border-t border-ink/10 pt-6">
                  <p className="font-medium leading-snug text-ink">
                    {item.role}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-accent-dim">
                    {item.org} · {item.period}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="eyebrow">Recognised</h3>
            <ul className="mt-8 space-y-8">
              {HONOURS.map((item) => (
                <li
                  key={item.text.slice(0, 28)}
                  className="flex gap-6 border-t border-ink/10 pt-6"
                >
                  <span className="shrink-0 font-mono text-sm text-accent">
                    {item.year}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
