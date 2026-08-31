import { whatIBring } from "../content/home"
import { helpIcons } from "./Icons"
import { Reveal } from "./Reveal"

export function HowICanHelp() {
  return (
    <section id="what-we-do" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <h2 className="section-title text-center">{whatIBring.heading}</h2>
        </Reveal>
        <Reveal delay={60}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-body">{whatIBring.subhead}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {whatIBring.items.map((card, i) => {
            const Icon = helpIcons[card.icon]
            return (
              <Reveal key={card.title} delay={i * 70}>
                <article className="card-lift bg-gray px-5 py-8 sm:px-8 sm:py-10">
                  <span className="icon-anim inline-flex text-brand">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-[0.95rem] font-semibold tracking-[0.06em] text-brand uppercase sm:text-[1.05rem] sm:tracking-[0.08em]">
                    {card.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-body">{card.body}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
