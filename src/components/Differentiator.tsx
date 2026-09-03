import { journey } from "../content/home"
import { IconBuilding, workIcons } from "./Icons"
import { Reveal } from "./Reveal"

export function Differentiator() {
  return (
    <section id="journey" className="section-band bg-gray">
      <div className="page-shell">
        <Reveal variant="blur-in">
          <h2 className="section-title text-center text-balance">{journey.heading}</h2>
        </Reveal>
        <ol className="mt-7 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {journey.steps.map((step, i) => {
            const last = i === journey.steps.length - 1
            const Icon = step.icon in workIcons ? workIcons[step.icon as keyof typeof workIcons] : IconBuilding
            return (
              <Reveal key={step.title} as="li" delay={i * 80} variant="fade-up" className="group relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-brand/20 bg-brand/10 text-brand transition-all duration-400 ease-out group-hover:-translate-y-1.5 group-hover:scale-115 group-hover:border-brand group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_12px_28px_rgba(239,127,26,0.45)]">
                  <Icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-[-6deg]" />
                </div>
                <p className="text-sm font-semibold tracking-[0.04em] text-brand uppercase">
                  {step.title}
                  {last ? "" : <span className="ml-2 hidden font-normal lg:inline">→</span>}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-body">{step.body}</p>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
