import { workSteps } from "../content/home"
import { workIcons } from "./Icons"
import { Reveal } from "./Reveal"

export function HowIWork() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <h2 className="section-title text-center">How I Work</h2>
        </Reveal>
        <Reveal delay={60}>
          <p className="mx-auto mt-5 max-w-2xl px-1 text-center text-sm leading-relaxed text-pretty text-body sm:text-base">
            Understand → Evaluate → Compare → Advise → Decide
          </p>
        </Reveal>
        <ol className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 lg:grid-cols-5">
          {workSteps.map((step, i) => {
            const Icon = workIcons[step.icon]
            const last = i === workSteps.length - 1
            return (
              <Reveal
                key={step.title}
                as="li"
                delay={i * 70}
                className={`text-center ${last ? "md:col-span-2 md:mx-auto md:max-w-xs lg:col-span-1 lg:mx-0 lg:max-w-none" : ""}`}
              >
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
