export function Logo({
  compact = false,
  invert = false,
}: {
  compact?: boolean
  invert?: boolean
}) {
  return (
    <img
      src={invert ? "/logo-white.png" : "/logo-orange.png"}
      alt="Kshetra by Prashant Kalal"
      className={`w-auto ${compact ? "h-10 max-w-[12rem] sm:h-11 sm:max-w-[14rem] md:h-12 md:max-w-none" : "h-12 sm:h-[3.25rem]"}`}
    />
  )
}
