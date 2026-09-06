import { Route, Routes } from 'react-router-dom';
import RouteScroll from './components/RouteScroll';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (
    <>
      <RouteScroll />

      <Nav />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<ProjectDetail />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}
