import { whyKshetra } from "../content/home"
import { Logo } from "./Logo"

export function ConsideredApproach() {
  return (
    <section id="why" className="grid w-full overflow-hidden lg:grid-cols-2">
      <div className="relative min-h-[260px] overflow-hidden bg-ink sm:min-h-[380px] md:min-h-[440px] lg:min-h-[560px]">
        <img
          src="/kshetra-cityscape.jpg"
          alt="Pune"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute top-5 right-5 z-10 sm:top-7 sm:right-7 md:top-8 md:right-8">
          <Logo invert compact />
        </div>
        <div className="absolute inset-0 flex items-end p-5 pt-16 sm:items-start sm:p-10 sm:pt-20 md:p-12 md:pt-24">
          <div className="flex max-w-lg items-stretch gap-3 sm:gap-4">
            <span className="w-[3px] shrink-0 bg-brand" aria-hidden="true" />
            <h2 className="text-[1.15rem] leading-[1.25] font-semibold tracking-[0.06em] text-white uppercase sm:text-[1.75rem] md:text-[2.05rem]">
              {whyKshetra.subhead}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-center bg-gray px-5 py-12 sm:px-10 md:px-14 lg:px-16">
        <h2 className="text-[1.35rem] font-medium tracking-[0.12em] text-brand uppercase md:text-[1.7rem]">
          {whyKshetra.heading}
        </h2>
        <p className="mt-4 max-w-lg text-[0.95rem] font-medium text-ink md:text-[1.05rem]">
          {whyKshetra.subhead}
        </p>
        <div className="mt-7 max-w-lg space-y-5 text-[0.95rem] leading-relaxed text-body md:text-[0.98rem]">
          {whyKshetra.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
