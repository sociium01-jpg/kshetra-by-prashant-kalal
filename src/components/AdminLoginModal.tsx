import { useState, type FormEvent } from "react"

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  if (!isOpen) return null

  function handleLogin(e: FormEvent) {
    e.preventDefault()
    // Default admin PIN / password
    if (password === "admin123" || password === "kshetra2026" || password === "admin") {
      sessionStorage.setItem("kpk_admin_auth", "true")
      setError(false)
      setPassword("")
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/30 bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray text-ink hover:bg-brand hover:text-white"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <h3 className="mt-3 text-xl font-bold text-ink">Admin Portal Access</h3>
          <p className="mt-1 text-xs text-body">
            Enter your owner passcode to manage leads, site content & AI settings.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
              Passcode
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter passcode..."
              className="mt-1.5 w-full rounded-xl border border-muted/30 bg-gray/50 px-4 py-2.5 text-sm text-ink outline-none focus:border-brand focus:bg-white"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-brand">
              Incorrect passcode. Please try again.
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 rounded-xl border border-muted/30 py-2.5 text-xs font-semibold text-body hover:bg-gray"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 rounded-xl bg-brand py-2.5 text-xs font-semibold text-white uppercase tracking-wider hover:bg-brand-dark transition-all shadow-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
