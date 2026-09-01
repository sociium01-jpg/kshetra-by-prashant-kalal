import { whyKshetra } from "../content/home"
import { useInView } from "../hooks/useInView"
import { Logo } from "./Logo"
import { Reveal } from "./Reveal"

export function ConsideredApproach() {
  const { ref, visible } = useInView<HTMLElement>()

  return (
    <section
      id="why"
      ref={ref}
      className={`w-full overflow-hidden ${visible ? "is-in" : ""}`}
    >
      <div className="section-split">
        <div className="split-media bg-ink">
          <img
            src="/kshetra-cityscape.jpg"
            alt="Pune"
            className="split-kenburns absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/35" />
          <div className="split-overlay-copy absolute top-5 right-5 z-10 sm:top-6 sm:right-6">
            <Logo invert compact />
          </div>
          <div className="absolute inset-0 flex items-center p-5 pt-16 sm:p-8 sm:pt-16 md:p-10">
            <div
              className="split-overlay-copy flex max-w-xl items-stretch gap-3 sm:gap-4"
              style={{ transitionDelay: "160ms" }}
            >
              <span className="w-[3px] shrink-0 bg-brand" aria-hidden="true" />
              <p className="text-[1.05rem] leading-[1.35] font-semibold tracking-[0.02em] text-white sm:text-[1.45rem] md:text-[1.7rem] lg:text-[1.85rem]">
                Understanding property, people
                <br />
                and the places that bring
                <br />
                them together.
              </p>
            </div>
          </div>
        </div>

        <div className="split-copy bg-gray">
          <Reveal>
            <h2 className="text-[1.35rem] font-medium tracking-[0.04em] text-brand uppercase md:text-[1.7rem]">
              {whyKshetra.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-4 max-w-lg text-[0.95rem] font-medium text-ink md:text-[1.05rem]">
              {whyKshetra.subhead}
            </p>
          </Reveal>
          <div className="mt-7 max-w-lg space-y-4 text-[0.95rem] leading-relaxed text-body md:text-[0.98rem]">
            {whyKshetra.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph} delay={140 + i * 70}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
