import { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import RouteScroll from './components/RouteScroll';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  const [ready, setReady] = useState(false);
  const onLoaderDone = useCallback(() => setReady(true), []);

  return (
    <>
      {/* Unmounted once the curtain has lifted — it has nothing left to do. */}
      {!ready && <Preloader onDone={onLoaderDone} />}
      <ScrollProgress />
      <CustomCursor />
      <RouteScroll />

      <Nav />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<ProjectDetail />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}
