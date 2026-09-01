import { founder } from "../content/home"

export function About() {
  return (
    <section id="founder" className="relative grid w-full">
      <img
        src="/meet-pk-banner.png"
        alt="Prashant Kalal"
        width={1920}
        height={1067}
        className="col-start-1 row-start-2 h-auto w-full max-w-full xl:row-start-1"
      />

      <div className="col-start-1 row-start-1 z-10 flex w-full min-w-0 flex-col justify-center bg-peach-soft px-5 py-10 sm:px-8 sm:py-12 md:px-12 xl:w-[40%] xl:max-w-xl xl:bg-transparent xl:px-10 xl:py-8 2xl:px-16">
        <h2 className="text-[1.25rem] font-semibold tracking-wide text-ink uppercase sm:text-[1.45rem] md:text-[2rem]">
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
    </section>
  )
}
