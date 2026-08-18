import MaydayLogo from "@/components/MaydayLogo";
import SiteLink from "@/components/site-chrome/SiteLink";
import {
  BadgePill,
  LinkedInIcon,
  QuickBooksLogo,
  XeroLogo,
  YouTubeIcon,
} from "@/components/site-chrome/NavIcons";
import {
  footerColumns,
  footerLegalLinks,
  MARKETING_ORIGIN,
  socialLinks,
  type NavLink,
} from "@/lib/site-nav";

function FooterLink({ link }: { link: NavLink }) {
  return (
    <SiteLink
      link={link}
      className="inline-flex items-center text-sm text-mayday-dark/70 transition-colors hover:text-mayday-red"
    >
      {link.label}
      {link.badge ? <BadgePill badge={link.badge} /> : null}
    </SiteLink>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white text-mayday-dark">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <a
              href={MARKETING_ORIGIN}
              className="inline-flex"
              aria-label="Mayday home"
            >
              <MaydayLogo variant="dark" className="h-9 w-auto" />
            </a>
            <a
              href="https://www.xero.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit"
            >
              <XeroLogo />
            </a>
            <a
              href="https://quickbooks.intuit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit"
            >
              <QuickBooksLogo />
            </a>
          </div>

          {footerColumns.map((column) => (
            <div key={column.heading}>
              <p className="mb-4 text-sm font-semibold text-mayday-dark">
                {column.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-mayday-dark/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© Mayday Holdings Limited {year}. All rights reserved</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerLegalLinks.map((link) => (
              <SiteLink
                key={link.label}
                link={link}
                className="transition-colors hover:text-mayday-red"
              />
            ))}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mayday-purple transition-opacity hover:opacity-80"
                  aria-label={link.label}
                >
                  {link.label === "LinkedIn" ? (
                    <LinkedInIcon />
                  ) : (
                    <YouTubeIcon />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
