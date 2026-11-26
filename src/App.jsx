import { useInspect } from './hooks/useInspect';
import { useReveal } from './hooks/useReveal';
import { useTheme } from './hooks/useTheme';
import ErrorBoundary from './components/ui/ErrorBoundary';
import InspectOverlay from './components/ui/InspectOverlay';
import IndexRail from './components/ui/IndexRail';
import SkipLink from './components/layout/SkipLink';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Journey from './components/sections/Journey';
import TechStack from './components/sections/TechStack';
import Contact from './components/sections/Contact';

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { inspect, toggle: toggleInspect } = useInspect();
  useReveal();

  return (
    <ErrorBoundary>
      <SkipLink />
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        inspect={inspect}
        onToggleInspect={toggleInspect}
      />
      <IndexRail />
      <main id="content" className="page">
        <Hero />
        <About />
        <Projects />
        <Journey />
        <TechStack />
        <Contact />
      </main>
      <Footer />
      <InspectOverlay />
    </ErrorBoundary>
  );
}
