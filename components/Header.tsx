
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        <div className="flex items-center gap-2">
          {!isHome && (
            <button 
              onClick={() => navigate(-1)}
              className="mr-2 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-all text-dexBlue group focus:outline-none"
              aria-label="Voltar para página anterior"
            >
              <svg 
                className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <Link to="/" className="flex items-center group">
            <div className="flex flex-col">
              <div className="text-2xl font-black tracking-tighter leading-none">
                <span className="text-dexOrange">DEX</span>
                <span className="text-gray-300 mx-1">|</span>
                <span className="text-dexOrange uppercase">Dias</span>
                <span className="text-dexBlue uppercase">Express</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mt-1">Simplificando Seu Dia</span>
            </div>
          </Link>
        </div>

        <button 
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" />
            ) : (
              <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
            )}
          </svg>
        </button>

        <nav className="space-x-8 hidden md:flex items-center">
          <Link to="/" className="text-gray-700 font-bold text-sm hover:text-dexOrange transition-colors tracking-tight">INÍCIO</Link>
          <Link to="/about" className="text-gray-700 font-bold text-sm hover:text-dexOrange transition-colors tracking-tight">SOBRE</Link>
          <div className="relative group">
            <button className="text-gray-700 font-bold text-sm hover:text-dexOrange flex items-center transition-colors tracking-tight">
              SERVIÇOS
              <svg className="ml-1 h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-2xl mt-0 pt-4 py-2 rounded-xl border border-gray-100 min-w-[320px] animate-fadeIn">
              <Link to="/services/diasexpress" className="block px-6 py-4 hover:bg-gray-50 text-gray-800 font-black text-xs hover:text-dexOrange transition-colors border-b last:border-0 uppercase tracking-widest">DIASEXPRESS SOLUÇÕES DOMÉSTICAS</Link>
              <Link to="/aquamanager" className="block px-6 py-4 hover:bg-sky-50 text-gray-800 font-black text-xs hover:text-sky-500 transition-colors border-b last:border-0 uppercase tracking-widest text-sky-600">Nexus Aqua Manager (Água)</Link>
              <Link to="/gastromanager" className="block px-6 py-4 hover:bg-gray-50 text-gray-800 font-black text-xs hover:text-dexBlue transition-colors border-b last:border-0 uppercase tracking-widest text-dexDarkBlue">DEX GastroManager (Bares/Rest)</Link>
              <Link to="/inviteexpress" className="block px-6 py-4 hover:bg-gray-50 text-gray-800 font-black text-xs hover:text-dexGreen transition-colors uppercase tracking-widest">InviteExpress</Link>
            </div>
          </div>
          <Link to="/partners" className="text-gray-700 font-bold text-sm hover:text-dexOrange transition-colors tracking-tight">PARCEIROS</Link>
          <Link to="/contact" className="bg-dexOrange text-white px-6 py-2.5 rounded-lg font-black text-xs tracking-widest hover:bg-dexBlue transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20">CONTATO</Link>
        </nav>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fadeIn">
          <nav className="flex flex-col p-6 space-y-4 font-bold text-gray-700">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-dexOrange">INÍCIO</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-dexOrange">SOBRE</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)} className="hover:text-dexOrange">SERVIÇOS</Link>
            <Link to="/partners" onClick={() => setIsMenuOpen(false)} className="hover:text-dexOrange">PARCEIROS</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-dexOrange">CONTATO</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
