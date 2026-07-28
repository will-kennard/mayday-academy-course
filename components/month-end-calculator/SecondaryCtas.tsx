import { authLinks, marketingUrl } from "@/lib/site-nav";

export default function SecondaryCtas() {
  return (
    <section className="rounded-2xl border border-border bg-brand-soft p-6 text-center sm:p-8">
      <h2 className="font-poppins text-xl font-semibold tracking-tight text-heading sm:text-2xl">
        Seeing where the time goes is the easy part
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-heading">
        Mayday coordinates and automates the operations layer of month end for
        finance teams on Xero, QuickBooks Online and Intuit Enterprise Suite.
        Have a look at how it works, or try it on your own files.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href={marketingUrl("/book-a-demo")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-white transition-colors hover:opacity-90 sm:w-auto"
        >
          Book a live demo
        </a>
        <a
          href={authLinks.signup}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-border bg-surface px-6 text-sm font-semibold text-heading transition-colors hover:bg-white sm:w-auto"
        >
          Start a 30-day free trial — no credit card required
        </a>
      </div>
    </section>
  );
}
