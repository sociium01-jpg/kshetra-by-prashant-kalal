import { workSteps } from "../content/home"
import { workIcons } from "./Icons"
import { Reveal } from "./Reveal"

export function HowIWork() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="section-title text-center">How I Work</h2>
        </Reveal>
        <Reveal delay={60}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-body">
            Understand → Evaluate → Compare → Advise → Decide
          </p>
        </Reveal>
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {workSteps.map((step, i) => {
            const Icon = workIcons[step.icon]
            return (
              <Reveal key={step.title} as="li" delay={i * 70} className="text-center">
                <span className="step-icon icon-anim mx-auto flex h-14 w-14 items-center justify-center bg-brand text-white">
                    <Icon />
                  </span>
                  <h3 className="mt-5 text-sm font-semibold tracking-[0.16em] text-ink uppercase">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{step.body}</p>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
