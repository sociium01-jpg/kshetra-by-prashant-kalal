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
      alt="Kshetra By Prashant Kalal"
      className={`w-auto ${compact ? "h-9 max-w-[min(11.5rem,calc(100vw-5.5rem))] sm:h-11 sm:max-w-[14rem] md:h-12 md:max-w-[16rem]" : "h-12 sm:h-[3.25rem]"}`}
    />
  )
}
