import { journey } from "../content/home"
import { Reveal } from "./Reveal"

export function Differentiator() {
  return (
    <section id="journey" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <h2 className="section-title text-center text-balance">{journey.heading}</h2>
        </Reveal>
        <ol className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {journey.steps.map((step, i) => {
            const last = i === journey.steps.length - 1
            return (
              <Reveal key={step.title} as="li" delay={i * 70} className="relative text-center">
                <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">
                  {step.title}
                  {last ? "" : <span className="ml-2 hidden font-normal lg:inline">→</span>}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-body">{step.body}</p>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
