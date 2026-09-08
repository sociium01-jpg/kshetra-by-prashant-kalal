import React from "react"

export interface FounderQuoteCardProps {
  quoteLines?: string[]
  name?: string[]
  role?: string
  photo?: string
  accent?: string
  className?: string
}

export function FounderQuoteCard({
  quoteLines = [
    "Because the right",
    "INVESTMENT begins",
    "with the right",
    "QUESTIONS.",
  ],
  name = ["PRASHANT", "KALAL"],
  role = "FOUNDER",
  photo = "/founder-cutout.png",
  accent = "#EF7F1A",
  className = "",
}: FounderQuoteCardProps) {
  const nameAlt = Array.isArray(name) ? name.join(" ") : name

  return (
    <figure
      className={`founder-artboard card relative w-full overflow-hidden bg-white ${className}`}
      style={
        {
          containerType: "inline-size",
          aspectRatio: "1600 / 2000",
        } as React.CSSProperties
      }
    >
      {/* Background Panels */}
      <div
        className="panel panel--orange absolute inset-y-0"
        style={{
          left: "39.0625%",
          right: "3.875%",
          backgroundColor: accent,
        }}
      />
      <div
        className="panel panel--grey absolute inset-y-0 right-0"
        style={{
          width: "3.875%",
          backgroundColor: "#727271",
        }}
      />

      {/* Quote Copy */}
      <blockquote
        className="copy quote absolute font-sans font-normal text-right text-white z-[1]"
        style={{
          top: "2.53cqw",
          right: "6.5cqw",
          fontSize: "5.36cqw",
          lineHeight: "5.81cqw",
          letterSpacing: "-0.005em",
        }}
      >
        {quoteLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {idx === 0 ? "“" : ""}
            {line}
            {idx === quoteLines.length - 1 ? "”" : ""}
            {idx < quoteLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </blockquote>

      {/* Accent Rule */}
      <div
        className="rule absolute z-[1]"
        role="presentation"
        style={{
          top: "27.06cqw",
          right: "6.5cqw",
          width: "16.31cqw",
          height: "0.38cqw",
          backgroundColor: "#F6AD85",
        }}
      />

      {/* Name & Role */}
      <figcaption>
        <div
          className="copy name absolute font-sans font-semibold text-right text-white z-[1]"
          style={{
            top: "29.72cqw",
            right: "6.5cqw",
            fontSize: "5.98cqw",
            lineHeight: "6.5cqw",
            letterSpacing: "0.005em",
          }}
        >
          {Array.isArray(name) ? (
            name.map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i < name.length - 1 && <br />}
              </React.Fragment>
            ))
          ) : (
            name
          )}
        </div>

        <div
          className="copy role absolute font-sans font-semibold text-right z-[1]"
          style={{
            top: "43.3cqw",
            right: "6.5cqw",
            fontSize: "3.39cqw",
            lineHeight: "3.39cqw",
            letterSpacing: "0.06em",
            color: "#434242",
          }}
        >
          {role}
        </div>
      </figcaption>

      {/* Transparent Cut-out Portrait Layered ABOVE Panels */}
      <img
        src={`${photo}?v=2`}
        alt={`${nameAlt}, ${role.toLowerCase()}`}
        className="portrait absolute z-[2] select-none pointer-events-none"
        style={{
          left: "1%",
          bottom: "0px",
          width: "84%",
          maxHeight: "95%",
          objectFit: "contain",
          objectPosition: "bottom left",
        }}
      />
    </figure>
  )
}
