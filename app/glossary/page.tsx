import type { Metadata } from "next";
import { getTermsGroupedByLetter } from "@/lib/glossary";
import { absoluteUrl, routes } from "@/lib/routes";
import GlossaryPage from "@/components/glossary/GlossaryPage";

const DESCRIPTION =
  "A plain-English month-end glossary covering close processes, accruals, reconciliations, financial statements and the core accounting terms you need to learn month end.";

export const metadata: Metadata = {
  title: "Month-end Glossary",
  description: DESCRIPTION,
  alternates: {
    canonical: absoluteUrl(routes.glossary()),
  },
};

export default function Page() {
  const groups = getTermsGroupedByLetter();

  return <GlossaryPage groups={groups} />;
}
