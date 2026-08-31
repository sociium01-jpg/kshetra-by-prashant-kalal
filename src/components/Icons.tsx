import type { ReactNode } from "react"

type IconProps = { className?: string }

function Svg({ className = "", children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function IconHome({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6.5 10.5V20h11V10.5" />
    </Svg>
  )
}

export function IconBuilding({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 20V6h9v14" />
      <path d="M14 10h5v10" />
      <path d="M8 9h3M8 13h3M8 17h3" />
    </Svg>
  )
}

export function IconCompass({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.2 4.4-4.4 1.2 1.2-4.4z" />
    </Svg>
  )
}

export function IconChart({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 19h16" />
      <path d="M7 16v-5M12 16V8M17 16v-8" />
    </Svg>
  )
}

export function IconListen({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <path d="M8 12a4 4 0 0 1 8 0" />
      <circle cx="12" cy="16" r="1.4" />
    </Svg>
  )
}

export function IconSearch({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </Svg>
  )
}

export function IconCompare({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M8 5v14M16 5v14" />
      <path d="M5 9h6M13 15h6" />
    </Svg>
  )
}

export function IconAdvise({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 18V7.5A2.5 2.5 0 0 1 7.5 5H16a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H9z" />
      <path d="M8 9h7M8 12h5" />
    </Svg>
  )
}

export function IconDecide({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 13.5 9.5 18 19 7" />
    </Svg>
  )
}

export const helpIcons = {
  home: IconHome,
  building: IconBuilding,
  compass: IconCompass,
  chart: IconChart,
} as const

export const workIcons = {
  listen: IconListen,
  search: IconSearch,
  compare: IconCompare,
  advise: IconAdvise,
  decide: IconDecide,
} as const
