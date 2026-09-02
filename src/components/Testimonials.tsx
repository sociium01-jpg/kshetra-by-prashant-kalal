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
        <div className="mt-7 grid gap-4 sm:mt-8 md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <Reveal key={item.quote} delay={i * 90} variant="zoom-in">
              <Card3D className="flex h-full flex-col px-5 py-6 sm:px-6 sm:py-7">
                <span className="text-5xl font-bold leading-none text-[#f3c4a8]" aria-hidden="true">
                  “
                </span>
                <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-ink">{item.quote}</p>
                <p className="mt-6 text-[0.72rem] font-bold tracking-[0.04em] text-brand uppercase">
                  {item.name}
                </p>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
