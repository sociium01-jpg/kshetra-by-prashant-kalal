import { helpCards } from "../content/home"
import { helpIcons } from "./Icons"
import { Reveal } from "./Reveal"

export function HowICanHelp() {
  return (
    <section id="help" className="bg-gray py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="section-title text-center">How I Can Help</h2>
        </Reveal>
        <Reveal delay={60}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-body">
            Residential, commercial, or a question about a property you already
            have in mind. Advisory-first — not sales-first.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {helpCards.map((card, i) => {
            const Icon = helpIcons[card.icon]
            return (
              <Reveal key={card.title} delay={i * 70}>
                <article className="card-lift bg-white px-8 py-10">
                  <span className="icon-anim inline-flex text-brand">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-semibold tracking-[0.08em] text-brand uppercase">
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
