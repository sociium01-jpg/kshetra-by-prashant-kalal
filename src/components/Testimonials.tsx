import { testimonials } from "../content/home"
import { Reveal } from "./Reveal"

export function Testimonials() {
  return (
    <section id="testimonials" className="peach-wash-tl py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <Reveal>
          <h2 className="section-title text-center">{testimonials.heading}</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <Reveal key={item.quote} delay={i * 80}>
              <article className="flex h-full flex-col bg-white/80 px-6 py-8 sm:px-7 sm:py-10">
                <span className="font-serif text-5xl leading-none text-[#f3c4a8]" aria-hidden="true">
                  “
                </span>
                <p className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink">{item.quote}</p>
                <p className="mt-6 text-[0.72rem] font-semibold tracking-[0.14em] text-brand uppercase">
                  {item.name}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
