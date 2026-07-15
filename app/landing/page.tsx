import type { Metadata } from "next";
import FeatureSection from "@/components/landing/FeatureSection";
import { absoluteUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Zero Day Month End",
  description:
    "Automate prepayments, deferred revenue, accruals, flux, intercompany and more — so month end takes zero days.",
  alternates: {
    canonical: absoluteUrl("/landing"),
  },
};

function SquiggleUnderline({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      className="mt-1 w-full"
      viewBox="0 0 200 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 C 30 2, 50 10, 80 6 S 140 2, 168 7 S 190 10, 198 5"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HandCircle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 80"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        cx="100"
        cy="40"
        rx="92"
        ry="32"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        transform="rotate(-3 100 40)"
      />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="flex w-full flex-col items-center justify-center bg-[#241D6A] px-4 py-14 text-center text-white sm:px-6 sm:py-16">
        <h1 className="mx-auto max-w-2xl text-inherit">
          <span className="font-marker block -rotate-2 text-4xl uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl">
            Zero day month end?
          </span>
          <span className="font-marker mt-3 block rotate-3 text-4xl uppercase text-[#FF4461] sm:mt-4 sm:text-6xl lg:text-7xl">
            But how!?
          </span>
        </h1>
      </section>

      {/* Prepayments — heading left */}
      <FeatureSection
        backgroundColor="#FF4461"
        textColor="#ffffff"
        imageSrc="/images/Prepayments.png"
        imageAlt="Mayday Prepayments illustration"
      >
        <h2 className="text-2xl leading-snug text-inherit sm:text-3xl lg:text-4xl">
          <span className="font-marker block -skew-x-6 text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
            AUTOMATE
          </span>
          <span className="mt-2 block font-poppins font-semibold text-white">
            your{" "}
            <span className="relative inline-block -rotate-1 bg-white px-2 py-0.5 text-[#FF4461]">
              prepayment
            </span>{" "}
            release schedules
          </span>
        </h2>
      </FeatureSection>

      {/* Deferred Revenue — image left */}
      <FeatureSection
        backgroundColor="#ffffff"
        textColor="#241D6A"
        imageSrc="/images/Deferred Revenue.png"
        imageAlt="Mayday Deferred Revenue illustration"
        imageLeft
      >
        <h2 className="text-2xl leading-snug text-inherit sm:text-3xl lg:text-4xl">
          <span className="font-marker block -rotate-1 text-4xl uppercase text-[#241D6A] sm:text-5xl">
            AUTOMATE
          </span>
          <span className="mt-2 block font-poppins font-semibold text-[#241D6A]">
            your{" "}
            <span className="relative inline-block">
              <span className="font-marker text-[#4646DE]">deferred revenue</span>
              <SquiggleUnderline color="#FF4461" />
            </span>{" "}
            schedules
          </span>
        </h2>
      </FeatureSection>

      {/* Accruals — heading left */}
      <FeatureSection
        backgroundColor="#4646DE"
        textColor="#ffffff"
        imageSrc="/images/Accruals.png"
        imageAlt="Mayday Accruals illustration"
      >
        <h2 className="text-2xl leading-snug text-inherit sm:text-3xl lg:text-4xl">
          <span className="mb-3 inline-block -rotate-2 bg-[#FF4461] px-3 py-1.5 font-marker text-3xl uppercase text-white shadow-[4px_4px_0_#241D6A] sm:text-4xl">
            AUTOMATE
          </span>
          <span className="block font-poppins font-semibold text-white">
            scheduling and journal posting of your{" "}
            <span className="relative inline-block px-1">
              <span className="relative z-10 font-marker text-3xl uppercase text-white sm:text-4xl">
                accruals
              </span>
              <HandCircle className="pointer-events-none absolute inset-0 h-full w-full scale-110 text-[#FF4461]" />
            </span>
          </span>
        </h2>
      </FeatureSection>

      {/* Flux — image left */}
      <FeatureSection
        backgroundColor="#ffffff"
        textColor="#4646DE"
        imageSrc="/images/Flux.png"
        imageAlt="Mayday Flux illustration"
        imageLeft
      >
        <h2 className="text-2xl leading-snug text-inherit sm:text-3xl lg:text-4xl">
          <span className="font-marker block origin-left -skew-x-12 scale-x-110 text-4xl uppercase tracking-widest text-[#4646DE] sm:text-5xl lg:text-6xl">
            QUICKLY
          </span>
          <span className="mt-2 block font-poppins font-semibold text-[#4646DE]">
            explain anomalies in your{" "}
            <span className="inline-block rotate-2 bg-[#FF4461] px-2 py-1 font-marker text-white">
              P&amp;L variances
            </span>
            !
          </span>
        </h2>
      </FeatureSection>

      {/* Balancer — heading left */}
      <FeatureSection
        backgroundColor="#241D6A"
        textColor="#ffffff"
        imageSrc="/images/Balancer.png"
        imageAlt="Mayday Balancer illustration"
      >
        <h2 className="text-2xl leading-snug text-inherit sm:text-3xl lg:text-4xl">
          <span className="relative inline-block">
            <span className="font-marker text-4xl uppercase text-white sm:text-5xl">
              AUTOMATE
            </span>
            <span className="absolute -right-4 -top-5 rotate-12 font-marker text-sm text-[#FF4461] sm:-right-8 sm:text-base">
              (more automate!)
            </span>
          </span>
          <span className="mt-3 block font-poppins font-semibold text-white">
            your{" "}
            <span className="underline decoration-[#FF4461] decoration-[3px] underline-offset-4">
              intercompany
            </span>{" "}
            and{" "}
            <span className="underline decoration-[#FF4461] decoration-[3px] underline-offset-4">
              interdepartmental
            </span>{" "}
            recharges
          </span>
        </h2>
      </FeatureSection>

      {/* Recharger — image left */}
      <FeatureSection
        backgroundColor="#ffffff"
        textColor="#FF4461"
        imageSrc="/images/Recharger.png"
        imageAlt="Mayday Recharger illustration"
        imageLeft
      >
        <h2 className="text-2xl leading-snug text-inherit sm:text-3xl lg:text-4xl">
          <span className="block font-poppins font-semibold text-[#FF4461]">
            Keep your{" "}
            <span className="underline decoration-[#241D6A] decoration-[3px] underline-offset-4">
              intercompany accounts
            </span>{" "}
            <span className="font-normal">(and AR/AP balances!)</span>
          </span>
          <span className="font-marker mt-3 block text-4xl uppercase tracking-[0.2em] text-[#FF4461] sm:text-5xl lg:text-6xl">
            IN SYNC
          </span>
        </h2>
      </FeatureSection>

      {/* BRAG — heading left */}
      <FeatureSection
        backgroundColor="#FF4461"
        textColor="#ffffff"
        imageSrc="/images/BRAG.png"
        imageAlt="Mayday BRAG illustration"
      >
        <h2 className="text-2xl leading-snug text-inherit sm:text-3xl lg:text-4xl">
          <span className="relative inline-block">
            <span
              className="absolute inset-x-0 bottom-2 h-4 -rotate-1 bg-[#241D6A]"
              aria-hidden="true"
            />
            <span className="relative font-marker text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
              RECONCILE
            </span>
          </span>
          <span className="mt-3 block font-poppins font-semibold text-white">
            transactions to other entities from within Xero&apos;s bank rec dashboard
          </span>
        </h2>
      </FeatureSection>

      {/* Mayday HQ — image left */}
      <FeatureSection
        backgroundColor="#4646DE"
        textColor="#ffffff"
        imageSrc="/images/Mayday HQ.png"
        imageAlt="Mayday HQ illustration"
        imageLeft
      >
        <h2 className="text-2xl leading-snug text-inherit sm:text-3xl lg:text-4xl">
          <span className="font-marker block -rotate-2 text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
            ALIGN
          </span>
          <ul className="mt-4 space-y-1.5 font-poppins text-xl font-semibold text-white sm:text-2xl">
            <li className="-rotate-1 pl-0">Chart of Accounts</li>
            <li className="rotate-1 pl-4 sm:pl-8">Tracking Categories</li>
            <li className="-rotate-1 pl-2 sm:pl-4">
              and Contacts{" "}
              <span className="block pt-1 text-base font-normal text-white/90 sm:text-lg">
                across multiple entities
              </span>
            </li>
          </ul>
        </h2>
      </FeatureSection>

      {/* Bottom CTA */}
      <section className="w-full bg-[#241D6A] px-4 py-8 text-center text-white sm:px-6 sm:py-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-marker text-3xl uppercase leading-tight text-white sm:text-4xl">
            Start a 30 day no card free trial
          </h2>
          <a
            href="https://my.getmayday.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block -rotate-1 bg-[#FF4461] px-7 py-3 font-marker text-xl uppercase text-white shadow-[6px_6px_0_#ffffff] transition-transform hover:rotate-0 hover:scale-105 sm:text-2xl"
          >
            Start free trial
          </a>
          <p className="mt-4 font-poppins text-base text-white/90 sm:text-lg">
            or{" "}
            <a
              href="https://www.getmayday.com/book-a-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-[#FF4461] decoration-2 underline-offset-4 transition-colors hover:text-[#FF4461]"
            >
              book a demo with our accounting experts!
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
