import { contact } from "../content/home"
import { useParallax } from "../hooks/useParallax"

export function Hero() {
  const photoRef = useParallax<HTMLImageElement>(0.08)

  return (
    <section id="home" className="peach-wash-tl relative overflow-hidden pt-24 md:pt-28">
      <div className="mx-auto grid max-w-7xl items-end gap-8 px-5 md:grid-cols-2 md:gap-6 md:px-8 lg:items-center">
        <div className="max-w-xl py-10 md:py-16 lg:py-24">
          <p className="hero-enter text-[0.68rem] font-medium tracking-[0.28em] text-brand uppercase">
            Prashant Kalal · Real Estate Advisor
          </p>
          <h1 className="hero-enter hero-d1 mt-4 text-[2rem] leading-[1.15] font-medium tracking-tight text-ink sm:text-[2.6rem] lg:text-[3.15rem]">
            Real Estate Decisions.
            <br />
            Backed by Experience.
          </h1>
          <p className="hero-enter hero-d2 mt-5 text-[0.95rem] tracking-wide text-body sm:text-base">
            <span className="block sm:inline">12+ Years of Real Estate Experience</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">Sales &amp; Post-Sales</span>
          </p>
          <p className="hero-enter hero-d2 mt-2 text-sm break-words text-muted">
            MahaRERA Registered Real Estate Agent · {contact.rera}
          </p>
          <div className="hero-enter hero-d3 mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="btn-shine bg-brand px-7 py-3 text-[0.72rem] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-brand-dark"
            >
              Talk to Prashant
            </a>
            <a
              href="#contact"
              className="btn-shine border border-brand px-7 py-3 text-[0.72rem] font-semibold tracking-[0.16em] text-brand uppercase transition hover:bg-peach-soft"
            >
              Start a Conversation
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md overflow-hidden md:max-w-none">
          <img
            ref={photoRef}
            src="/founder-cutout.png"
            alt="Prashant Kalal, founder of Kshetra"
            className="hero-fade hero-d4 relative z-10 mx-auto h-auto max-h-[540px] w-full max-w-sm object-contain object-bottom will-change-transform sm:max-h-[580px] lg:max-h-[620px]"
          />
          <div
            className="pointer-events-none absolute bottom-6 left-1/2 z-0 h-10 w-40 -translate-x-1/2 rounded-full bg-ink/20 blur-xl"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
