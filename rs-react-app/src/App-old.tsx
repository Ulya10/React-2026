import About from './components/About';
import NotFound from './components/NotFound';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import DetailsSection from './components/DetailsSection';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/1" replace />} />

      <Route path="/:page" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="details/:id" element={<Home />}>
          <Route index element={<DetailsSection />} />
        </Route>
      </Route>

      <Route path="/about" element={<About />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
