import { Reveal } from "./Reveal"

export function Differentiator() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="section-title text-center">
            I&apos;ve Seen Both Sides of the Property Journey.
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-body">
            Sales taught me how a property is brought to market. Post-Sales taught
            me what happens after the booking. You get both when we talk.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Reveal delay={80}>
            <article className="card-lift border-t-2 border-brand bg-gray px-8 py-10">
              <h3 className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                Sales
              </h3>
              <p className="mt-4 leading-relaxed text-body">
                I know how inventory is positioned, how pricing is built, and
                which questions are worth asking before you commit. That is the
                difference between being shown a project and understanding it.
              </p>
            </article>
          </Reveal>
          <Reveal delay={140}>
            <article className="card-lift border-t-2 border-brand bg-gray px-8 py-10">
              <h3 className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">
                Post-Sales
              </h3>
              <p className="mt-4 leading-relaxed text-body">
                I know what follows the handshake — documentation, possession,
                snags, and the wait. I factor that into the advice I give you
                today, so the decision still holds after you move in.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
