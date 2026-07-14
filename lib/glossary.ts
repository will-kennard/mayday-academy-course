import glossaryContent from "@/data/glossary.json";
import type { GlossaryLetterGroup, GlossaryTerm } from "@/lib/types";

const terms = glossaryContent.terms as GlossaryTerm[];

/**
 * Return every glossary term sorted alphabetically by display name.
 */
export function getAllTerms(): GlossaryTerm[] {
  return [...terms].sort((a, b) =>
    a.term.localeCompare(b.term, "en", { sensitivity: "base" })
  );
}

/**
 * Find a single glossary term by its URL slug.
 */
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return terms.find((term) => term.slug === slug);
}

/**
 * Group terms under A–Z headings for the alphabetical glossary grid.
 * Only letters that have at least one term are included.
 */
export function getTermsGroupedByLetter(): GlossaryLetterGroup[] {
  const groups = new Map<string, GlossaryTerm[]>();

  for (const term of getAllTerms()) {
    const letter = term.term.charAt(0).toUpperCase();
    const existing = groups.get(letter) ?? [];
    existing.push(term);
    groups.set(letter, existing);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, letterTerms]) => ({ letter, terms: letterTerms }));
}
