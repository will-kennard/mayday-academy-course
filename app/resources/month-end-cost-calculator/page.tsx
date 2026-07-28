import type { Metadata } from "next";
import { Suspense } from "react";
import MonthEndCalculator, {
  MonthEndCalculatorFallback,
} from "@/components/month-end-calculator/MonthEndCalculator";
import { absoluteUrl, routes } from "@/lib/routes";

const title = "Month-End Cost Calculator | What Your Close Really Costs";
const description =
  "Work out what the manual half of your month-end close costs you each year, and see how your process compares. A short quiz, full result, no signup.";
const path = routes.monthEndCostCalculator();

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: absoluteUrl(path),
  },
  openGraph: {
    title: "How much does your month end actually cost?",
    description:
      "Answer a short quiz for an estimate of what your close costs every year - and how mature your process is.",
    url: absoluteUrl(path),
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Month-End Cost Calculator",
  description,
  url: absoluteUrl(path),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
  },
  provider: {
    "@type": "Organization",
    name: "Mayday",
    url: "https://www.getmayday.com",
  },
};

export default function MonthEndCostCalculatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-8">
        <h1 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">
          How much does your month end actually cost?
        </h1>
        <p className="mt-3 leading-relaxed text-muted">
          Bookkeeping is automated. Reporting is automated. The bit in between
          still isn&apos;t - and it quietly eats a week of every month. Answer a
          short quiz for an estimate of what that costs you a year, and how
          mature your process is.
        </p>
        <p className="mt-2 text-sm text-muted">
          No signup. Your full result appears when you finish both parts.
        </p>
      </header>

      <Suspense fallback={<MonthEndCalculatorFallback />}>
        <MonthEndCalculator />
      </Suspense>

      <section className="mt-14 space-y-5 border-t border-border pt-10">
        <h2 className="font-poppins text-2xl font-bold tracking-tight sm:text-3xl">
          Why the middle of month end is the expensive part
        </h2>
        <p className="leading-relaxed text-muted">
          Bank feeds handle incoming transactions. OCR reads the bills. Rules
          classify the coding. Dashboards produce the reports. All of that is now
          table stakes for a finance team on a modern ledger.
        </p>
        <p className="leading-relaxed text-muted">
          But between &quot;the data is in Xero&quot; and &quot;the reports are
          out&quot; sits an operations layer that almost every team still does by
          hand: intercompany reconciliations and recharges, cross-entity bank
          reconciliation, deferred revenue and prepayment schedules,
          chart-of-accounts alignment across group entities, and variance
          analysis. It&apos;s repetitive, it&apos;s high-risk, and because
          it&apos;s spread across spreadsheets and inboxes it rarely appears as a
          line item anywhere.
        </p>
        <p className="leading-relaxed text-muted">
          That&apos;s what this calculator is for: putting a single number on work
          that&apos;s usually invisible. It costs nothing to run, doesn&apos;t
          require a signup, and the arithmetic is shown in full so you can check
          it or take it to your finance director.
        </p>

        <h3 className="font-poppins pt-2 text-xl font-semibold tracking-tight">
          What counts as the operations layer?
        </h3>
        <p className="leading-relaxed text-muted">
          Anything between bookkeeping and reporting that your team does manually
          every month, repeatedly, in broadly the same way. If a competent new
          starter could be handed a documented process and produce the same
          output, it&apos;s operations layer work - and it&apos;s the work most
          likely to be automatable.
        </p>

        <h3 className="font-poppins pt-2 text-xl font-semibold tracking-tight">
          How accurate is the estimate?
        </h3>
        <p className="leading-relaxed text-muted">
          As accurate as the four numbers you enter. It&apos;s a scale estimate
          rather than a precise costing, and it&apos;s most useful as a way to see
          the order of magnitude - most teams are surprised by the annual figure
          rather than the monthly one.
        </p>
      </section>
    </div>
  );
}
