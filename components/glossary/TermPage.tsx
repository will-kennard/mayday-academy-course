import Link from "next/link";
import type { GlossaryTerm } from "@/lib/types";
import { routes } from "@/lib/routes";
import Breadcrumb from "@/components/Breadcrumb";

export default function TermPage({ term }: { term: GlossaryTerm }) {
  const paragraphs = term.definition.split("\n\n").filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Month-end Glossary", href: routes.glossary() },
          { label: term.term },
        ]}
      />

      <article className="mt-6">
        <h1 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">
          {term.term}
        </h1>
        <div className="mt-6 space-y-4 leading-relaxed text-foreground">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </article>

      <p className="mt-10">
        <Link
          href={routes.glossary()}
          className="text-sm font-medium text-brand hover:underline"
        >
          &larr; Back to glossary
        </Link>
      </p>
    </div>
  );
}
