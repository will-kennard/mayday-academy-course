"use client";

import {
  CALCULATOR_CONSTANTS,
  OPERATIONS_LAYER_HELPER,
  PROFILE_OPTIONS,
  formatCurrency,
  formatHours,
  getProfile,
  type CalculatorInputs,
  type ProfileType,
} from "@/lib/month-end-calculator";

function StepperButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-lg font-semibold text-heading transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label === "Increase" ? "+" : "−"}
    </button>
  );
}

export default function StepOneInputs({
  inputs,
  onChange,
}: {
  inputs: CalculatorInputs;
  onChange: (next: CalculatorInputs) => void;
}) {
  const profile = getProfile(inputs.profile);
  const showEntities = inputs.profile !== "single";
  const entityLabel =
    inputs.profile === "practice"
      ? "How many client groups do you run month end for?"
      : "How many entities are in your group?";

  function setProfile(next: ProfileType) {
    onChange({
      ...inputs,
      profile: next,
      entities: next === "single" ? 1 : Math.max(inputs.entities, 2),
    });
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        Part 1
      </p>
      <h2 className="font-poppins mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
        Your numbers
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Four inputs about the cost of your close. Your full result appears after
        the maturity questions in Part 2.
      </p>

      <div className="mt-6 space-y-7">
        <fieldset>
          <legend className="text-sm font-semibold text-heading">
            Which best describes you?
          </legend>
          <div className="mt-3 grid gap-2">
            {PROFILE_OPTIONS.map((option) => {
              const selected = inputs.profile === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setProfile(option.id)}
                  className={`rounded-lg border p-4 text-left text-sm font-medium transition-colors ${
                    selected
                      ? "border-brand bg-brand-soft text-heading"
                      : "border-border bg-surface text-heading hover:bg-surface-muted"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {showEntities ? (
          <div>
            <label
              htmlFor="mec-entities"
              className="text-sm font-semibold text-heading"
            >
              {entityLabel}
            </label>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Count every {profile.noun} that needs its own close, including
              dormant ones if your team still reconciles them.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <StepperButton
                label="Decrease"
                disabled={inputs.entities <= CALCULATOR_CONSTANTS.minEntities}
                onClick={() =>
                  onChange({
                    ...inputs,
                    entities: Math.max(
                      CALCULATOR_CONSTANTS.minEntities,
                      inputs.entities - 1,
                    ),
                  })
                }
              />
              <input
                id="mec-entities"
                type="number"
                inputMode="numeric"
                min={CALCULATOR_CONSTANTS.minEntities}
                max={CALCULATOR_CONSTANTS.maxEntities}
                value={inputs.entities}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  onChange({
                    ...inputs,
                    entities: Number.isFinite(next)
                      ? next
                      : CALCULATOR_CONSTANTS.minEntities,
                  });
                }}
                className="h-11 w-full rounded-lg border border-border bg-white px-3 text-center text-base font-semibold text-heading outline-none focus-visible:ring-2 focus-visible:ring-mayday-red"
              />
              <StepperButton
                label="Increase"
                disabled={inputs.entities >= CALCULATOR_CONSTANTS.maxEntities}
                onClick={() =>
                  onChange({
                    ...inputs,
                    entities: Math.min(
                      CALCULATOR_CONSTANTS.maxEntities,
                      inputs.entities + 1,
                    ),
                  })
                }
              />
            </div>
          </div>
        ) : null}

        <div>
          <div className="flex items-start justify-between gap-3">
            <label
              htmlFor="mec-hours"
              className="text-sm font-semibold text-heading"
            >
              Hours spent per {profile.noun}, per month, on the manual operations
              layer
            </label>
            <span className="shrink-0 rounded-md bg-brand-soft px-2.5 py-1 text-sm font-semibold text-brand">
              {formatHours(inputs.hoursPerEntity)} hrs
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {OPERATIONS_LAYER_HELPER}
          </p>
          <input
            id="mec-hours"
            className="mec-slider mt-3"
            type="range"
            min={CALCULATOR_CONSTANTS.minHours}
            max={CALCULATOR_CONSTANTS.maxHours}
            step={CALCULATOR_CONSTANTS.hoursStep}
            value={inputs.hoursPerEntity}
            aria-valuetext={`${formatHours(inputs.hoursPerEntity)} hours`}
            onChange={(event) =>
              onChange({
                ...inputs,
                hoursPerEntity: Number(event.target.value),
              })
            }
          />
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>30 mins</span>
            <span>15 hours</span>
          </div>
          <label className="sr-only" htmlFor="mec-hours-number">
            Hours per {profile.noun} as a number
          </label>
          <input
            id="mec-hours-number"
            type="number"
            inputMode="decimal"
            min={CALCULATOR_CONSTANTS.minHours}
            max={CALCULATOR_CONSTANTS.maxHours}
            step={CALCULATOR_CONSTANTS.hoursStep}
            value={inputs.hoursPerEntity}
            onChange={(event) =>
              onChange({
                ...inputs,
                hoursPerEntity: Number(event.target.value),
              })
            }
            className="mt-3 h-11 w-full rounded-lg border border-border bg-white px-3 text-sm text-heading outline-none focus-visible:ring-2 focus-visible:ring-mayday-red sm:max-w-[10rem]"
          />
          {inputs.hoursPerEntity <= CALCULATOR_CONSTANTS.minHours ? (
            <p className="mt-2 text-sm text-muted">
              If your close genuinely takes under 30 minutes an {profile.noun},
              you&apos;re already in rare company.
            </p>
          ) : null}
        </div>

        <div>
          <div className="flex items-start justify-between gap-3">
            <label
              htmlFor="mec-rate"
              className="text-sm font-semibold text-heading"
            >
              Blended hourly cost of the people doing this work
            </label>
            <span className="shrink-0 rounded-md bg-brand-soft px-2.5 py-1 text-sm font-semibold text-brand">
              {formatCurrency(inputs.blendedRate)}
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Salary plus employer costs, divided across the mix of junior and
            senior time. We&apos;ve pre-filled a typical figure — adjust it if
            you know yours.
          </p>
          <input
            id="mec-rate"
            className="mec-slider mt-3"
            type="range"
            min={CALCULATOR_CONSTANTS.minRate}
            max={CALCULATOR_CONSTANTS.maxRate}
            step={CALCULATOR_CONSTANTS.rateStep}
            value={inputs.blendedRate}
            aria-valuetext={`${formatCurrency(inputs.blendedRate)} per hour`}
            onChange={(event) =>
              onChange({
                ...inputs,
                blendedRate: Number(event.target.value),
              })
            }
          />
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>£15</span>
            <span>£120</span>
          </div>
          <label className="sr-only" htmlFor="mec-rate-number">
            Blended hourly cost as a number
          </label>
          <div className="relative mt-3 sm:max-w-[10rem]">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
              £
            </span>
            <input
              id="mec-rate-number"
              type="number"
              inputMode="numeric"
              min={CALCULATOR_CONSTANTS.minRate}
              max={CALCULATOR_CONSTANTS.maxRate}
              step={CALCULATOR_CONSTANTS.rateStep}
              value={inputs.blendedRate}
              onChange={(event) =>
                onChange({
                  ...inputs,
                  blendedRate: Number(event.target.value),
                })
              }
              className="h-11 w-full rounded-lg border border-border bg-white py-2 pl-7 pr-3 text-sm text-heading outline-none focus-visible:ring-2 focus-visible:ring-mayday-red"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
