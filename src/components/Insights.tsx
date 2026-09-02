import { journal } from "../content/home"
import { Reveal } from "./Reveal"

export function Insights() {
  return (
    <section id="journal" className="section-band bg-gray">
      <div className="page-shell">
        <Reveal variant="blur-in">
          <h2 className="section-title text-center">{journal.heading}</h2>
        </Reveal>
        <Reveal delay={60} variant="fade-up">
          <div className="mx-auto mt-3 max-w-2xl space-y-2 text-center text-body">
            {journal.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={100} variant="fade-up" className="mt-7 flex justify-center">
          <button
            type="button"
            disabled
            className="btn-shine bg-brand px-8 py-3 text-[0.75rem] font-semibold tracking-[0.16em] text-white uppercase opacity-90 cursor-default shadow-sm"
          >
            Coming Soon
          </button>
        </Reveal>
      </div>
    </section>
  )
}
