import { founder } from "../content/home"
import { Reveal } from "./Reveal"

export function About() {
  return (
    <section id="founder" className="peach-wash-tl w-full">
      <div className="page-shell">
        <div className="section-split">
          <div className="split-copy">
            <Reveal>
              <h2 className="text-[1.25rem] font-semibold tracking-wide text-ink uppercase sm:text-[1.45rem] md:text-[2rem]">
                {founder.heading}
              </h2>
            </Reveal>
            <p className="mt-3 text-[0.95rem] font-medium tracking-wide text-brand md:text-[1.05rem]">
              {founder.subhead}
            </p>
            <div className="mt-6 max-w-lg space-y-4 text-[0.95rem] leading-relaxed text-body md:text-[0.98rem]">
              {founder.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <h3 className="mt-8 text-[0.95rem] font-semibold tracking-[0.12em] text-ink uppercase md:text-[1.05rem]">
              {founder.beyondHeading}
            </h3>
            <div className="mt-4 max-w-lg space-y-4 text-[0.95rem] leading-relaxed text-body md:text-[0.98rem]">
              {founder.beyondParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="split-media">
            <img
              src="/founder.jpg"
              alt="Prashant Kalal"
              width={1200}
              height={1600}
              className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
            />
            <div className="absolute right-0 bottom-8 z-20 w-[min(16rem,72%)] sm:bottom-10 sm:max-w-[18rem]">
              <p className="mb-4 pr-5 text-right text-[0.9rem] leading-snug text-ink italic md:text-[0.95rem]">
                “Because the right investment begins with the right questions”
              </p>
              <div className="bg-brand px-5 py-3 text-right">
                <p className="text-[0.95rem] font-semibold tracking-[0.12em] text-white uppercase">
                  Prashant
                  <br />
                  Kalal
                </p>
              </div>
              <div className="bg-plate px-5 py-1.5 text-right">
                <p className="text-[0.7rem] tracking-[0.14em] text-white">Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
