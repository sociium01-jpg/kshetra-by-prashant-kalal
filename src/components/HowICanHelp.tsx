import { whatIBring } from "../content/home"
import { helpIcons } from "./Icons"
import { Reveal } from "./Reveal"

export function HowICanHelp() {
  return (
    <section id="what-we-do" className="section-band bg-white">
      <div className="page-shell">
        <Reveal variant="blur-in">
          <h2 className="section-title text-center">{whatIBring.heading}</h2>
        </Reveal>
        <Reveal delay={60} variant="fade-up">
          <p className="mx-auto mt-3 max-w-2xl text-center text-body">{whatIBring.subhead}</p>
        </Reveal>
        <div className="mt-7 grid gap-4 sm:mt-8 sm:grid-cols-2">
          {whatIBring.items.map((card, i) => {
            const Icon = helpIcons[card.icon]
            return (
              <Reveal key={card.title} delay={i * 80} variant="zoom-in">
                <article className="card-lift bg-gray px-5 py-6 sm:px-6 sm:py-7">
                  <span className="icon-anim inline-flex text-brand">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-[0.95rem] font-bold tracking-[0.04em] text-brand uppercase sm:text-[1.05rem]">
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
