
import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import SolutionGallery from "../components/SolutionGallery";
import { SLOGAN } from "../constants";

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section Dual-Facet - Responsivo para Mobile */}
      <section className="relative min-h-[100vh] lg:min-h-[90vh] flex flex-col lg:flex-row overflow-hidden border-b-8 border-dexDarkBlue">
        
        {/* Lado Esquerdo - DEX (Azul) */}
        <div className="h-1/2 lg:h-auto lg:w-1/2 bg-dexBlue relative flex flex-col justify-center items-center lg:items-end px-6 lg:px-10 lg:pr-32 py-20 lg:py-0">
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '100% 50px'
            }}
          ></div>
          
          <div className="relative z-10 text-center lg:text-right animate-fadeIn lg:-translate-y-20">
            <h1 className="text-7xl sm:text-8xl md:text-[13rem] font-black text-white tracking-tighter leading-none select-none drop-shadow-2xl">
              DEX
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl md:text-2xl font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] mt-2 opacity-90">
              DIAS EXPRESS
            </p>
          </div>
        </div>

        {/* Lado Direito - DIAS EXPRESS (Laranja) */}
        <div className="h-1/2 lg:h-auto lg:w-1/2 bg-dexOrange relative flex flex-col justify-center items-center lg:items-start px-6 lg:px-10 lg:pl-32 py-20 lg:py-0">
           <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
          ></div>

           <div className="relative z-10 text-center lg:text-left animate-fadeIn animation-delay-500 lg:-translate-y-20">
            <h1 className="text-5xl sm:text-6xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase select-none drop-shadow-2xl">
              DIAS<br/>EXPRESS
            </h1>
            <p className="text-orange-50 text-lg sm:text-xl md:text-2xl font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mt-4 drop-shadow-md opacity-90">
              SOLUÇÕES DOMÉSTICAS
            </p>
          </div>
        </div>

        {/* Quadro de Liderança - Adaptado para Mobile */}
        <div className="absolute inset-x-0 bottom-8 sm:bottom-12 lg:bottom-16 flex items-center justify-center z-30 px-4 sm:px-6">
          <div className="w-full max-w-lg animate-slideUp animation-delay-1000">
             <div className="bg-white/30 backdrop-blur-3xl p-6 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border border-white/20 flex flex-col items-center justify-center gap-6 group hover:scale-[1.02] transition-transform duration-500">
                <div className="text-center">
                  <span className="text-white/80 font-black text-[9px] tracking-[0.4em] uppercase mb-2 block">{SLOGAN}</span>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                    Conecte-se com a <span className="text-dexDarkBlue">Liderança</span>
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                  <Link to="/contact" className="bg-dexOrange text-white text-[10px] sm:text-xs font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center whitespace-nowrap tracking-widest uppercase animate-pulse">
                    Falar com o CEO
                  </Link>
                  <Link to="/services" className="bg-dexDarkBlue text-white text-[10px] sm:text-xs font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-black transition-all transform hover:scale-105 shadow-xl flex items-center justify-center whitespace-nowrap tracking-widest uppercase">
                    Ver Serviços
                  </Link>
                </div>
             </div>
          </div>
        </div>

        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 z-20"></div>
      </section>

      {/* Services Section */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-1 bg-dexOrange rounded-full"></span>
                <span className="text-dexBlue font-black text-xs uppercase tracking-[0.3em]">Ecossistema de Soluções</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-dexDarkBlue tracking-tight mb-4 leading-tight">DEX Intelligence</h2>
              <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed italic">"Transformando agilidade em confiança."</p>
            </div>
            <Link to="/services" className="bg-white text-dexBlue font-black px-6 py-3.5 rounded-xl hover:bg-dexBlue hover:text-white transition-all flex items-center group shadow-md border border-gray-100 text-xs sm:text-sm tracking-widest uppercase">
              EXPLORAR TUDO
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </div>
          <Carousel />
        </div>
      </section>

      {/* New Visual Gallery Section with Timeline */}
      <SolutionGallery />
    </div>
  );
};

export default Home;
