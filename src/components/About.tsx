import { founder } from "../content/home"
import { useInView } from "../hooks/useInView"
import { FounderQuoteCard } from "./FounderQuoteCard"
import { Reveal } from "./Reveal"

export function About() {
  const { ref, visible } = useInView<HTMLElement>()

  return (
    <section
      id="founder"
      ref={ref}
      className={`peach-wash-tl w-full ${visible ? "is-in" : ""}`}
    >
      <div className="section-split section-split-meet">
        <div className="split-copy">
          <Reveal variant="fade-right">
            <h2 className="text-[1.25rem] font-bold tracking-[0.04em] text-ink uppercase sm:text-[1.45rem] md:text-[2rem]">
              {founder.heading}
            </h2>
          </Reveal>
          <Reveal delay={70} variant="fade-right">
            <p className="mt-3 text-[0.95rem] font-medium tracking-[0.04em] text-brand md:text-[1.05rem]">
              {founder.subhead}
            </p>
          </Reveal>
          <div className="mt-6 max-w-lg space-y-4 text-[0.95rem] leading-relaxed text-body md:text-[0.98rem]">
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
          className={`split-media split-media-fit ${visible ? "is-in" : ""}`}
        >
          <div className="split-photo-frame w-full max-w-[26rem] sm:max-w-[28rem]">
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
    </section>
  )
}
