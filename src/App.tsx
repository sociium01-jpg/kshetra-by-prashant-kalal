import { About } from "./components/About"
import { ConsideredApproach } from "./components/ConsideredApproach"
import { Contact } from "./components/Contact"
import { Differentiator } from "./components/Differentiator"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { HowICanHelp } from "./components/HowICanHelp"
import { HowIWork } from "./components/HowIWork"
import { Insights } from "./components/Insights"
import { Pune } from "./components/Pune"

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ConsideredApproach />
        <About />
        <Differentiator />
        <HowICanHelp />
        <HowIWork />
        <Pune />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
