export type ProfileType = "single" | "group" | "practice";

export type CalculatorInputs = {
  profile: ProfileType;
  entities: number;
  hoursPerEntity: number;
  blendedRate: number;
};

export type MaturityAnswers = [number | null, number | null, number | null, number | null];

export type CalculatorResult = {
  monthlyHours: number;
  annualHours: number;
  annualCost: number;
  recoverableCostLow: number;
  recoverableCostHigh: number;
  recoverableHoursLow: number;
  recoverableHoursHigh: number;
  breakdownSentence: string;
};

export type MaturityBandId = "manual" | "partway" | "control";

export type MaturityBand = {
  id: MaturityBandId;
  label: string;
  rangeLabel: string;
  copy: string;
};

export type MaturityQuestion = {
  id: string;
  prompt: string;
  options: [string, string, string];
};

/** Configurable constants - update when Benchmark Report data arrives. */
export const CALCULATOR_CONSTANTS = {
  defaultProfile: "group" as ProfileType,
  defaultEntities: 4,
  defaultHoursPerEntity: 5,
  defaultBlendedRate: 45,
  minEntities: 1,
  maxEntities: 200,
  minHours: 0.5,
  maxHours: 15,
  hoursStep: 0.5,
  minRate: 15,
  maxRate: 120,
  rateStep: 5,
  recoveryRateLow: 0.6,
  recoveryRateHigh: 0.8,
  /** Display costs to nearest £10 to avoid false precision. */
  costRounding: 10,
  maturityMaxRaw: 8,
  maturityMaxScaled: 10,
} as const;

export const PROFILE_OPTIONS: {
  id: ProfileType;
  label: string;
  noun: string;
  nounPlural: string;
}[] = [
  {
    id: "single",
    label: "A single business",
    noun: "entity",
    nounPlural: "entities",
  },
  {
    id: "group",
    label: "A group of entities",
    noun: "entity",
    nounPlural: "entities",
  },
  {
    id: "practice",
    label: "A practice or fractional CFO",
    noun: "client group",
    nounPlural: "client groups",
  },
];

export const MATURITY_QUESTIONS: MaturityQuestion[] = [
  {
    id: "q1",
    prompt:
      "How does your team reconcile intercompany balances across group entities?",
    options: [
      "One person maintains a master spreadsheet fed by manual pulls from each entity",
      "Each entity manager owns their piece, and we consolidate at review",
      "A dedicated tool reconciles across entities and flags out-of-balance accounts automatically",
    ],
  },
  {
    id: "q2",
    prompt: "How consistent is your month-end process across the team?",
    options: [
      "Every manager runs it their own way, with their own tools and shortcuts",
      "We have shared templates, but managers adapt them to how they like to work",
      "One standardised process, identical whoever runs it",
    ],
  },
  {
    id: "q3",
    prompt: "What happens when a spreadsheet or workaround breaks mid-close?",
    options: [
      "We rebuild it - half a day gone, at minimum",
      "There's a fallback, but usually the original owner has to fix it",
      "Nothing critical to month end runs on spreadsheets, so this doesn't come up",
    ],
  },
  {
    id: "q4",
    prompt: "How is your senior team's month-end time actually being spent?",
    options: [
      "Mostly checking, re-verifying and re-doing the numbers junior staff produced",
      "Checking reliability, half real analysis and client-facing work",
      "Mostly judgement, analysis and client work. Checking is minimal",
    ],
  },
];

export const MATURITY_BANDS: MaturityBand[] = [
  {
    id: "manual",
    label: "The manual majority",
    rangeLabel: "0–3",
    copy: "This is where most organisations sit, which is worth saying plainly: it isn't a failure, it's the default state. It does mean automation has the biggest possible upside for you. Start with the highest-time, highest-risk part of your close - for most teams that's intercompany reconciliation. Automate that one workflow properly and the rest of the close starts to feel possible.",
  },
  {
    id: "partway",
    label: "Partway there",
    rangeLabel: "4–6",
    copy: "The basics are working: shared templates, probably a workflow or two already automated. The gap between here and a fully mended close is usually consistency rather than effort - narrowing the distance between how your best manager runs month end and how your average one does. Standardise the operations layer and the team scales without adding people.",
  },
  {
    id: "control",
    label: "In control",
    rangeLabel: "7–10",
    copy: "You're ahead of the curve; most of the industry hasn't got here. The question now is strategic rather than operational: what could your team do if the last twenty percent of manual work went away? That last stretch is usually variance commentary, edge cases in recharges, or the one legacy entity nobody wants to touch. Fewer hours - but they tend to be the hours your senior people are actually stuck on.",
  },
];

export const OPERATIONS_LAYER_HELPER =
  'The work between "the data is in Xero" and "the reports are out": intercompany reconciliations and recharges, cross-entity bank reconciliation, deferred revenue and prepayment schedules, chart-of-accounts alignment, and variance analysis. Not bookkeeping, not reporting - the bit in between.';

export function getProfile(profile: ProfileType) {
  return (
    PROFILE_OPTIONS.find((option) => option.id === profile) ?? PROFILE_OPTIONS[1]
  );
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function snapToStep(value: number, min: number, step: number): number {
  const snapped = Math.round((value - min) / step) * step + min;
  return Number(snapped.toFixed(10));
}

export function normalizeInputs(inputs: CalculatorInputs): CalculatorInputs {
  const { minEntities, maxEntities, minHours, maxHours, hoursStep, minRate, maxRate } =
    CALCULATOR_CONSTANTS;

  const profile = inputs.profile;
  const entities =
    profile === "single"
      ? 1
      : Math.round(clamp(inputs.entities, minEntities, maxEntities));

  const hoursPerEntity = snapToStep(
    clamp(inputs.hoursPerEntity, minHours, maxHours),
    minHours,
    hoursStep,
  );

  // Clamp only - the slider uses £5 steps, but typed/shared values may be any pound amount.
  const blendedRate = Math.round(clamp(inputs.blendedRate, minRate, maxRate));

  return { profile, entities, hoursPerEntity, blendedRate };
}

export function roundCost(value: number): number {
  const { costRounding } = CALCULATOR_CONSTANTS;
  return Math.round(value / costRounding) * costRounding;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatHours(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-GB").format(value);
}

export function calculateResult(rawInputs: CalculatorInputs): CalculatorResult {
  const inputs = normalizeInputs(rawInputs);
  const monthlyHours = inputs.entities * inputs.hoursPerEntity;
  const annualHours = monthlyHours * 12;
  const annualCost = annualHours * inputs.blendedRate;

  const { recoveryRateLow, recoveryRateHigh } = CALCULATOR_CONSTANTS;

  return {
    monthlyHours,
    annualHours,
    annualCost,
    recoverableCostLow: annualCost * recoveryRateLow,
    recoverableCostHigh: annualCost * recoveryRateHigh,
    recoverableHoursLow: annualHours * recoveryRateLow,
    recoverableHoursHigh: annualHours * recoveryRateHigh,
    breakdownSentence: `${formatNumber(inputs.entities)} ${
      getProfile(inputs.profile).nounPlural
    } × ${formatHours(inputs.hoursPerEntity)} hours × 12 months × ${formatCurrency(
      inputs.blendedRate,
    )} an hour`,
  };
}

/** Score out of 8 from four 0/1/2 answers, then rescale to toolkit /10 bands. */
export function scaleMaturityScore(rawScore: number): number {
  const { maturityMaxRaw, maturityMaxScaled } = CALCULATOR_CONSTANTS;
  return Math.round((rawScore / maturityMaxRaw) * maturityMaxScaled);
}

export function getMaturityRawScore(answers: MaturityAnswers): number | null {
  if (answers.some((answer) => answer === null)) return null;
  return (answers as number[]).reduce((sum, answer) => sum + answer, 0);
}

export function getMaturityBand(scaledScore: number): MaturityBand {
  if (scaledScore <= 3) return MATURITY_BANDS[0];
  if (scaledScore <= 6) return MATURITY_BANDS[1];
  return MATURITY_BANDS[2];
}

export function getDefaultInputs(): CalculatorInputs {
  return {
    profile: CALCULATOR_CONSTANTS.defaultProfile,
    entities: CALCULATOR_CONSTANTS.defaultEntities,
    hoursPerEntity: CALCULATOR_CONSTANTS.defaultHoursPerEntity,
    blendedRate: CALCULATOR_CONSTANTS.defaultBlendedRate,
  };
}

export function getDefaultMaturityAnswers(): MaturityAnswers {
  return [null, null, null, null];
}

export type ShareState = {
  inputs: CalculatorInputs;
  answers: MaturityAnswers;
};

const PROFILE_PARAM: Record<ProfileType, string> = {
  single: "single",
  group: "group",
  practice: "practice",
};

export function encodeShareParams(state: ShareState): URLSearchParams {
  const inputs = normalizeInputs(state.inputs);
  const params = new URLSearchParams();
  params.set("profile", PROFILE_PARAM[inputs.profile]);
  params.set("entities", String(inputs.entities));
  params.set("hours", formatHours(inputs.hoursPerEntity));
  params.set("rate", String(inputs.blendedRate));

  state.answers.forEach((answer, index) => {
    if (answer !== null) {
      params.set(`q${index + 1}`, String(answer));
    }
  });

  return params;
}

export function parseShareParams(
  searchParams: URLSearchParams | ReadonlyURLSearchParamsLike,
): ShareState {
  const defaults = getDefaultInputs();
  const profileParam = searchParams.get("profile");
  const profile: ProfileType =
    profileParam === "single" ||
    profileParam === "group" ||
    profileParam === "practice"
      ? profileParam
      : defaults.profile;

  const entities = Number(searchParams.get("entities") ?? defaults.entities);
  const hours = Number(searchParams.get("hours") ?? defaults.hoursPerEntity);
  const rate = Number(searchParams.get("rate") ?? defaults.blendedRate);

  const answers = getDefaultMaturityAnswers();
  for (let i = 0; i < 4; i += 1) {
    const raw = searchParams.get(`q${i + 1}`);
    if (raw === "0" || raw === "1" || raw === "2") {
      answers[i] = Number(raw);
    }
  }

  return {
    inputs: normalizeInputs({
      profile,
      entities: Number.isFinite(entities) ? entities : defaults.entities,
      hoursPerEntity: Number.isFinite(hours) ? hours : defaults.hoursPerEntity,
      blendedRate: Number.isFinite(rate) ? rate : defaults.blendedRate,
    }),
    answers,
  };
}

type ReadonlyURLSearchParamsLike = {
  get(name: string): string | null;
};

/** QA fixtures from the product brief - used for verification. */
export const QA_FIXTURES = [
  {
    name: "Single entity, small team",
    inputs: {
      profile: "single" as const,
      entities: 1,
      hoursPerEntity: 6,
      blendedRate: 40,
    },
    expected: {
      monthlyHours: 6,
      annualHours: 72,
      annualCost: 2880,
      recoverable70: 2016,
    },
  },
  {
    name: "Small group",
    inputs: {
      profile: "group" as const,
      entities: 4,
      hoursPerEntity: 5,
      blendedRate: 45,
    },
    expected: {
      monthlyHours: 20,
      annualHours: 240,
      annualCost: 10800,
      recoverable70: 7560,
    },
  },
  {
    name: "Mid-market group",
    inputs: {
      profile: "group" as const,
      entities: 8,
      hoursPerEntity: 5,
      blendedRate: 45,
    },
    expected: {
      monthlyHours: 40,
      annualHours: 480,
      annualCost: 21600,
      recoverable70: 15120,
    },
  },
  {
    name: "Large group",
    inputs: {
      profile: "group" as const,
      entities: 20,
      hoursPerEntity: 4,
      blendedRate: 50,
    },
    expected: {
      monthlyHours: 80,
      annualHours: 960,
      annualCost: 48000,
      recoverable70: 33600,
    },
  },
  {
    name: "Practice / fractional",
    inputs: {
      profile: "practice" as const,
      entities: 35,
      hoursPerEntity: 3,
      blendedRate: 38,
    },
    expected: {
      monthlyHours: 105,
      annualHours: 1260,
      annualCost: 47880,
      recoverable70: 33516,
    },
  },
] as const;

export function assertQaFixtures(): void {
  for (const fixture of QA_FIXTURES) {
    const result = calculateResult(fixture.inputs);
    if (result.monthlyHours !== fixture.expected.monthlyHours) {
      throw new Error(`${fixture.name}: monthlyHours mismatch`);
    }
    if (result.annualHours !== fixture.expected.annualHours) {
      throw new Error(`${fixture.name}: annualHours mismatch`);
    }
    if (result.annualCost !== fixture.expected.annualCost) {
      throw new Error(`${fixture.name}: annualCost mismatch`);
    }
    const recoverable70 = Math.round(result.annualCost * 0.7);
    if (recoverable70 !== fixture.expected.recoverable70) {
      throw new Error(
        `${fixture.name}: recoverable70 mismatch (${recoverable70} vs ${fixture.expected.recoverable70})`,
      );
    }
  }
}
