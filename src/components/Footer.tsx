import { contact } from "../content/home"

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="page-shell grid gap-8 py-12 text-center lg:grid-cols-3 lg:text-left">
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
    </footer>
  )
}
