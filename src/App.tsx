/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Mapas from './pages/Mapas';
import DashboardCouple from './pages/DashboardCouple';
import DashboardVendor from './pages/DashboardVendor';
import About from './pages/About';
import Contact from './pages/Contact';
import ProvidersPublic from './pages/ProvidersPublic';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import DashboardAdmin from './pages/DashboardAdmin';
import ScrollToTop from './components/ui/ScrollToTop';
import { AuthProvider } from './components/AuthProvider';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen font-sans selection:bg-pink-100 selection:text-[#FF4D6D] relative overflow-hidden">
          {/* Global Romantic Decorative Gradients */}
          <div className="fixed top-0 right-0 w-[50vw] h-[50vw] bg-[#FF4D6D]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
          <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-[#FF4D6D]/3 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none z-0" />
          
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mapas" element={<Mapas />} />
              <Route path="/mi-boda" element={<DashboardCouple />} />
              <Route path="/panel-proveedor" element={<DashboardVendor />} />
              <Route path="/quienes-somos" element={<About />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/proveedores" element={<ProvidersPublic />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/terminos" element={<Terms />} />
              <Route path="/privacidad" element={<Privacy />} />
              <Route path="/admin" element={<DashboardAdmin />} />
              {/* Placeholder routes for other links */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </AuthProvider>
    </Router>
  );
}


