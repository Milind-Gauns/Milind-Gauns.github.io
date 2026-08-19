"use client";

import { useEffect, useState } from "react";
import { PERSON } from "@/lib/content";

/** `always` links survive the mobile squeeze; the rest appear from sm up. */
const LINKS: { href: string; label: string; always?: boolean }[] = [
  { href: "#about", label: "about" },
  { href: "#work", label: "work", always: true },
  { href: "#projects", label: "projects", always: true },
  { href: "#play", label: "play" },
  { href: "#contact", label: "contact", always: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-base/75 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-5 font-mono text-[11px] sm:px-6 sm:text-xs"
      >
        <a
          href="#main"
          className="shrink-0 text-ink transition-colors hover:text-accent"
          aria-label="Milind Gauns — back to top"
        >
          mg<span className="text-accent">.</span>
        </a>
        <ul className="flex items-center gap-3 sm:gap-6 md:gap-8">
          {LINKS.map((link) => (
            <li key={link.href} className={link.always ? "" : "hidden sm:block"}>
              <a
                href={link.href}
                className="text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={PERSON.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-ink ring-1 ring-ink/20 transition-colors hover:text-accent hover:ring-accent/60"
            >
              <span className="sm:hidden">cv ↓</span>
              <span className="hidden sm:inline">résumé ↓</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
