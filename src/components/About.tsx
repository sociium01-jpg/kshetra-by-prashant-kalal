import { founder } from "../content/home"
import { useInView } from "../hooks/useInView"
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
          <Reveal>
            <h2 className="text-[1.25rem] font-semibold tracking-[0.04em] text-ink uppercase sm:text-[1.45rem] md:text-[2rem]">
              {founder.heading}
            </h2>
          </Reveal>
          <Reveal delay={70}>
            <p className="mt-3 text-[0.95rem] font-medium tracking-[0.04em] text-brand md:text-[1.05rem]">
              {founder.subhead}
            </p>
          </Reveal>
          <div className="mt-6 max-w-lg space-y-4 text-[0.95rem] leading-relaxed text-body md:text-[0.98rem]">
            {founder.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph} delay={120 + i * 70}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={420}>
            <h3 className="mt-8 text-[0.95rem] font-semibold tracking-[0.04em] text-ink uppercase md:text-[1.05rem]">
              {founder.beyondHeading}
            </h3>
          </Reveal>
          <div className="mt-4 max-w-lg space-y-4 text-[0.95rem] leading-relaxed text-body md:text-[0.98rem]">
            {founder.beyondParagraphs.map((paragraph, i) => (
              <Reveal key={paragraph} delay={480 + i * 70}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className={`split-media split-media-fit ${visible ? "is-in" : ""}`}>
          <div className="split-photo-frame">
            <img
              src="/founder-pk.png?v=5"
              alt="Prashant Kalal"
              width={819}
              height={1024}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
