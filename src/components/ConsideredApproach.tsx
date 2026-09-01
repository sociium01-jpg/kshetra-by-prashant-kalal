import { whyKshetra } from "../content/home"
import { Logo } from "./Logo"

export function ConsideredApproach() {
  return (
    <section id="why" className="grid w-full overflow-hidden lg:grid-cols-2">
      <div className="relative aspect-[12/5] min-h-[200px] overflow-hidden bg-ink sm:min-h-[240px] lg:aspect-auto lg:h-full lg:min-h-[420px] lg:max-h-[480px]">
        <img
          src="/kshetra-cityscape.jpg"
          alt="Pune"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute top-5 right-5 z-10 sm:top-6 sm:right-6 md:top-7 md:right-8">
          <Logo invert compact />
        </div>
        <div className="absolute inset-0 flex items-center p-5 pt-16 sm:p-10 sm:pt-16 md:p-12">
          <div className="flex max-w-xl items-stretch gap-3 sm:gap-4">
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
