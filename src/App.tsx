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
import { PopUpModal } from "./components/PopUpModal"
import { Testimonials } from "./components/Testimonials"
import { Values } from "./components/Values"

export default function App() {
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
        <Contact />
      </main>
      <Footer />
      <BottomNav />
      <DraggableScrollTop />
      <PopUpModal />
    </>
  )
}
