import Image from "next/image";
import type { ReactNode } from "react";

type FeatureSectionProps = {
  backgroundColor: string;
  textColor: string;
  imageSrc: string;
  imageAlt: string;
  /** When true, image is on the left and heading on the right (desktop) */
  imageLeft?: boolean;
  children: ReactNode;
};

export default function FeatureSection({
  backgroundColor,
  textColor,
  imageSrc,
  imageAlt,
  imageLeft = false,
  children,
}: FeatureSectionProps) {
  return (
    <section
      className="w-full px-4 py-10 sm:px-6 sm:py-12 lg:py-14"
      style={{ backgroundColor, color: textColor }}
    >
      <div
        className={`mx-auto flex max-w-3xl flex-col items-center gap-5 sm:gap-6 lg:flex-row lg:items-center lg:justify-center lg:gap-8 ${
          imageLeft ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="w-full shrink lg:max-w-sm">{children}</div>
        <div className="relative w-full max-w-[240px] shrink-0 sm:max-w-[280px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={720}
            height={720}
            className="mx-auto h-auto max-h-[240px] w-full object-contain sm:max-h-[280px]"
            sizes="280px"
          />
        </div>
      </div>
    </section>
  );
}
