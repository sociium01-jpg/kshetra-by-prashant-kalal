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

      {/* DESKTOP VIEW (>= 1024px) - UNIFORM PAGE-SHELL CONTAINER */}
      <div className="hidden lg:block section-band bg-[#fff8f4]/60 py-6 lg:py-10">
        <div className="page-shell">
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-muted/15 shadow-sm"
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

            {/* Proportional Text Overlay on Left Peach Area */}
            <div
              className="absolute inset-y-0 flex flex-col justify-center z-10"
              style={{
                left: "4.5cqw",
                width: "56cqw",
              }}
            >
              <Reveal variant="fade-right">
                <h2
                  className="font-bold tracking-[0.04em] text-ink uppercase"
                  style={{
                    fontSize: "2.1cqw",
                    lineHeight: "1.15",
                  }}
                >
                  {founder.heading}
                </h2>
              </Reveal>

              <Reveal delay={70} variant="fade-right">
                <p
                  className="font-semibold tracking-[0.03em] text-brand"
                  style={{
                    fontSize: "1.18cqw",
                    lineHeight: "1.2",
                    marginTop: "0.7cqw",
                  }}
                >
                  {founder.subhead}
                </p>
              </Reveal>

              <div
                className="text-body leading-relaxed"
                style={{
                  marginTop: "1cqw",
                }}
              >
                {founder.paragraphs.map((paragraph, i) => (
                  <Reveal key={paragraph} delay={120 + i * 70} variant="fade-up">
                    <p
                      style={{
                        fontSize: "0.98cqw",
                        lineHeight: "1.45",
                        marginBottom: i < founder.paragraphs.length - 1 ? "0.7cqw" : "0",
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
      </div>
    </section>
  )
}
