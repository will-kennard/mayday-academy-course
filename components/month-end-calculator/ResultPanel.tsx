"use client";

import AnimatedCurrency from "@/components/month-end-calculator/AnimatedCurrency";
import {
  formatCurrency,
  formatHours,
  formatNumber,
  roundCost,
  type CalculatorResult,
  type MaturityBand,
} from "@/lib/month-end-calculator";

export default function ResultPanel({
  result,
  animateHeadline,
  onHeadlineComplete,
  maturity,
}: {
  result: CalculatorResult;
  animateHeadline: boolean;
  onHeadlineComplete?: () => void;
  maturity: { scaledScore: number; band: MaturityBand };
}) {
  const annualDisplay = roundCost(result.annualCost);
  const recoverableLow = roundCost(result.recoverableCostLow);
  const recoverableHigh = roundCost(result.recoverableCostHigh);

  return (
    <section
      id="mec-result"
      aria-live="polite"
      className="scroll-mt-28 rounded-xl border border-accent/30 bg-accent-soft p-5 sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        Your full result
      </p>

      <h2 className="font-poppins mt-3 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
        Your month end costs around{" "}
        <span className="whitespace-nowrap text-brand">
          <AnimatedCurrency
            value={annualDisplay}
            animate={animateHeadline}
            onComplete={onHeadlineComplete}
          />{" "}
          a year.
        </span>
      </h2>

      <p className="mt-3 text-base leading-relaxed text-heading">
        And your process sits in{" "}
        <strong>
          {maturity.band.label} ({maturity.scaledScore}/10)
        </strong>
         : {maturity.band.rangeLabel} on the maturity scale.
      </p>

      <div className="mt-5 rounded-lg border border-brand/20 bg-white/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">
          Maturity · {maturity.scaledScore}/10 · {maturity.band.rangeLabel}
        </p>
        <h3 className="font-poppins mt-2 text-lg font-semibold text-heading">
          {maturity.band.label}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-heading">
          {maturity.band.copy}
        </p>
      </div>

      <div className="mt-5 rounded-lg border border-border/70 bg-white/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          How the cost is made up
        </p>
        <p className="mt-2 font-mono text-sm leading-relaxed text-heading">
          {result.breakdownSentence}
        </p>
        <p className="mt-3 text-sm text-muted">
          {formatHours(result.monthlyHours)} hours a month ·{" "}
          {formatNumber(result.annualHours)} hours a year
        </p>
      </div>

      <div className="mt-5">
        <h3 className="font-poppins text-base font-semibold text-heading">
          What&apos;s recoverable
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-heading">
          Teams that automate this layer typically recover 60–80% of those hours
          - roughly{" "}
          <strong>
            {formatCurrency(recoverableLow)}–{formatCurrency(recoverableHigh)} a
            year
          </strong>
          , or {formatNumber(Math.round(result.recoverableHoursLow))} to{" "}
          {formatNumber(Math.round(result.recoverableHoursHigh))} hours handed
          back to your team. An illustration based on customer outcomes, not a
          guarantee.
        </p>
      </div>

      <details className="mt-5 rounded-lg border border-border/70 bg-white/70 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-heading outline-none focus-visible:ring-2 focus-visible:ring-mayday-red">
          How we calculated this
        </summary>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-heading">
          <p>
            Everything here comes from the numbers and answers you entered.
            Nothing is inferred about your business.
          </p>
          <p>
            <strong>Annual cost</strong> = entities × hours per entity × 12
            months × blended hourly rate.
          </p>
          <p>
            We deliberately count only the manual operations layer; the
            intercompany, recharge, schedule and reconciliation work described
            above. We don&apos;t add anything for review time, coordination or
            days-to-close, because those hours are already inside the figure you
            gave us and counting them twice would inflate the result.
          </p>
          <p>
            Maturity is scored from four process questions (0–2 each), then
            rescaled to /10 so the bands stay consistent with the Mending Month
            End Toolkit.
          </p>
          <p>
            The recoverable range reflects what customers report after
            automating this layer. Your own figure depends on how much of your
            close is genuinely repeatable, so treat the range as a starting
            point for a conversation rather than a forecast.
          </p>
        </div>
      </details>
    </section>
  );
}
