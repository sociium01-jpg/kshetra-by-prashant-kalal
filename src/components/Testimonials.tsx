import { testimonials } from "../content/home"
import { Card3D } from "./Card3D"
import { Reveal } from "./Reveal"

export function Testimonials() {
  return (
    <section id="testimonials" className="section-band peach-wash-tl">
      <div className="page-shell">
        <Reveal variant="blur-in">
          <h2 className="section-title text-center">{testimonials.heading}</h2>
        </Reveal>
        <div className="mt-7 grid gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.items.map((item, i) => (
            <Reveal key={item.quote} delay={i * 90} variant="zoom-in">
              <Card3D className="flex h-full flex-col items-center justify-between text-center rounded-2xl border border-muted/20 bg-white/90 p-5 sm:p-6 shadow-sm transition-all hover:border-brand/30 hover:shadow-md">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-serif font-bold leading-none text-brand/40 select-none" aria-hidden="true">
                    “
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-body sm:text-[0.84rem]">
                    {item.quote}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-muted/15 w-full">
                  <p className="text-[0.72rem] font-bold tracking-[0.06em] text-brand uppercase">
                    {item.name}
                  </p>
                  {item.title ? (
                    <p className="mt-0.5 text-[0.65rem] font-medium text-muted whitespace-nowrap">
                      {item.title}
                    </p>
                  ) : null}
                </div>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
