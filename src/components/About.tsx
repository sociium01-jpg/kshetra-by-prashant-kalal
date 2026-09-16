import { useSite } from "../context/SiteContext"
import { useInView } from "../hooks/useInView"
import { FounderQuoteCard } from "./FounderQuoteCard"
import { Reveal } from "./Reveal"

export function About() {
  const { content } = useSite()
  const founder = content.founder
  const { ref, visible } = useInView<HTMLElement>()

  return (
    <section
      id="founder"
      ref={ref}
      className={`w-full overflow-hidden ${visible ? "is-in" : ""}`}
    >
      {/* MOBILE VIEW (< 1024px) */}
      <div className="lg:hidden peach-wash-tl w-full">
        <div className="section-split section-split-meet">
          <div className="split-copy">
            <Reveal variant="fade-right">
              <h2 className="text-[1.25rem] font-bold tracking-[0.04em] text-ink uppercase sm:text-[1.45rem]">
                {founder.heading}
              </h2>
            </Reveal>
            <Reveal delay={70} variant="fade-right">
              <p className="mt-3 text-[0.95rem] font-medium tracking-[0.04em] text-brand">
                {founder.subhead}
              </p>
            </Reveal>
            <div className="mt-6 max-w-lg space-y-4 text-[0.95rem] leading-relaxed text-body">
              {founder.paragraphs.map((paragraph, i) => (
                <Reveal key={paragraph} delay={120 + i * 70} variant="fade-up">
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal
            variant="zoom-in"
            delay={150}
            className={`split-media split-media-fit pb-8 px-4 sm:px-6 ${visible ? "is-in" : ""}`}
          >
            <div className="split-photo-frame mx-auto w-full max-w-[24rem] sm:max-w-[27rem]">
              <FounderQuoteCard
                quoteLines={[
                  "Because the right",
                  "INVESTMENT begins",
                  "with the right",
                  "QUESTIONS.",
                ]}
                name={["PRASHANT", "KALAL"]}
                role="FOUNDER"
                photo="/founder-cutout.png"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* DESKTOP VIEW (>= 1024px) */}
      <div className="hidden lg:block relative w-full overflow-hidden bg-[#fff8f4]">
        {/* Desktop Banner Graphic Background */}
        <img
          src="/meet-prashant-desktop-banner.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-right pointer-events-none select-none"
        />

        {/* Text Overlay on Left Peach Area */}
        <div className="relative z-10 flex min-h-[580px] xl:min-h-[640px] items-center">
          <div className="w-[56%] xl:w-[54%] py-14 px-12 lg:px-16 xl:px-24">
            <Reveal variant="fade-right">
              <h2 className="text-[1.85rem] xl:text-[2.2rem] font-bold tracking-[0.04em] text-ink uppercase leading-tight">
                {founder.heading}
              </h2>
            </Reveal>
            <Reveal delay={70} variant="fade-right">
              <p className="mt-3 text-[1.05rem] xl:text-[1.15rem] font-semibold tracking-[0.03em] text-brand">
                {founder.subhead}
              </p>
            </Reveal>
            <div className="mt-6 space-y-4 text-[0.96rem] xl:text-[1.02rem] leading-relaxed text-body">
              {founder.paragraphs.map((paragraph, i) => (
                <Reveal key={paragraph} delay={120 + i * 70} variant="fade-up">
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
