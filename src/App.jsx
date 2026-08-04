import { useCallback, useState } from 'react';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import WhyClearfield from './components/WhyClearfield';
import ClientMarquee from './components/ClientMarquee';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [ready, setReady] = useState(false);
  const onLoaderDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader onDone={onLoaderDone} />
      <ScrollProgress />
      <CustomCursor />

      <Nav />

      <main style={{ padding: '0 var(--page-x)' }}>
        <Hero ready={ready} />
        <About />
        <Services />
        <Projects />
        <WhyClearfield />
        <ClientMarquee />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
