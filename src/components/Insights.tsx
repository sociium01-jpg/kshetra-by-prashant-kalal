import { journal } from "../content/home"
import { Reveal } from "./Reveal"

export function Insights() {
  return (
    <section id="journal" className="section-band bg-gray">
      <div className="page-shell">
        <Reveal>
          <h2 className="section-title text-center">{journal.heading}</h2>
        </Reveal>
        <Reveal delay={60}>
          <div className="mx-auto mt-5 max-w-2xl space-y-4 text-center text-body">
            {journal.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal delay={80}>
            <article className="card-lift bg-white px-6 py-8 sm:px-8 sm:py-10">
              <h3 className="text-sm font-semibold tracking-[0.04em] text-brand uppercase">
                {journal.realEstate.heading}
              </h3>
              <p className="mt-4 leading-relaxed text-body">{journal.realEstate.body}</p>
            </article>
          </Reveal>
          <Reveal delay={140}>
            <article className="card-lift bg-white px-6 py-8 sm:px-8 sm:py-10">
              <h3 className="text-sm font-semibold tracking-[0.04em] text-brand uppercase">
                {journal.beyondTheCity.heading}
              </h3>
              <p className="mt-4 leading-relaxed text-body">{journal.beyondTheCity.body}</p>
              <p className="mt-6 text-sm font-medium text-ink">{journal.beyondTheCity.exampleLabel}</p>
              <ul className="mt-4 space-y-4">
                {journal.beyondTheCity.places.map((place) => (
                  <li key={place.title}>
                    <p className="text-sm font-semibold tracking-[0.04em] text-ink uppercase">
                      {place.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-body">{place.body}</p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
