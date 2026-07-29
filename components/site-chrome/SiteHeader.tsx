"use client";

import { useEffect, useId, useRef, useState } from "react";
import MaydayLogo from "@/components/MaydayLogo";
import SiteLink from "@/components/site-chrome/SiteLink";
import {
  authLinks,
  MARKETING_ORIGIN,
  productGroups,
  resourceGroups,
  topNavLinks,
  type Badge,
  type NavLink,
  type NavLinkGroup,
} from "@/lib/site-nav";

type OpenMenu = "product" | "resources" | null;

function BadgePill({ badge }: { badge: Badge }) {
  return (
    <span className="ml-1.5 inline-flex items-center rounded bg-mayday-red/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mayday-red">
      {badge}
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 6"
      fill="none"
      className={`ml-1.5 h-2.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductLink({ link }: { link: NavLink }) {
  return (
    <SiteLink
      link={link}
      className="group block rounded-lg p-3 transition-colors hover:bg-surface-muted"
    >
      <div className="flex items-center text-sm font-semibold text-mayday-dark group-hover:text-mayday-red">
        {link.label}
        {link.badge ? <BadgePill badge={link.badge} /> : null}
      </div>
      {link.description ? (
        <p className="mt-1 text-xs leading-relaxed text-mayday-dark/60">
          {link.description}
        </p>
      ) : null}
    </SiteLink>
  );
}

function SimpleLink({ link }: { link: NavLink }) {
  return (
    <SiteLink
      link={link}
      className="flex items-center rounded-md px-2 py-1.5 text-sm text-mayday-dark/80 transition-colors hover:bg-surface-muted hover:text-mayday-red"
    >
      {link.label}
      {link.badge ? <BadgePill badge={link.badge} /> : null}
    </SiteLink>
  );
}

function ProductMegaMenu({ groups }: { groups: NavLinkGroup[] }) {
  return (
    <div className="absolute inset-x-0 top-full z-50 pt-3">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-lg shadow-mayday-dark/5">
          <div className="grid gap-6 md:grid-cols-3">
            {groups.map((group) => (
              <div key={group.heading}>
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-mayday-dark/45">
                  {group.heading}
                </p>
                <div className="flex flex-col gap-0.5">
                  {group.links.map((link) => (
                    <ProductLink key={link.label} link={link} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourcesMegaMenu({ groups }: { groups: NavLinkGroup[] }) {
  return (
    <div className="absolute inset-x-0 top-full z-50 pt-3">
      <div className="mx-auto flex max-w-6xl justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl rounded-2xl border border-border bg-white p-5 shadow-lg shadow-mayday-dark/5">
          <div className="grid gap-6 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.heading}>
                <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-mayday-dark/45">
                  {group.heading}
                </p>
                <div className="flex flex-col">
                  {group.links.map((link) => (
                    <SimpleLink key={link.label} link={link} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({
  title,
  groups,
  open,
  onToggle,
}: {
  title: string;
  groups: NavLinkGroup[];
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();

  return (
    <div className="border-b border-border">
      <button
        type="button"
        className="flex w-full items-center justify-between px-1 py-3 text-left text-base font-medium text-mayday-dark"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {title}
        <Chevron open={open} />
      </button>
      <div id={panelId} className={open ? "pb-3" : "hidden"} hidden={!open}>
        {groups.map((group) => (
          <div key={group.heading} className="mb-3">
            <p className="mb-1 px-1 text-xs font-semibold uppercase tracking-wide text-mayday-dark/45">
              {group.heading}
            </p>
            <div className="flex flex-col">
              {group.links.map((link) => (
                <SiteLink
                  key={link.label}
                  link={link}
                  className="flex items-center rounded-md px-2 py-2 text-sm text-mayday-dark/80 hover:bg-surface-muted hover:text-mayday-red"
                >
                  {link.label}
                  {link.badge ? <BadgePill badge={link.badge} /> : null}
                </SiteLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<OpenMenu>(null);
  const headerRef = useRef<HTMLElement>(null);
  const productButtonId = useId();
  const resourcesButtonId = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    function onPointerDown(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function toggleMenu(menu: Exclude<OpenMenu, null>) {
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  return (
    <header
      ref={headerRef}
      className="border-b border-border bg-white text-mayday-dark"
    >
      <nav
        className="relative mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a
          href={MARKETING_ORIGIN}
          className="relative z-10 flex shrink-0 items-center"
          aria-label="Mayday home"
        >
          <MaydayLogo variant="dark" />
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          <button
            type="button"
            id={productButtonId}
            className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              openMenu === "product"
                ? "text-mayday-red"
                : "text-mayday-dark hover:text-mayday-red"
            }`}
            aria-expanded={openMenu === "product"}
            aria-haspopup="true"
            onClick={() => toggleMenu("product")}
            onMouseEnter={() => setOpenMenu("product")}
          >
            Product
            <Chevron open={openMenu === "product"} />
          </button>

          {topNavLinks[0] ? (
            <a
              href={topNavLinks[0].href}
              className="rounded-md px-3 py-2 text-sm font-medium text-mayday-dark transition-colors hover:text-mayday-red"
              onMouseEnter={() => setOpenMenu(null)}
            >
              {topNavLinks[0].label}
            </a>
          ) : null}

          <button
            type="button"
            id={resourcesButtonId}
            className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              openMenu === "resources"
                ? "text-mayday-red"
                : "text-mayday-dark hover:text-mayday-red"
            }`}
            aria-expanded={openMenu === "resources"}
            aria-haspopup="true"
            onClick={() => toggleMenu("resources")}
            onMouseEnter={() => setOpenMenu("resources")}
          >
            Resources
            <Chevron open={openMenu === "resources"} />
          </button>

          {topNavLinks[1] ? (
            <a
              href={topNavLinks[1].href}
              className="rounded-md px-3 py-2 text-sm font-medium text-mayday-dark transition-colors hover:text-mayday-red"
              onMouseEnter={() => setOpenMenu(null)}
            >
              {topNavLinks[1].label}
            </a>
          ) : null}
        </div>

        <div
          className={
            openMenu === "product" ? "hidden lg:block" : "hidden"
          }
          aria-hidden={openMenu !== "product"}
          onMouseEnter={() => setOpenMenu("product")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <ProductMegaMenu groups={productGroups} />
        </div>

        <div
          className={
            openMenu === "resources" ? "hidden lg:block" : "hidden"
          }
          aria-hidden={openMenu !== "resources"}
          onMouseEnter={() => setOpenMenu("resources")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <ResourcesMegaMenu groups={resourceGroups} />
        </div>

        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          <a
            href={authLinks.login}
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-mayday-dark transition-colors hover:text-mayday-red sm:inline-flex"
          >
            Log in
          </a>
          <a
            href={authLinks.signup}
            className="hidden rounded-md bg-mayday-red px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e63d57] sm:inline-flex"
          >
            Try for free
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-mayday-dark hover:bg-surface-muted lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((open) => !open);
              setOpenMenu(null);
            }}
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                aria-hidden
              >
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                aria-hidden
              >
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        className={
          mobileOpen
            ? "max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-white lg:hidden"
            : "hidden"
        }
        aria-hidden={!mobileOpen}
      >
          <div className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            <MobileAccordion
              title="Product"
              groups={productGroups}
              open={mobileAccordion === "product"}
              onToggle={() =>
                setMobileAccordion((current) =>
                  current === "product" ? null : "product",
                )
              }
            />
            {topNavLinks[0] ? (
              <a
                href={topNavLinks[0].href}
                className="block border-b border-border px-1 py-3 text-base font-medium text-mayday-dark"
              >
                {topNavLinks[0].label}
              </a>
            ) : null}
            <MobileAccordion
              title="Resources"
              groups={resourceGroups}
              open={mobileAccordion === "resources"}
              onToggle={() =>
                setMobileAccordion((current) =>
                  current === "resources" ? null : "resources",
                )
              }
            />
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
                className="rounded-md bg-mayday-red px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Try for free
              </a>
            </div>
          </div>
      </div>
    </header>
  );
}
