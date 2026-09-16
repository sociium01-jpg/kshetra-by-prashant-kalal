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

      {/* DESKTOP VIEW (>= 1024px) - FULL WIDTH UNZOOMED BANNER WITH REFINED TEXT */}
      <div className="hidden lg:block w-full bg-[#fff8f4]">
        <div
          className="relative w-full overflow-hidden"
          style={
            {
              containerType: "inline-size",
              aspectRatio: "1024 / 398",
            } as React.CSSProperties
          }
        >
          {/* Unzoomed 100% Native Aspect Ratio Desktop Banner */}
          <img
            src="/meet-prashant-desktop-banner.png"
            alt="Meet Prashant Kalal"
            className="absolute inset-0 h-full w-full object-fill pointer-events-none select-none"
          />

          {/* Proportional Refined Text Overlay on Left Peach Area */}
          <div
            className="absolute inset-y-0 flex flex-col justify-center z-10"
            style={{
              left: "5cqw",
              width: "50cqw",
            }}
          >
            <Reveal variant="fade-right">
              <h2
                className="font-bold tracking-[0.04em] text-ink uppercase"
                style={{
                  fontSize: "1.75cqw",
                  lineHeight: "1.18",
                }}
              >
                {founder.heading}
              </h2>
            </Reveal>

            <Reveal delay={70} variant="fade-right">
              <p
                className="font-semibold tracking-[0.03em] text-brand"
                style={{
                  fontSize: "1.0cqw",
                  lineHeight: "1.25",
                  marginTop: "0.5cqw",
                }}
              >
                {founder.subhead}
              </p>
            </Reveal>

            <div
              className="text-body leading-relaxed"
              style={{
                marginTop: "0.8cqw",
              }}
            >
              {founder.paragraphs.map((paragraph, i) => (
                <Reveal key={paragraph} delay={120 + i * 70} variant="fade-up">
                  <p
                    style={{
                      fontSize: "0.85cqw",
                      lineHeight: "1.45",
                      marginBottom: i < founder.paragraphs.length - 1 ? "0.5cqw" : "0",
                    }}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
