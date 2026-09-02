import { Card3D } from "./Card3D"
import { Reveal } from "./Reveal"

const valuesData = [
  {
    title: "INTEGRITY",
    body: "You can trust the advice.",
    icon: (
      <svg className="h-7 w-7 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "ATTENTION",
    body: "Your needs are genuinely heard.",
    icon: (
      <svg className="h-7 w-7 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "DELIBERATION",
    body: "Decisions aren't rushed.",
    icon: (
      <svg className="h-7 w-7 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 22h14" />
        <path d="M5 2h14" />
        <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
        <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
      </svg>
    ),
  },
  {
    title: "CLARITY",
    body: "You understand what you're choosing.",
    icon: (
      <svg className="h-7 w-7 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v3" />
        <path d="M12 18v3" />
        <path d="M3 12h3" />
        <path d="M18 12h3" />
        <path d="m5.6 5.6 2.1 2.1" />
        <path d="m16.3 16.3 2.1 2.1" />
        <path d="m5.6 18.4 2.1-2.1" />
        <path d="m16.3 7.7 2.1-2.1" />
      </svg>
    ),
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
              <Card3D className="group/card flex h-full flex-col items-center justify-between text-center rounded-2xl border border-gray bg-white p-6 shadow-sm transition-all hover:border-brand/30 hover:shadow-md">
                <div className="flex flex-col items-center">
                  {/* Animated Centered Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-brand transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotate-6 group-hover/card:bg-brand group-hover/card:text-white group-hover/card:shadow-[0_10px_25px_rgba(239,127,26,0.4)]">
                    {item.icon}
                  </div>
                  <h3 className="mt-1 text-[1.1rem] font-bold tracking-wider text-ink uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-body sm:text-[0.85rem]">
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
