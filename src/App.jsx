import { useTheme } from './hooks/useTheme';
import ErrorBoundary from './components/ui/ErrorBoundary';
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

  return (
    <ErrorBoundary>
      <SkipLink />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="content" className="page">
        <Hero />
        <About />
        <Projects />
        <Journey />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
