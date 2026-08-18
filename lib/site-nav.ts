export const MARKETING_ORIGIN = "https://www.getmayday.com";

export function marketingUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${MARKETING_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export type Badge = "NEW" | "SOON";

export type ProductIcon =
  | "flux"
  | "prepayments"
  | "accruals"
  | "deferredRevenue"
  | "balancer"
  | "hq"
  | "brag"
  | "recharger";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  badge?: Badge;
  external?: boolean;
  icon?: ProductIcon;
  sparkle?: boolean;
};

export type NavLinkGroup = {
  heading: string;
  links: NavLink[];
};

export const authLinks = {
  login: "https://my.getmayday.com/login",
  signup: "https://my.getmayday.com/signup",
} as const;

export const easyMonthEnd = {
  label: "Easy Month End",
  href: "https://easymonthend.com/",
  login: "https://easymonthend.com/login",
  signup: "https://easymonthend.com/signup",
  description:
    "Easy Month End is your ticket to a smoother month end close, faster balance sheet reconciliations, and a more efficient finance team",
} as const;

export const productGroups: NavLinkGroup[] = [
  {
    heading: "Core",
    links: [
      {
        label: "Flux",
        href: marketingUrl("/product/flux"),
        description:
          "Quickly explain anomalies in your P&L with the help of AI-generated commentary",
        badge: "NEW",
        icon: "flux",
        sparkle: true,
      },
      {
        label: "Prepayments",
        href: marketingUrl("/product/prepayments"),
        description:
          "Automate the creation and recognition of your prepayment release schedules",
        icon: "prepayments",
        sparkle: true,
      },
      {
        label: "Accruals",
        href: marketingUrl("/product/accruals"),
        description:
          "Automate scheduling and journal posting of your recurring and ad-hoc accruals",
        badge: "SOON",
        icon: "accruals",
        sparkle: true,
      },
      {
        label: "Deferred Revenue",
        href: marketingUrl("/product/deferred-revenue"),
        description:
          "Automate the creation and recognition of your deferred revenue schedules",
        icon: "deferredRevenue",
        sparkle: true,
      },
    ],
  },
  {
    heading: "Intercompany",
    links: [
      {
        label: "Balancer",
        href: marketingUrl("/product/balancer"),
        description:
          "Keep your intercompany accounts and AR/AP balances in sync across your files",
        icon: "balancer",
        sparkle: true,
      },
      {
        label: "HQ",
        href: marketingUrl("/product/mayday-hq"),
        description:
          "Easily manage Chart Of Accounts and Tracking Categories across your group",
        icon: "hq",
      },
      {
        label: "BRAG",
        href: marketingUrl("/product/brag"),
        description:
          "Reconcile transactions posted to other entities from within Xero's bank rec dashboard",
        icon: "brag",
        sparkle: true,
      },
      {
        label: "Recharger",
        href: marketingUrl("/product/recharger"),
        description:
          "Automate your intercompany and interdepartmental recharges",
        icon: "recharger",
      },
    ],
  },
];

export const productLinks: NavLink[] = [
  ...productGroups.flatMap((group) => group.links),
  {
    label: easyMonthEnd.label,
    href: easyMonthEnd.href,
    description: easyMonthEnd.description,
    external: true,
  },
];

export const contentLinks: NavLink[] = [
  { label: "CFO Techstack", href: marketingUrl("/cfotechstack") },
  { label: "Blog", href: marketingUrl("/resources/blog") },
  { label: "Webinars", href: marketingUrl("/resources/webinars") },
  { label: "Academy", href: marketingUrl("/resources/academy") },
  {
    label: "Month-end cost calculator",
    href: "/resources/month-end-cost-calculator",
  },
];

export const resourceGroups: NavLinkGroup[] = [
  {
    heading: "Content",
    links: contentLinks,
  },
  {
    heading: "Get started",
    links: [
      {
        label: "Wall of love",
        href: marketingUrl("/resources/wall-of-love"),
      },
      {
        label: "Case studies",
        href: marketingUrl("/resources/case-studies"),
      },
      {
        label: "Partner programme",
        href: marketingUrl("/partner-programme"),
      },
      { label: "Business case", href: marketingUrl("/business-case") },
      { label: "Onboarding", href: marketingUrl("/onboarding") },
    ],
  },
  {
    heading: "Academy",
    links: [
      { label: "Course", href: "/course" },
      { label: "Glossary", href: "/glossary" },
      {
        label: "Articles",
        href: marketingUrl("/resources/academy"),
      },
    ],
  },
];

export const topNavLinks: NavLink[] = [
  { label: "Pricing", href: marketingUrl("/pricing") },
  { label: "About", href: marketingUrl("/about") },
];

export const footerColumns: NavLinkGroup[] = [
  {
    heading: "Product",
    links: [
      {
        label: "Flux",
        href: marketingUrl("/product/flux"),
        badge: "NEW",
      },
      { label: "Prepayments", href: marketingUrl("/product/prepayments") },
      {
        label: "Accruals",
        href: marketingUrl("/product/accruals"),
        badge: "SOON",
      },
      {
        label: "Deferred Revenue",
        href: marketingUrl("/product/deferred-revenue"),
      },
      { label: "Balancer", href: marketingUrl("/product/balancer") },
      { label: "HQ", href: marketingUrl("/product/mayday-hq") },
      { label: "BRAG", href: marketingUrl("/product/brag") },
      { label: "Recharger", href: marketingUrl("/product/recharger") },
      {
        label: easyMonthEnd.label,
        href: easyMonthEnd.href,
        external: true,
      },
    ],
  },
  {
    heading: "Content",
    links: contentLinks,
  },
  {
    heading: "Get started",
    links: [
      {
        label: "Wall of love",
        href: marketingUrl("/resources/wall-of-love"),
      },
      {
        label: "Case studies",
        href: marketingUrl("/resources/case-studies"),
      },
      {
        label: "Partner programme",
        href: marketingUrl("/partner-programme"),
      },
      { label: "Business case", href: marketingUrl("/business-case") },
      { label: "Onboarding", href: marketingUrl("/onboarding") },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "About", href: marketingUrl("/about") },
      { label: "Careers", href: marketingUrl("/careers") },
      { label: "Contact", href: marketingUrl("/contact") },
    ],
  },
];

export const footerLegalLinks: NavLink[] = [
  {
    label: "Help Centre",
    href: "https://help.getmayday.com/en/",
    external: true,
  },
  { label: "Security", href: marketingUrl("/security") },
  {
    label: "Terms",
    href: marketingUrl("/legal/terms-and-conditions"),
  },
  {
    label: "Privacy",
    href: marketingUrl("/legal/privacy-policy"),
  },
];

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/get-mayday",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCpyOiaWcZyOzbD1hYsaVjdA/featured",
  },
] as const;
