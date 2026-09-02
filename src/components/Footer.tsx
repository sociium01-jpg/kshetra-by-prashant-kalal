import { contact } from "../content/home"
import { ActionHub } from "./ActionHub"
import { type LegalType } from "./LegalModal"

interface FooterProps {
  onOpenLegal?: (type: LegalType) => void
}

export function Footer({ onOpenLegal }: FooterProps) {
  return (
    <footer className="relative bg-charcoal text-white">
      <div className="page-shell py-12">
        <div className="grid gap-8 text-center lg:grid-cols-3 lg:text-left">
          <div>
            <p className="text-[0.7rem] tracking-[0.04em] text-brand uppercase">
              Prashant Kalal
            </p>
            <p className="mt-2 text-sm text-white/70">Kshetra By Prashant Kalal</p>
          </div>
          <div>
            <p className="text-[0.7rem] tracking-[0.04em] text-white/50 uppercase">
              Contact & Social
            </p>
            <a href={contact.phoneHref} className="mt-2 block text-sm transition-colors hover:text-brand">
              {contact.phone}
            </a>
            <a href={contact.emailHref} className="mt-1 block text-sm break-all transition-colors hover:text-brand">
              {contact.email}
            </a>
            <div className="mt-3 flex items-center justify-center gap-3.5 lg:justify-start">
              <a
                href={contact.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-white/80 transition-colors hover:text-brand"
              >
                <svg className="h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>
              <span className="text-white/30">•</span>
              <a
                href={contact.linkedinHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-white/80 transition-colors hover:text-brand"
              >
                <svg className="h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <div>
            <p className="text-[0.7rem] tracking-[0.04em] text-white/50 uppercase">
              MahaRERA
            </p>
            <p className="mt-2 text-sm text-white/80">No. {contact.rera}</p>
          </div>
        </div>

        {/* Legal Links Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/50 sm:justify-start">
          <button
            type="button"
            onClick={() => onOpenLegal?.("privacy")}
            className="transition-colors hover:text-brand"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenLegal?.("terms")}
            className="transition-colors hover:text-brand"
          >
            Terms & Conditions
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenLegal?.("accessibility")}
            className="transition-colors hover:text-brand"
          >
            Accessibility Statement
          </button>
        </div>

        {/* Copyright & Credit Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 pb-28 text-xs text-white/40 sm:flex-row lg:pb-0">
          <p>© {new Date().getFullYear()} Kshetra By Prashant Kalal. All rights reserved.</p>
          <p className="relative z-20 text-center pointer-events-auto sm:text-right">
            Website developed by{" "}
            <a
              href="https://sociium.in/"
              target="_blank"
              rel="noreferrer"
              className="relative z-20 inline-block font-medium text-white/50 no-underline transition-colors hover:text-brand pointer-events-auto"
            >
              Soc<span className="text-[#0077ff]">ii</span>um
            </a>
          </p>
        </div>
      </div>

      <ActionHub />
    </footer>
  )
}
