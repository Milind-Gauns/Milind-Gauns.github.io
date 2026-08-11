import LoadingIntro from "@/components/LoadingIntro";
import CommandPalette from "@/components/CommandPalette";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import TourSection from "@/components/TourSection";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import OffTheClock from "@/components/OffTheClock";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <LoadingIntro />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[110] focus:rounded focus:bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
      >
        skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <TourSection />
        <Work />
        <Projects />
        <Skills />
        <OffTheClock />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
