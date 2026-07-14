import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTerms, getTermBySlug } from "@/lib/glossary";
import { absoluteUrl, routes } from "@/lib/routes";
import TermPage from "@/components/glossary/TermPage";

type TermParams = { termSlug: string };

export function generateStaticParams(): TermParams[] {
  return getAllTerms().map((term) => ({ termSlug: term.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TermParams>;
}): Promise<Metadata> {
  const { termSlug } = await params;
  const term = getTermBySlug(termSlug);

  if (!term) {
    return { title: "Term not found" };
  }

  const description = term.definition.split("\n\n")[0] ?? term.definition;

  return {
    title: term.term,
    description,
    alternates: {
      canonical: absoluteUrl(routes.glossaryTerm(term.slug)),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<TermParams>;
}) {
  const { termSlug } = await params;
  const term = getTermBySlug(termSlug);

  if (!term) {
    notFound();
  }

  return <TermPage term={term} />;
}
