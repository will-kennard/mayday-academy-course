import type { Metadata } from "next";
import { Suspense } from "react";
import CalculatorHero from "@/components/month-end-calculator/CalculatorHero";
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
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CalculatorHero />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Suspense fallback={<MonthEndCalculatorFallback />}>
          <MonthEndCalculator />
        </Suspense>
      </div>
    </div>
  );
}
