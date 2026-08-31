import { insightTopics } from "../content/home"
import { Reveal } from "./Reveal"

export function Insights() {
  return (
    <section id="insights" className="bg-gray py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <h2 className="section-title text-center">Insights</h2>
        </Reveal>
        <Reveal delay={60}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-body">
            Notes on Pune real estate, residential and commercial, luxury,
            investment, and the practical side of buying. Coming as I write them.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {insightTopics.map((topic, i) => (
            <Reveal key={topic} delay={i * 50}>
              <article className="card-lift glass flex min-h-[140px] flex-col justify-between px-6 py-6">
                <h3 className="text-sm font-semibold tracking-[0.08em] text-ink uppercase sm:tracking-[0.12em]">
                  {topic}
                </h3>
                <p className="mt-6 text-[0.7rem] tracking-[0.18em] text-muted uppercase">
                  Coming soon
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
