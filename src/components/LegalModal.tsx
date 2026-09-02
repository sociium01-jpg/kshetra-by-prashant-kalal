import { useEffect } from "react"
import { contact } from "../content/home"

export type LegalType = "privacy" | "terms" | "accessibility" | null

interface LegalModalProps {
  type: LegalType
  onClose: () => void
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!type) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [type, onClose])

  if (!type) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/20 bg-charcoal p-6 text-white shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close document"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-brand hover:text-white"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Content Views */}
        {type === "privacy" && (
          <div className="space-y-4 text-sm leading-relaxed text-white/80">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[0.7rem] font-bold tracking-[0.14em] text-brand uppercase">
                Legal & Governance
              </span>
              <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
                Privacy Policy
              </h2>
              <p className="mt-1 text-xs text-white/50">
                Last updated: 2026 | Kshetra By Prashant Kalal (MahaRERA No. {contact.rera})
              </p>
            </div>

            <section className="space-y-2">
              <h3 className="font-semibold text-white">1. Information We Collect</h3>
              <p>
                When you interact with <strong>Kshetra By Prashant Kalal</strong> through our website forms, phone inquiries, or WhatsApp consultations, we collect personal information that you voluntarily provide. This includes your name, phone number, email address, and specific property requirements.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-white">2. How We Use Your Information</h3>
              <p>
                We use your details strictly for property advisory services, responding to your real estate inquiries, sharing tailored property evaluations, and scheduling consultations. Your information allows Prashant Kalal to provide personalized advice suited to your needs.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-white">3. Data Confidentiality & No Spam</h3>
              <p>
                We respect your privacy. Your contact details are never sold, rented, leased, or shared with third-party telemarketers. Information is handled confidentially in full compliance with MahaRERA regulatory norms and data protection guidelines.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-white">4. Your Data Rights</h3>
              <p>
                You retain complete control over your data. If you wish to update, verify, or request the complete deletion of your personal information from our advisory records, please contact us directly at <a href={contact.emailHref} className="text-brand underline">{contact.email}</a> or call <a href={contact.phoneHref} className="text-brand underline">{contact.phone}</a>.
              </p>
            </section>
          </div>
        )}

        {type === "terms" && (
          <div className="space-y-4 text-sm leading-relaxed text-white/80">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[0.7rem] font-bold tracking-[0.14em] text-brand uppercase">
                Legal & Advisory Terms
              </span>
              <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
                Terms & Conditions
              </h2>
              <p className="mt-1 text-xs text-white/50">
                Effective: 2026 | Kshetra By Prashant Kalal (MahaRERA No. {contact.rera})
              </p>
            </div>

            <section className="space-y-2">
              <h3 className="font-semibold text-white">1. Advisory Role Notice</h3>
              <p>
                <strong>Kshetra By Prashant Kalal</strong> is an independent real estate advisory practice operated by Prashant Kalal, a MahaRERA-certified real estate agent (MahaRERA Reg. No. {contact.rera}). The information provided on this website is for general informational and advisory guidance only and does not constitute a legal binding contract or financial guarantee.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-white">2. Independent Verification Recommended</h3>
              <p>
                While we strive to present accurate project details, location analyses, and market insights based on 13+ years of experience, property buyers and investors are strongly advised to independently inspect developments, review developer legal titles, and verify MahaRERA filings prior to financial commitment.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-white">3. Intellectual Property</h3>
              <p>
                All text, graphics, logos, brand elements, and written materials published on this website are the property of Kshetra By Prashant Kalal. Unauthorized duplication, redistribution, or commercial use without prior written consent is strictly prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-white">4. Jurisdiction</h3>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Pune, Maharashtra.
              </p>
            </section>
          </div>
        )}

        {type === "accessibility" && (
          <div className="space-y-4 text-sm leading-relaxed text-white/80">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[0.7rem] font-bold tracking-[0.14em] text-brand uppercase">
                Inclusion & Accessibility
              </span>
              <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
                Accessibility Statement
              </h2>
              <p className="mt-1 text-xs text-white/50">
                Commitment to Digital Universal Access | Kshetra By Prashant Kalal
              </p>
            </div>

            <section className="space-y-2">
              <h3 className="font-semibold text-white">1. Our Commitment</h3>
              <p>
                <strong>Kshetra By Prashant Kalal</strong> is committed to ensuring digital accessibility for all individuals, including people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards aligned with the Web Content Accessibility Guidelines (WCAG 2.1 Level AA).
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-white">2. Accessibility Features Enabled</h3>
              <ul className="list-disc space-y-1 pl-5 text-white/70">
                <li>High contrast color palette with clear typography for optimal legibility.</li>
                <li>Full keyboard navigation support across header menus, mobile docks, and interactive controls.</li>
                <li>ARIA labels and roles across modal dialogs, buttons, and navigation elements.</li>
                <li>Responsive font scaling and smooth layout reflow without horizontal scrolling.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-white">3. Feedback & Assistance</h3>
              <p>
                If you experience any difficulty accessing content or navigating any part of this website, please let us know. We welcome your feedback and are dedicated to providing accessible real estate advisory services:
              </p>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/80">
                <p><strong>Email:</strong> <a href={contact.emailHref} className="text-brand underline">{contact.email}</a></p>
                <p className="mt-1"><strong>Phone / WhatsApp:</strong> <a href={contact.phoneHref} className="text-brand underline">{contact.phone}</a></p>
              </div>
            </section>
          </div>
        )}

        <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  )
}
