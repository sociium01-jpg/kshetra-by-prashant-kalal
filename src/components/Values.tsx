import { Card3D } from "./Card3D"
import { Reveal } from "./Reveal"

const valuesData = [
  {
    title: "INTEGRITY",
    body: "You can trust the advice.",
  },
  {
    title: "ATTENTION",
    body: "Your needs are genuinely heard.",
  },
  {
    title: "DELIBERATION",
    body: "Decisions aren't rushed.",
  },
  {
    title: "CLARITY",
    body: "You understand what you're choosing.",
  },
]

export function Values() {
  return (
    <section id="values" className="section-band bg-white">
      <div className="page-shell">
        <Reveal variant="blur-in">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[1.35rem] font-bold tracking-[0.04em] text-brand uppercase md:text-[1.7rem]">
              The Pillars of Kshetra
            </h2>
            <p className="mt-3 text-[0.95rem] font-medium text-ink md:text-[1.05rem]">
              Grounded principles that define every interaction.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valuesData.map((item, index) => (
            <Reveal key={item.title} delay={index * 80 + 100}>
              <Card3D className="flex h-full flex-col justify-between rounded-2xl border border-gray bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div>
                  <span className="text-[0.7rem] font-bold tracking-widest text-brand uppercase">
                    0{index + 1}
                  </span>
                  <h3 className="mt-2 text-[1.1rem] font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-body sm:text-[0.84rem]">
                    {item.body}
                  </p>
                </div>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
