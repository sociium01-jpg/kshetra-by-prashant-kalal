export function ConsideredApproach() {
  return (
    <section id="why" className="grid w-full overflow-hidden lg:grid-cols-2">
      <div className="relative min-h-[320px] overflow-hidden bg-ink sm:min-h-[420px] lg:min-h-[560px]">
        <img
          src="/kshetra-cityscape.jpg"
          alt="Pune cityscape"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-0 flex items-end p-6 sm:p-10 md:p-12">
          <div className="flex max-w-lg items-stretch gap-4">
            <span className="w-[3px] shrink-0 bg-brand" aria-hidden="true" />
            <h2 className="text-[1.35rem] leading-[1.2] font-semibold tracking-[0.06em] text-white uppercase sm:text-[1.75rem] md:text-[2.05rem]">
              Real estate, with
              <br />
              a more considered
              <br />
              approach.
            </h2>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-center bg-gray px-5 py-12 sm:px-10 md:px-14 lg:px-16">
        <h2 className="text-[1.35rem] font-medium tracking-[0.12em] text-brand uppercase md:text-[1.7rem]">
          What is Kshetra?
        </h2>
        <div className="mt-7 max-w-lg space-y-5 text-[0.95rem] leading-relaxed text-body md:text-[0.98rem]">
          <p>
            Kshetra is a real estate consultancy built on deep experience across
            Pune’s evolving real estate landscape.
          </p>
          <p>
            We believe real estate decisions go beyond finding a property. They
            require understanding the market, evaluating opportunities and
            risks, and choosing what truly makes sense for you, today and in the
            future.
          </p>
          <p>
            With a personal, transparent and consultative approach, KSHETRA by
            Prashant Kalal helps you navigate real estate with greater clarity
            and confidence.
          </p>
          <p>
            Because real estate isn’t just about finding a property. It’s about
            making the right choice.
          </p>
        </div>
      </div>
    </section>
  )
}
