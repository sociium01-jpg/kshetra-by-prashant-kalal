import { useEffect, useState } from "react"
import { About } from "./components/About"
import { AdminLoginModal } from "./components/AdminLoginModal"
import { AdminPortal } from "./components/AdminPortal"
import { BottomNav } from "./components/BottomNav"
import { ConsideredApproach } from "./components/ConsideredApproach"
import { Contact } from "./components/Contact"
import { Differentiator } from "./components/Differentiator"
import { DraggableScrollTop } from "./components/DraggableScrollTop"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { HowICanHelp } from "./components/HowICanHelp"
import { LegalModal, type LegalType } from "./components/LegalModal"
import { PopUpModal } from "./components/PopUpModal"
import { Testimonials } from "./components/Testimonials"
import { Values } from "./components/Values"
import { SiteProvider } from "./context/SiteContext"

export default function App() {
  const [legalType, setLegalType] = useState<LegalType>(null)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  useEffect(() => {
    // Hash route trigger: #admin or /admin
    const checkHash = () => {
      if (window.location.hash === "#admin" || window.location.pathname === "/admin") {
        handleOpenAdmin()
      }
    }
    checkHash()
    window.addEventListener("hashchange", checkHash)
    return () => window.removeEventListener("hashchange", checkHash)
  }, [])

  function handleOpenAdmin() {
    const isAuth = sessionStorage.getItem("kpk_admin_auth") === "true"
    if (isAuth) {
      setIsAdminOpen(true)
    } else {
      setIsLoginOpen(true)
    }
  }

  return (
    <SiteProvider>
      <Header />
      <main>
        <Hero />
        <ConsideredApproach />
        <About />
        <Differentiator />
        <Values />
        <HowICanHelp />
        <Testimonials />
        <Contact onOpenLegal={setLegalType} />
      </main>
      <Footer onOpenLegal={setLegalType} onOpenAdmin={handleOpenAdmin} />
      <BottomNav />
      <DraggableScrollTop />
      <PopUpModal onOpenLegal={setLegalType} />
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />
      <AdminLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={() => {
          setIsLoginOpen(false)
          setIsAdminOpen(true)
        }}
      />
      <AdminPortal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </SiteProvider>
  )
}
