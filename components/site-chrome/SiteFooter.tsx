import MaydayLogo from "@/components/MaydayLogo";
import SiteLink from "@/components/site-chrome/SiteLink";
import {
  footerColumns,
  footerLegalLinks,
  MARKETING_ORIGIN,
  socialLinks,
  type Badge,
  type NavLink,
} from "@/lib/site-nav";

function BadgePill({ badge }: { badge: Badge }) {
  return (
    <span className="ml-1.5 inline-flex items-center rounded bg-mayday-red/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mayday-red">
      {badge}
    </span>
  );
}

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

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34 34"
      fill="none"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        d="M31.4832 0H2.51016C1.12227 0 0 1.0957 0 2.45039V31.543C0 32.8977 1.12227 34 2.51016 34H31.4832C32.8711 34 34 32.8977 34 31.5496V2.45039C34 1.0957 32.8711 0 31.4832 0ZM10.0871 28.973H5.04023V12.7434H10.0871V28.973ZM7.56367 10.532C5.94336 10.532 4.63516 9.22383 4.63516 7.61016C4.63516 5.99648 5.94336 4.68828 7.56367 4.68828C9.17734 4.68828 10.4855 5.99648 10.4855 7.61016C10.4855 9.21719 9.17734 10.532 7.56367 10.532ZM28.973 28.973H23.9328V21.084C23.9328 19.2047 23.8996 16.7809 21.3098 16.7809C18.6867 16.7809 18.2883 18.8328 18.2883 20.9512V28.973H13.2547V12.7434H18.0891V14.9613H18.1555C18.8262 13.6863 20.473 12.3383 22.9234 12.3383C28.0301 12.3383 28.973 15.6984 28.973 20.068V28.973Z"
        fill="currentColor"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 28"
      fill="none"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        d="M39.6016 6.04166C39.6016 6.04166 39.2109 3.29686 38.0078 2.09164C36.4844 0.505415 34.7812 0.497639 34 0.404332C28.4063 -2.22462e-07 20.0078 0 20.0078 0H19.9922C19.9922 0 11.5938 -2.22462e-07 6 0.404332C5.21875 0.497639 3.51562 0.505415 1.99219 2.09164C0.789063 3.29686 0.40625 6.04166 0.40625 6.04166C0.40625 6.04166 0 9.26854 0 12.4876V15.5046C0 18.7237 0.398437 21.9506 0.398437 21.9506C0.398437 21.9506 0.789062 24.6954 1.98437 25.9006C3.50781 27.4868 5.50781 27.4324 6.39844 27.6034C9.60156 27.9067 20 28 20 28C20 28 28.4063 27.9844 34 27.5879C34.7812 27.4946 36.4844 27.4868 38.0078 25.9006C39.2109 24.6954 39.6016 21.9506 39.6016 21.9506C39.6016 21.9506 40 18.7315 40 15.5046V12.4876C40 9.26854 39.6016 6.04166 39.6016 6.04166ZM15.8672 19.1669V7.97778L26.6719 13.5918L15.8672 19.1669Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white text-mayday-dark">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href={MARKETING_ORIGIN}
              className="inline-flex"
              aria-label="Mayday home"
            >
              <MaydayLogo variant="dark" className="h-9 w-auto" />
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
              <a
                href={socialLinks[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mayday-dark/70 transition-colors hover:text-mayday-red"
                aria-label={socialLinks[0].label}
              >
                <LinkedInIcon />
              </a>
              <a
                href={socialLinks[1].href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mayday-dark/70 transition-colors hover:text-mayday-red"
                aria-label={socialLinks[1].label}
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
