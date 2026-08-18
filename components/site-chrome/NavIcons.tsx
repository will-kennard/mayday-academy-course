import type { ReactNode } from "react";
import Image from "next/image";
import type { Badge, ProductIcon } from "@/lib/site-nav";

export function BadgePill({ badge }: { badge: Badge }) {
  return (
    <span className="ml-1.5 inline-flex items-center rounded bg-mayday-purple px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
      {badge}
    </span>
  );
}

export function SparkleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      fill="currentColor"
      className="ml-1 h-3 w-3 text-mayday-dark/70"
      aria-hidden
    >
      <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" />
    </svg>
  );
}

export function Chevron({ className = "h-2.5 w-2.5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 6"
      fill="none"
      className={className}
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

export function CircleArrow() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-mayday-red">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 12 12"
        fill="none"
        className="h-3 w-3"
        aria-hidden
      >
        <path
          d="M2 6H10M10 6L7 3M10 6L7 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function NavyCircleArrow() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-mayday-dark">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 12 12"
        fill="none"
        className="h-3 w-3"
        aria-hidden
      >
        <path
          d="M2 6H10M10 6L7 3M10 6L7 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="h-8 w-8 shrink-0 text-mayday-dark"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function ProductIconMark({ icon }: { icon: ProductIcon }) {
  switch (icon) {
    case "flux":
      return (
        <IconWrap>
          <path
            d="M4 16L9 11L13 15L20 8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 8H20V13"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </IconWrap>
      );
    case "prepayments":
      return (
        <IconWrap>
          <rect
            x="3"
            y="6"
            width="18"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M3 10H21" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M7 15H11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </IconWrap>
      );
    case "accruals":
      return (
        <IconWrap>
          <rect
            x="3"
            y="5"
            width="11"
            height="11"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M3 9h11M7 5V3.5M10 5V3.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16.5" cy="16.5" r="3.2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M18.8 18.8L21 21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </IconWrap>
      );
    case "deferredRevenue":
      return (
        <IconWrap>
          <path
            d="M4 20V9L12 4L20 9V20"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M9 20V13H15V20" stroke="currentColor" strokeWidth="1.6" />
        </IconWrap>
      );
    case "balancer":
      return (
        <IconWrap>
          <path
            d="M12 4V8M12 8L6 14H18L12 8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M5 18H9M15 18H19"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="7" cy="16" r="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="17" cy="16" r="2" stroke="currentColor" strokeWidth="1.4" />
        </IconWrap>
      );
    case "hq":
      return (
        <IconWrap>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M4 12H20M12 4C9.5 7 8.5 10 8.5 12C8.5 14 9.5 17 12 20C14.5 17 15.5 14 15.5 12C15.5 10 14.5 7 12 4Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </IconWrap>
      );
    case "brag":
      return (
        <IconWrap>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="8.5" y="13.5" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 7H13.5M12 10.5V13.5" stroke="currentColor" strokeWidth="1.4" />
        </IconWrap>
      );
    case "recharger":
      return (
        <IconWrap>
          <circle cx="12" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 8.2V11L6.8 16M12 11L17.2 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </IconWrap>
      );
  }
}

export function EasyMonthEndMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      className="h-10 w-10 shrink-0"
      aria-hidden
    >
      <polygon
        points="20,2 36,11 36,29 20,38 4,29 4,11"
        fill="#F5C542"
      />
      <path
        d="M14 15h8.5a4 4 0 0 1 0 8H18"
        fill="none"
        stroke="#0E0C2A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M23 20l3 3-3 3"
        fill="none"
        stroke="#0E0C2A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 25h-8.5a4 4 0 0 1 0-8H22"
        fill="none"
        stroke="#0E0C2A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 20l-3-3 3-3"
        fill="none"
        stroke="#0E0C2A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function XeroLogo() {
  return (
    <Image
      src="/images/xero.webp"
      alt="Xero"
      width={40}
      height={40}
      className="h-10 w-10 rounded-full"
    />
  );
}

export function QuickBooksLogo() {
  return (
    <Image
      src="/images/intuit.svg"
      alt="Intuit QuickBooks"
      width={160}
      height={41}
      className="h-9 w-auto"
      unoptimized
    />
  );
}

export function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34 34"
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

export function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 28"
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

export function MenuIcon() {
  return (
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
  );
}

export function CloseIcon() {
  return (
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
  );
}
