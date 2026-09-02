import { contact } from "../content/home"
import { ActionHub } from "./ActionHub"

export function Footer() {
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
              Contact
            </p>
            <a href={contact.phoneHref} className="mt-2 block text-sm transition-colors hover:text-brand">
              {contact.phone}
            </a>
            <a href={contact.emailHref} className="mt-1 block text-sm break-all transition-colors hover:text-brand">
              {contact.email}
            </a>
            <a
              href={contact.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block text-sm transition-colors hover:text-brand"
            >
              {contact.instagram}
            </a>
          </div>
          <div>
            <p className="text-[0.7rem] tracking-[0.04em] text-white/50 uppercase">
              MahaRERA
            </p>
            <p className="mt-2 text-sm text-white/80">No. {contact.rera}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Kshetra By Prashant Kalal. All rights reserved.
          </p>
        </div>
      </div>

      <ActionHub />
    </footer>
  )
}
