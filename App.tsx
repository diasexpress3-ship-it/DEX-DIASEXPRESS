import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import InviteExpress from "./pages/InviteExpress";
import BarRestManagement from "./pages/BarRestManagement";
import WaterManagement from "./pages/WaterManagement";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import AIAssistant from "./components/AIAssistant";

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/inviteexpress" element={<InviteExpress />} />
            <Route path="/gastromanager" element={<BarRestManagement />} />
            <Route path="/aquamanager" element={<WaterManagement />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all for 404s */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <AIAssistant />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
