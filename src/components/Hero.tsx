import { contact } from "../content/home"
import { useParallax } from "../hooks/useParallax"

export function Hero() {
  const photoRef = useParallax<HTMLImageElement>(0.08)

  return (
    <section id="home" className="peach-wash-tl relative overflow-hidden pt-20 sm:pt-24 md:pt-28">
      <div className="mx-auto grid max-w-7xl items-end gap-6 px-4 sm:px-5 md:px-8 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0 max-w-xl py-8 text-center sm:py-10 md:py-16 lg:py-24 lg:text-left">
          <p className="hero-enter px-1 text-[0.6rem] font-medium tracking-[0.12em] text-brand uppercase sm:text-[0.68rem] sm:tracking-[0.22em] lg:tracking-[0.28em]">
            Prashant Kalal · Real Estate Advisor
          </p>
          <h1 className="hero-enter hero-d1 mt-4 text-[clamp(1.35rem,6.4vw,3.15rem)] leading-[1.18] font-medium tracking-tight text-ink">
            Real Estate Decisions.
            <br />
            Backed by Experience.
          </h1>
          <p className="hero-enter hero-d2 mt-5 text-[0.9rem] tracking-wide text-body sm:text-base">
            <span className="block sm:inline">12+ Years of Real Estate Experience</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">Sales &amp; Post-Sales</span>
          </p>
          <p className="hero-enter hero-d2 mt-2 text-sm text-pretty break-words text-muted">
            MahaRERA Registered Real Estate Agent
            <span className="hidden sm:inline"> · </span>
            <span className="mt-0.5 block sm:mt-0 sm:inline">{contact.rera}</span>
          </p>
          <div className="hero-enter hero-d3 mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <a
              href="#contact"
              className="btn-shine bg-brand px-7 py-3 text-center text-[0.72rem] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-brand-dark"
            >
              Talk to Prashant
            </a>
            <a
              href="#contact"
              className="btn-shine border border-brand px-7 py-3 text-center text-[0.72rem] font-semibold tracking-[0.16em] text-brand uppercase transition hover:bg-peach-soft"
            >
              Start a Conversation
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden sm:max-w-md lg:aspect-auto lg:max-h-[640px] lg:min-h-[520px] lg:max-w-none">
          <img
            ref={photoRef}
            src="/founder.jpg"
            alt="Prashant Kalal, founder of Kshetra"
            className="hero-fade hero-d4 h-full w-full object-cover object-[center_18%] will-change-transform"
          />
        </div>
      </div>
    </section>
  )
}
