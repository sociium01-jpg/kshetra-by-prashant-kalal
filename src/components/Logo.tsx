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
      className={`w-auto ${compact ? "h-7 max-w-[9.5rem] sm:h-8 sm:max-w-[11rem] md:h-9 md:max-w-none" : "h-10 sm:h-12"}`}
    />
  )
}
