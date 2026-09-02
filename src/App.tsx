import { useState } from "react"
import { About } from "./components/About"
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

export default function App() {
  const [legalType, setLegalType] = useState<LegalType>(null)

  return (
    <>
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
      <Footer onOpenLegal={setLegalType} />
      <BottomNav />
      <DraggableScrollTop />
      <PopUpModal onOpenLegal={setLegalType} />
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />
    </>
  )
}
