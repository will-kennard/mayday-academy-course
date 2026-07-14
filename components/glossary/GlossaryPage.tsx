import Link from "next/link";
import type { GlossaryLetterGroup } from "@/lib/types";
import { routes } from "@/lib/routes";

const INTRO =
  "A plain-English reference for the words and ideas you will meet while learning month-end close. Browse alphabetically, then open any term for a fuller definition.";

export default function GlossaryPage({
  groups,
}: {
  groups: GlossaryLetterGroup[];
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header>
        <h1 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">
          Month-end Glossary
        </h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">{INTRO}</p>
      </header>

      <nav
        aria-label="Jump to letter"
        className="mt-8 flex flex-wrap gap-2 border-b border-border pb-6"
      >
        {groups.map(({ letter }) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
          >
            {letter}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-10">
        {groups.map(({ letter, terms }) => (
          <section
            key={letter}
            id={`letter-${letter}`}
            aria-labelledby={`heading-${letter}`}
            className="scroll-mt-28"
          >
            <h2
              id={`heading-${letter}`}
              className="font-poppins text-2xl font-semibold tracking-tight text-brand"
            >
              {letter}
            </h2>
            <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {terms.map((term) => (
                <li key={term.slug}>
                  <Link
                    href={routes.glossaryTerm(term.slug)}
                    className="block rounded-md px-1 py-1.5 font-medium transition-colors hover:text-brand"
                  >
                    {term.term}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
