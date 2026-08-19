"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PERSON } from "@/lib/content";

type Action = {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
};

const SECTIONS: [id: string, label: string][] = [
  ["tour", "The tour"],
  ["work", "Work"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["play", "Off the clock"],
  ["contact", "Contact"],
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * ⌘K / Ctrl+K palette: jump to a section, copy either address, or open a
 * profile. Keyboard-first, which is rather the point.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
    restoreFocus.current?.focus();
  }, []);

  const copy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked — the mailto links still work */
    }
  }, []);

  const actions = useMemo<Action[]>(() => {
    const nav: Action[] = SECTIONS.map(([id, label]) => ({
      id: `go-${id}`,
      label: `Go to ${label}`,
      hint: "section",
      keywords: `${label} ${id} navigate jump`,
      run: () => {
        close();
        scrollTo(id);
      },
    }));

    return [
      {
        id: "resume",
        label: "Download résumé",
        hint: "PDF",
        keywords: "resume cv download pdf curriculum vitae",
        run: () => {
          close();
          window.open(PERSON.resume, "_blank", "noopener,noreferrer");
        },
      },
      ...nav,
      {
        id: "copy-student",
        label: "Copy student email",
        hint: PERSON.emails.student,
        keywords: "email copy gim student address contact",
        run: () => copy(PERSON.emails.student, "copy-student"),
      },
      {
        id: "copy-personal",
        label: "Copy personal email",
        hint: PERSON.emails.personal,
        keywords: "email copy gmail personal address contact",
        run: () => copy(PERSON.emails.personal, "copy-personal"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "linkedin.com/in/milindgauns",
        keywords: "linkedin social profile network",
        run: () => {
          close();
          window.open(PERSON.linkedin, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "github.com/Milind-Gauns",
        keywords: "github code repository source",
        run: () => {
          close();
          window.open(PERSON.github, "_blank", "noopener,noreferrer");
        },
      },
    ];
  }, [close, copy]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) =>
      `${a.label} ${a.keywords}`.toLowerCase().includes(q),
    );
  }, [actions, query]);

  // global open shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        restoreFocus.current = document.activeElement as HTMLElement;
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) =>
        results.length ? (c - 1 + results.length) % results.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[cursor]?.run();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        type="button"
        aria-label="Close command palette"
        onClick={close}
        className="absolute inset-0 cursor-default bg-base/80 backdrop-blur-sm"
      />
      <div
        className="palette-enter relative w-full max-w-lg overflow-hidden rounded-xl bg-surface shadow-2xl ring-1 ring-ink/10"
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Jump to, or copy…"
          aria-label="Search commands"
          className="w-full bg-transparent px-5 py-4 font-mono text-sm text-ink outline-none placeholder:text-muted"
        />
        <div className="rule" />
        <ul className="max-h-80 overflow-y-auto py-2" role="listbox">
          {results.length === 0 && (
            <li className="px-5 py-4 font-mono text-xs text-muted">
              Nothing matches that.
            </li>
          )}
          {results.map((action, i) => (
            <li key={action.id}>
              <button
                type="button"
                role="option"
                aria-selected={i === cursor}
                onMouseEnter={() => setCursor(i)}
                onClick={action.run}
                className={`flex w-full items-baseline justify-between gap-4 px-5 py-2.5 text-left transition-colors ${
                  i === cursor ? "bg-ink/[0.06]" : ""
                }`}
              >
                <span className="text-sm text-ink">
                  {copied === action.id ? "Copied" : action.label}
                </span>
                <span className="truncate font-mono text-[11px] text-muted">
                  {action.hint}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="rule" />
        <p className="px-5 py-3 font-mono text-[10px] text-muted">
          ↑↓ move · ⏎ select · esc close
        </p>
      </div>
    </div>
  );
}
