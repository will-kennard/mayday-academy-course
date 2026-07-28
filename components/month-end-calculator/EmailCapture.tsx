"use client";

import { FormEvent, useState } from "react";
import { marketingUrl } from "@/lib/site-nav";

export default function EmailCapture({
  shareStatus,
  onCopyShareLink,
}: {
  shareStatus: string | null;
  onCopyShareLink: () => void;
}) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      setMessage("Enter a work email address.");
      return;
    }
    setMessage(
      "Email delivery isn’t connected yet. Your result stays on this page - HubSpot integration coming soon.",
    );
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <h2 className="font-poppins text-xl font-semibold tracking-tight sm:text-2xl">
        Get the full report
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        We&apos;ll email you a breakdown of your result, plus The Mending Month
        End Toolkit: the full five-question audit, three finance teams on how
        they mended their close, and a vendor-agnostic checklist of what to ask
        any automation vendor - including us.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label
            htmlFor="mec-email"
            className="text-sm font-semibold text-heading"
          >
            Work email
          </label>
          <input
            id="mec-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-3 text-sm text-heading outline-none focus-visible:ring-2 focus-visible:ring-mayday-red"
          />
        </div>

        <div>
          <label
            htmlFor="mec-company"
            className="text-sm font-semibold text-heading"
          >
            Company name <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="mec-company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-3 text-sm text-heading outline-none focus-visible:ring-2 focus-visible:ring-mayday-red"
          />
        </div>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-heading">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border text-brand focus-visible:ring-mayday-red"
          />
          <span>
            Email me occasional practical content about month end. Unsubscribe
            any time.
          </span>
        </label>

        <button
          type="submit"
          disabled
          aria-disabled="true"
          title="HubSpot integration coming soon"
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-white opacity-50 sm:w-auto"
        >
          Send me the report
        </button>

        <p className="text-xs leading-relaxed text-muted">
          We&apos;ll only use your email for what you&apos;ve asked for. See our{" "}
          <a
            href={marketingUrl("/legal/privacy-policy")}
            className="font-medium text-brand underline underline-offset-2 hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy policy
          </a>
          .
        </p>

        <p className="rounded-lg bg-warning-soft p-3 text-sm text-warning">
          Report emailing is temporarily disabled while we connect HubSpot. You
          can still use and share your result below.
        </p>

        {message ? (
          <p className="rounded-lg bg-surface-muted p-3 text-sm text-heading" role="status">
            {message}
          </p>
        ) : null}
      </form>

      <div className="mt-5 border-t border-border pt-5">
        <button
          type="button"
          onClick={onCopyShareLink}
          className="text-sm font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
        >
          Want to show someone this number? Copy a link to your result →
        </button>
        {shareStatus ? (
          <p className="mt-2 text-sm text-accent" role="status">
            {shareStatus}
          </p>
        ) : null}
      </div>
    </section>
  );
}
