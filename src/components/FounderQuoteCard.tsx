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
      className={`founder-artboard relative w-full overflow-hidden bg-white ${className}`}
      style={
        {
          containerType: "inline-size",
          aspectRatio: "1600 / 2000",
        } as React.CSSProperties
      }
    >
      {/* Background Panels */}
      <div
        className="absolute inset-y-0"
        style={{
          left: "39.0625%",
          right: "3.875%",
          backgroundColor: accent,
        }}
      />
      <div
        className="absolute inset-y-0 right-0"
        style={{
          width: "3.875%",
          backgroundColor: "#727271",
        }}
      />

      {/* Quote Copy */}
      <blockquote
        className="absolute font-sans font-normal text-right text-white z-[1]"
        style={{
          top: "2.53125cqw",
          right: "6.5cqw",
          fontSize: "5.35625cqw",
          lineHeight: "5.8125cqw",
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
        className="absolute z-[1]"
        role="presentation"
        style={{
          top: "27.0625cqw",
          right: "6.5cqw",
          width: "16.3125cqw",
          height: "0.375cqw",
          backgroundColor: "#F6AD85",
        }}
      />

      {/* Name & Role */}
      <figcaption className="z-[1]">
        <div
          className="absolute font-sans font-semibold text-right text-white"
          style={{
            top: "29.6875cqw",
            right: "6.5cqw",
            fontSize: "5.98125cqw",
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
          className="absolute font-sans font-semibold text-right"
          style={{
            top: "43.3125cqw",
            right: "6.5cqw",
            fontSize: "3.375cqw",
            lineHeight: "3.375cqw",
            letterSpacing: "0.06em",
            color: "#434242",
          }}
        >
          {role}
        </div>
      </figcaption>

      {/* Transparent Cut-out Portrait Layered ABOVE Panels */}
      <img
        src={photo}
        alt={`${nameAlt}, ${role}`}
        className="absolute z-[2] select-none pointer-events-none"
        style={{
          left: "5.3125%",
          top: "6.05%",
          width: "73.6875%",
          height: "auto",
        }}
      />
    </figure>
  )
}
