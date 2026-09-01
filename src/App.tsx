import { About } from "./components/About"
import { ConsideredApproach } from "./components/ConsideredApproach"
import { Contact } from "./components/Contact"
import { Differentiator } from "./components/Differentiator"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { HowICanHelp } from "./components/HowICanHelp"
import { Insights } from "./components/Insights"
import { Testimonials } from "./components/Testimonials"

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ConsideredApproach />
        <About />
        <Differentiator />
        <Insights />
        <HowICanHelp />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
