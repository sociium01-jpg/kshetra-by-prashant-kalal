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
      className={`w-auto ${compact ? "h-8 md:h-9" : "h-12"}`}
    />
  )
}
