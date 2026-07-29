import Image from "next/image";

export default function CalculatorHero() {
  return (
    <section className="w-full bg-mayday-red text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-14">
        <div className="order-2 lg:order-1">
          <h1 className="font-poppins text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How much does your month end actually cost?
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            The manual half of close quietly eats a week every month. A short
            quiz puts a number on it - and shows how mature your process is.
          </p>
          <p className="mt-3 text-sm text-white/75">
            No signup necessary.
          </p>
        </div>

        <div className="relative order-1 aspect-square w-full overflow-hidden lg:order-2 lg:justify-self-end lg:max-w-xl">
          <Image
            src="/images/month_end_again.png"
            alt="Month end calendars stacking into a pile of reconciliations, journals, tasks and reports"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 36rem"
            className="object-cover object-[center_60%] sm:object-center"
          />
        </div>
      </div>
    </section>
  );
}
