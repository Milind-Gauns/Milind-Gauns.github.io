import { PERSON } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-10 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Milind Gauns</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          <li>
            <a
              href={`mailto:${PERSON.emails.student}`}
              className="transition-colors hover:text-accent"
            >
              student email
            </a>
          </li>
          <li>
            <a
              href={`mailto:${PERSON.emails.personal}`}
              className="transition-colors hover:text-accent"
            >
              personal email
            </a>
          </li>
          <li>
            <a
              href={PERSON.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              linkedin
            </a>
          </li>
          <li>
            <a
              href={PERSON.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
