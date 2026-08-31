import { useParallax } from "../hooks/useParallax"
import { Reveal } from "./Reveal"

export function About() {
  const photoRef = useParallax<HTMLImageElement>(0.06)

  return (
    <section id="about" className="grid overflow-hidden bg-peach-soft lg:grid-cols-2">
      <div className="flex flex-col justify-center px-8 py-14 md:px-14 lg:px-16">
        <Reveal>
          <h2 className="text-[1.7rem] font-semibold tracking-wide text-ink uppercase md:text-[2rem]">
            Meet Prashant Kalal
          </h2>
        </Reveal>
        <div className="mt-6 max-w-lg space-y-4 text-[0.98rem] leading-relaxed text-body">
          <p>
            For 12+ years I worked with a real estate developer — across Sales
            and Post-Sales. That meant sitting with buyers before they signed,
            and staying with them after they moved in.
          </p>
          <p>
            As a MahaRERA-registered real estate agent, my approach is simple:
            listen, understand and advise — rather than push a sale.
          </p>
          <p>
            Through Kshetra, I help you discover the right opportunities and
            make real estate decisions with clarity and confidence.
          </p>
        </div>
        <div className="mt-8 h-px w-16 bg-brand" />
        <p className="mt-5 text-sm font-medium text-brand italic">
          One objective: helping you make better property decisions.
        </p>
      </div>

      <div className="relative min-h-[480px] overflow-hidden bg-peach-soft lg:min-h-[560px]">
        <img
          ref={photoRef}
          src="/founder-cutout.png"
          alt="Prashant Kalal"
          className="relative z-10 mx-auto h-full max-h-[560px] w-auto object-contain object-bottom will-change-transform lg:max-h-[620px]"
        />
        <div
          className="pointer-events-none absolute bottom-10 left-1/2 z-[5] h-8 w-48 -translate-x-1/2 rounded-full bg-ink/25 blur-xl"
          aria-hidden="true"
        />
        <div className="absolute right-0 bottom-10 z-20 max-w-[16rem] md:max-w-[18rem]">
          <p className="mb-4 pr-6 text-right text-[0.95rem] leading-snug text-ink italic">
            “Because the right investment begins with the right questions”
          </p>
          <div className="bg-brand px-5 py-3 text-right">
            <p className="text-[0.95rem] font-semibold tracking-[0.12em] text-white uppercase">
              Prashant
              <br />
              Kalal
            </p>
          </div>
          <div className="bg-plate px-5 py-1.5 text-right">
            <p className="text-[0.7rem] tracking-[0.14em] text-white">Founder</p>
          </div>
        </div>
      </div>
    </section>
  )
}
