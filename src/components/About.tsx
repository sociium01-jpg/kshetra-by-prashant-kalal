import { founder } from "../content/home"

export function About() {
  return (
    <section id="founder" className="relative flex w-full flex-col overflow-hidden lg:block">
      <img
        src="/meet-pk-banner.jpg"
        alt="Prashant Kalal"
        className="order-2 h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:w-full lg:object-cover lg:object-right"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[52%] bg-gradient-to-r from-peach-soft/55 via-white/20 to-transparent lg:block"
      />

      <div className="relative z-10 order-1 grid w-full lg:grid-cols-2">
        <div className="flex min-w-0 flex-col justify-center bg-peach-soft px-5 py-12 sm:px-10 md:px-14 lg:bg-transparent lg:px-16 lg:py-20">
          <h2 className="text-[1.45rem] font-semibold tracking-wide text-ink uppercase md:text-[2rem]">
            {founder.heading}
          </h2>
          <p className="mt-3 text-[0.95rem] font-medium tracking-wide text-brand md:text-[1.05rem]">
            {founder.subhead}
          </p>
          <div className="mt-6 max-w-lg space-y-4 text-[0.95rem] leading-relaxed text-body md:text-[0.98rem]">
            {founder.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <h3 className="mt-8 text-[0.95rem] font-semibold tracking-[0.12em] text-ink uppercase md:text-[1.05rem]">
            {founder.beyondHeading}
          </h3>
          <div className="mt-4 max-w-lg space-y-4 text-[0.95rem] leading-relaxed text-body md:text-[0.98rem]">
            {founder.beyondParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="hidden min-h-[36rem] lg:block" aria-hidden="true" />
      </div>
    </section>
  )
}
