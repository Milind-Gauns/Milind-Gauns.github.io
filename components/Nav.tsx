"use client";

import { useEffect, useState } from "react";

const LINKS: [href: string, label: string][] = [
  ["#about", "about"],
  ["#work", "work"],
  ["#projects", "projects"],
  ["#play", "play"],
  ["#contact", "contact"],
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
        <ul className="flex items-center gap-3 sm:gap-6 md:gap-9">
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="text-muted transition-colors hover:text-accent"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
