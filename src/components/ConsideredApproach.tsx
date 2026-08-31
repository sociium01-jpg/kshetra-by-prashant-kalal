import { useParallax } from "../hooks/useParallax"
import { Reveal } from "./Reveal"

export function ConsideredApproach() {
  const imgRef = useParallax<HTMLImageElement>(0.14, 1.12)

  return (
    <section className="grid w-full overflow-hidden lg:grid-cols-2">
      <div className="relative aspect-square min-w-0 overflow-hidden bg-ink sm:aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
        <img
          ref={imgRef}
          src="/considered-approach.jpg"
          alt="Pune hills and neighbourhoods"
          className="absolute inset-0 h-full w-full object-cover object-left-top will-change-transform lg:object-center"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center bg-gray px-4 py-12 sm:px-8 md:px-14 lg:px-16 lg:py-14">
        <Reveal>
          <h2 className="section-title">Why this practice?</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-8 max-w-lg space-y-5 text-[0.98rem] leading-relaxed text-body">
            <p>
              I built Kshetra as a personal real estate advisory — not a listing
              desk, and not a channel-partner shop.
            </p>
            <p>
              A property decision is more than finding an address. It needs a
              clear read of the market, the risks, and what actually fits your
              life today and later.
            </p>
            <p>
              You work with me directly: transparent, consultative, and paced
              around your questions.
            </p>
            <p>
              Because real estate isn’t just about finding a property. It’s about
              making the right choice.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
