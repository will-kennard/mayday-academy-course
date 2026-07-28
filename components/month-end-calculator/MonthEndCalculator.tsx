"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EmailCapture from "@/components/month-end-calculator/EmailCapture";
import MaturityAudit from "@/components/month-end-calculator/MaturityAudit";
import ResultPanel from "@/components/month-end-calculator/ResultPanel";
import SecondaryCtas from "@/components/month-end-calculator/SecondaryCtas";
import StepOneInputs from "@/components/month-end-calculator/StepOneInputs";
import {
  calculateResult,
  encodeShareParams,
  getDefaultInputs,
  getDefaultMaturityAnswers,
  getMaturityBand,
  getMaturityRawScore,
  normalizeInputs,
  parseShareParams,
  scaleMaturityScore,
  type CalculatorInputs,
  type MaturityAnswers,
} from "@/lib/month-end-calculator";

function countAnswered(answers: MaturityAnswers): number {
  return answers.filter((answer) => answer !== null).length;
}

export default function MonthEndCalculator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useRef(false);
  const shouldScrollOnReveal = useRef(false);

  const initial = useMemo(
    () => parseShareParams(searchParams),
    // Hydrate once from the URL on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [inputs, setInputs] = useState<CalculatorInputs>(initial.inputs);
  const [answers, setAnswers] = useState<MaturityAnswers>(initial.answers);
  const [unlocked, setUnlocked] = useState(
    () => getMaturityRawScore(initial.answers) !== null,
  );
  const [animateHeadline, setAnimateHeadline] = useState(false);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const normalized = normalizeInputs(inputs);
  const result = calculateResult(normalized);
  const answeredCount = countAnswered(answers);
  const rawScore = getMaturityRawScore(answers);
  const maturityComplete = rawScore !== null;
  const revealed = unlocked || maturityComplete;
  const scaledScore = maturityComplete ? scaleMaturityScore(rawScore) : null;
  const maturity =
    scaledScore === null
      ? null
      : {
          scaledScore,
          band: getMaturityBand(scaledScore),
        };

  const { profile, entities, hoursPerEntity, blendedRate } = normalized;

  useEffect(() => {
    if (!revealed || !shouldScrollOnReveal.current) return;
    shouldScrollOnReveal.current = false;
    const node = document.getElementById("mec-result");
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [revealed]);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }

    const params = encodeShareParams({
      inputs: { profile, entities, hoursPerEntity, blendedRate },
      answers,
    });
    const query = params.toString();
    const current = searchParams.toString();
    if (query === current) return;
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [
    answers,
    blendedRate,
    entities,
    hoursPerEntity,
    pathname,
    profile,
    router,
    searchParams,
  ]);

  const handleInputsChange = useCallback((next: CalculatorInputs) => {
    setInputs(normalizeInputs(next));
  }, []);

  const handleAnswersChange = useCallback(
    (next: MaturityAnswers) => {
      const wasComplete = getMaturityRawScore(answers) !== null;
      const nowComplete = getMaturityRawScore(next) !== null;
      setAnswers(next);
      if (!wasComplete && nowComplete) {
        setUnlocked(true);
        setAnimateHeadline(true);
        shouldScrollOnReveal.current = true;
      }
    },
    [answers],
  );

  const handleHeadlineComplete = useCallback(() => {
    setAnimateHeadline(false);
  }, []);

  const handleCopyShareLink = useCallback(async () => {
    const params = encodeShareParams({ inputs: normalized, answers });
    const url = `${window.location.origin}${pathname}?${params.toString()}`;

    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("Link copied.");
    } catch {
      window.prompt("Copy this link to share your result:", url);
      setShareStatus("Link ready to copy.");
    }
  }, [answers, normalized, pathname]);

  const remaining = 4 - answeredCount;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
        <StepOneInputs inputs={normalized} onChange={handleInputsChange} />
        <div className="mt-8">
          <MaturityAudit
            answers={answers}
            onChange={handleAnswersChange}
            answeredCount={answeredCount}
          />
        </div>

        {!revealed ? (
          <div className="sticky bottom-4 z-10 mt-8 rounded-xl border border-brand/30 bg-brand-soft p-4 shadow-lg shadow-mayday-dark/5">
            <p className="text-sm font-semibold text-heading">
              {answeredCount === 0
                ? "Answer the four maturity questions to see your full result"
                : `Answer ${remaining} more question${remaining === 1 ? "" : "s"} to see your full result`}
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80">
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-300"
                style={{ width: `${(answeredCount / 4) * 100}%` }}
              />
            </div>
          </div>
        ) : null}
      </section>

      {revealed && maturity ? (
        <ResultPanel
          result={result}
          animateHeadline={animateHeadline}
          onHeadlineComplete={handleHeadlineComplete}
          maturity={maturity}
        />
      ) : null}

      {revealed ? (
        <>
          <EmailCapture
            shareStatus={shareStatus}
            onCopyShareLink={handleCopyShareLink}
          />
          <SecondaryCtas />
        </>
      ) : null}
    </div>
  );
}

export function MonthEndCalculatorFallback() {
  const defaults = getDefaultInputs();

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
        <StepOneInputs inputs={defaults} onChange={() => {}} />
        <div className="mt-8">
          <MaturityAudit
            answers={getDefaultMaturityAnswers()}
            onChange={() => {}}
            answeredCount={0}
          />
        </div>
        <div className="mt-8 rounded-xl border border-brand/30 bg-brand-soft p-4">
          <p className="text-sm font-semibold text-heading">
            Answer the four maturity questions to see your full result
          </p>
        </div>
      </section>
    </div>
  );
}
