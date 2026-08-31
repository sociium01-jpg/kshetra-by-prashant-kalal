import { contact } from "../content/home"
import { Logo } from "./Logo"

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="bg-brand py-8 text-center">
        <div className="flex justify-center">
          <Logo invert />
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-center sm:px-5 md:grid-cols-3 md:px-8 md:text-left">
        <div>
          <p className="text-[0.7rem] tracking-[0.2em] text-brand uppercase">
            Prashant Kalal
          </p>
          <p className="mt-2 text-sm text-white/70">Real Estate Advisor</p>
          <p className="mt-1 text-sm text-white/70">Kshetra by Prashant Kalal</p>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.2em] text-white/50 uppercase">
            Contact
          </p>
          <a href={contact.phoneHref} className="mt-2 block text-sm hover:text-brand">
            {contact.phone}
          </a>
          <a href={contact.emailHref} className="mt-1 block text-sm break-all hover:text-brand">
            {contact.email}
          </a>
          <a
            href={contact.instagramHref}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block text-sm hover:text-brand"
          >
            Instagram: {contact.instagram}
          </a>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.2em] text-white/50 uppercase">
            MahaRERA
          </p>
          <p className="mt-2 text-sm text-white/80">No. {contact.rera}</p>
          <p className="mt-4 text-sm text-white/50">
            Helping clients make informed real estate decisions.
          </p>
        </div>
      </div>
    </footer>
  )
}
