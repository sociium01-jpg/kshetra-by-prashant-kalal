import { useParallax } from "../hooks/useParallax"
import { Reveal } from "./Reveal"

export function Pune() {
  const imgRef = useParallax<HTMLImageElement>(0.14, 1.12)

  return (
    <section id="pune" className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[2.4/1] min-w-0 overflow-hidden bg-ink lg:aspect-auto lg:min-h-[560px]">
          <img
            ref={imgRef}
            src="/pune-city.jpg"
            alt="Pune cityscape"
            className="absolute inset-0 h-full w-full object-cover object-center grayscale will-change-transform"
          />
          <div className="absolute inset-0 bg-ink/25" />
        </div>
        <div className="flex min-w-0 flex-col justify-center bg-peach-soft px-4 py-12 sm:px-8 md:px-14 lg:px-16 lg:py-14">
          <Reveal>
            <h2 className="section-title">Pune, as I know it</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 max-w-lg space-y-5 text-[0.98rem] leading-relaxed text-body">
              <p>
                Pune is not one market. Baner does not behave like Kharadi.
                Koregaon Park is not Bavdhan. The city&apos;s real estate makes
                sense only when you also understand how people actually live here
                — work, schools, weekends, the roads they will sit on.
              </p>
              <p>
                Twelve years on the ground have been as much about neighbourhoods,
                infrastructure and lifestyle as about projects. That is the
                context I bring into every conversation.
              </p>
              <p>
                This space will grow with notes on pockets, cafés, outdoors and
                getaways — the texture around a decision, not only the inventory
                inside it.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
