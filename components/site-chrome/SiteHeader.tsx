import type { ReactNode } from "react";
import MaydayLogo from "@/components/MaydayLogo";
import SiteLink from "@/components/site-chrome/SiteLink";
import {
  BadgePill,
  Chevron,
  CircleArrow,
  CloseIcon,
  EasyMonthEndMark,
  MenuIcon,
  NavyCircleArrow,
  ProductIconMark,
  SparkleIcon,
} from "@/components/site-chrome/NavIcons";
import {
  authLinks,
  easyMonthEnd,
  MARKETING_ORIGIN,
  productGroups,
  resourceGroups,
  topNavLinks,
  type NavLink,
  type NavLinkGroup,
} from "@/lib/site-nav";

function ProductItem({ link }: { link: NavLink }) {
  return (
    <li>
      <SiteLink
        link={link}
        className="group flex items-start gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-surface-muted"
      >
        {link.icon ? <ProductIconMark icon={link.icon} /> : null}
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-x-1 text-base font-semibold text-mayday-dark group-hover:text-mayday-red">
            {link.label}
            {link.sparkle ? <SparkleIcon /> : null}
            {link.badge ? <BadgePill badge={link.badge} /> : null}
          </span>
          {link.description ? (
            <span className="mt-1.5 block text-sm leading-relaxed text-mayday-dark/60">
              {link.description}
            </span>
          ) : null}
        </span>
      </SiteLink>
    </li>
  );
}

function EasyMonthEndCard() {
  return (
    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
      <a
        href={easyMonthEnd.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-3"
      >
        <EasyMonthEndMark />
        <span>
          <span className="block text-base font-semibold text-mayday-dark">
            {easyMonthEnd.label}
          </span>
          <span className="mt-1.5 block text-sm leading-relaxed text-mayday-dark/60">
            {easyMonthEnd.description}
          </span>
        </span>
      </a>
      <a
        href={easyMonthEnd.login}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-mayday-dark px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Login to my account
        <NavyCircleArrow />
      </a>
      <a
        href={easyMonthEnd.signup}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex text-sm font-medium text-mayday-dark hover:text-mayday-red"
      >
        Create an account &gt;
      </a>
    </div>
  );
}

function ProductMegaMenu() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-lg shadow-mayday-dark/5 sm:p-8 lg:p-10">
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
        {productGroups.map((group) => (
          <div key={group.heading}>
            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wide text-mayday-dark/45">
              {group.heading}
            </p>
            <ul className="flex flex-col gap-1.5">
              {group.links.map((link) => (
                <ProductItem key={link.label} link={link} />
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wide text-mayday-dark/45">
            Close
          </p>
          <EasyMonthEndCard />
        </div>
      </div>
    </div>
  );
}

function ResourcesMegaMenu({ groups }: { groups: NavLinkGroup[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-lg shadow-mayday-dark/5 sm:p-8">
      <div className="grid gap-8 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.heading}>
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-mayday-dark/45">
              {group.heading}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <SiteLink
                    link={link}
                    className="flex items-center rounded-md px-2 py-2 text-sm text-mayday-dark/80 transition-colors hover:bg-surface-muted hover:text-mayday-red"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuTrigger({ label }: { label: string }) {
  return (
    <span className="relative inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-mayday-dark transition-colors group-hover:text-mayday-red group-focus-within:text-mayday-red">
      {label}
      <Chevron className="h-2.5 w-2.5 text-mayday-dark group-hover:text-mayday-red group-focus-within:text-mayday-red" />
      <span className="absolute -top-0.5 right-1.5 h-1.5 w-1.5 rounded-full bg-mayday-red opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" />
      <span className="absolute inset-x-3 -bottom-0.5 h-px bg-mayday-red opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" />
    </span>
  );
}

function DesktopDropdown({
  label,
  children,
  panelClassName,
}: {
  label: string;
  children: ReactNode;
  panelClassName: string;
}) {
  return (
    <li className="group flex h-[72px] items-center">
      <button
        type="button"
        className="cursor-pointer"
        aria-haspopup="true"
      >
        <MenuTrigger label={label} />
      </button>
      <div
        className={`pointer-events-none invisible absolute top-full z-50 pt-3 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 ${panelClassName}`}
      >
        {children}
      </div>
    </li>
  );
}

function MobileAccordion({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group border-b border-border">
      <summary className="flex cursor-pointer items-center justify-between px-1 py-3 text-left text-base font-medium text-mayday-dark">
        {title}
        <Chevron className="h-2.5 w-2.5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-3">{children}</div>
    </details>
  );
}

export default function SiteHeader() {
  return (
    <header className="overflow-visible border-b border-border bg-white text-mayday-dark">
      <nav
        className="relative mx-auto grid h-[72px] max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a
          href={MARKETING_ORIGIN}
          className="relative z-10 flex shrink-0 items-center justify-self-start"
          aria-label="Mayday home"
        >
          <MaydayLogo variant="dark" />
        </a>

        <ul className="hidden items-center gap-2 lg:flex">
          <DesktopDropdown
            label="Product"
            panelClassName="left-1/2 w-[min(100vw-2rem,80rem)] -translate-x-1/2"
          >
            <ProductMegaMenu />
          </DesktopDropdown>
          {topNavLinks[0] ? (
            <li className="flex h-[72px] items-center">
              <a
                href={topNavLinks[0].href}
                className="rounded-md px-3 py-2 text-sm font-medium text-mayday-dark transition-colors hover:text-mayday-red"
              >
                {topNavLinks[0].label}
              </a>
            </li>
          ) : null}
          <DesktopDropdown
            label="Resources"
            panelClassName="left-1/2 w-[min(100vw-2rem,48rem)] -translate-x-1/2"
          >
            <ResourcesMegaMenu groups={resourceGroups} />
          </DesktopDropdown>
          {topNavLinks[1] ? (
            <li className="flex h-[72px] items-center">
              <a
                href={topNavLinks[1].href}
                className="rounded-md px-3 py-2 text-sm font-medium text-mayday-dark transition-colors hover:text-mayday-red"
              >
                {topNavLinks[1].label}
              </a>
            </li>
          ) : null}
        </ul>

        <div className="relative z-10 flex items-center justify-self-end gap-2 sm:gap-3">
          <a
            href={authLinks.login}
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-mayday-dark transition-colors hover:text-mayday-red sm:inline-flex"
          >
            Log in
          </a>
          <a
            href={authLinks.signup}
            className="hidden items-center gap-2 rounded-full bg-mayday-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e63d57] sm:inline-flex"
          >
            Try for free
            <CircleArrow />
          </a>

          <details className="group/menu lg:hidden">
            <summary
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-mayday-dark hover:bg-surface-muted"
              aria-label="Open menu"
            >
              <span className="group-open/menu:hidden">
                <MenuIcon />
              </span>
              <span className="hidden group-open/menu:inline-flex">
                <CloseIcon />
              </span>
            </summary>
            <div className="fixed inset-x-0 top-[72px] z-50 max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-border bg-white px-4 py-4 shadow-lg shadow-mayday-dark/10 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-6xl">
                <MobileAccordion title="Product">
                  {productGroups.map((group) => (
                    <div key={group.heading} className="mb-3">
                      <p className="mb-1 px-1 text-xs font-semibold uppercase tracking-wide text-mayday-dark/45">
                        {group.heading}
                      </p>
                      <ul>
                        {group.links.map((link) => (
                          <ProductItem key={link.label} link={link} />
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="mb-2 px-1">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mayday-dark/45">
                      Close
                    </p>
                    <EasyMonthEndCard />
                  </div>
                </MobileAccordion>
                {topNavLinks[0] ? (
                  <a
                    href={topNavLinks[0].href}
                    className="block border-b border-border px-1 py-3 text-base font-medium text-mayday-dark"
                  >
                    {topNavLinks[0].label}
                  </a>
                ) : null}
                <MobileAccordion title="Resources">
                  {resourceGroups.map((group) => (
                    <div key={group.heading} className="mb-3">
                      <p className="mb-1 px-1 text-xs font-semibold uppercase tracking-wide text-mayday-dark/45">
                        {group.heading}
                      </p>
                      <ul>
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <SiteLink
                              link={link}
                              className="flex items-center rounded-md px-2 py-2 text-sm text-mayday-dark/80 hover:bg-surface-muted hover:text-mayday-red"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </MobileAccordion>
                {topNavLinks[1] ? (
                  <a
                    href={topNavLinks[1].href}
                    className="block border-b border-border px-1 py-3 text-base font-medium text-mayday-dark"
                  >
                    {topNavLinks[1].label}
                  </a>
                ) : null}
                <div className="flex flex-col gap-2 py-4">
                  <a
                    href={authLinks.login}
                    className="rounded-md border border-border px-4 py-2.5 text-center text-sm font-medium text-mayday-dark"
                  >
                    Log in
                  </a>
                  <a
                    href={authLinks.signup}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-mayday-red px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Try for free
                    <CircleArrow />
                  </a>
                </div>
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
