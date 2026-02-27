
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SERVICE_IMAGES } from "../constants";
import "./carousel.css";

const SolutionGallery: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [contentWidth, setContentWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Triple the items to create a safe buffer for seamless infinite scrolling
  const displayItems = [...SERVICE_IMAGES, ...SERVICE_IMAGES, ...SERVICE_IMAGES];

  useEffect(() => {
    const calculateWidth = () => {
      if (scrollRef.current && scrollRef.current.children.length > 0) {
        const container = scrollRef.current;
        const firstChild = container.children[0] as HTMLElement;
        
        if (firstChild) {
          const style = window.getComputedStyle(container);
          const gapValue = parseInt(style.gap) || 32;
          const itemWidth = firstChild.offsetWidth;
          const singleSetWidth = (itemWidth + gapValue) * SERVICE_IMAGES.length;
          
          setContentWidth(singleSetWidth);
          // Start at the first duplication for seamless loop
          container.scrollLeft = singleSetWidth;
          setIsInitialized(true);
        }
      }
    };

    const timer = setTimeout(calculateWidth, 150);
    window.addEventListener('resize', calculateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateWidth);
    };
  }, []);

  useEffect(() => {
    if (!isInitialized || contentWidth === 0) return;
    
    let animationFrameId: number;
    let lastTimestamp: number;
    const scrollSpeed = 0.85; // Faster, smoother movement

    const scroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (autoPlay && scrollRef.current && !isDragging) {
        // Implementation of Right-to-Left movement (incrementing scrollLeft)
        scrollRef.current.scrollLeft += (scrollSpeed * (elapsed / 16));
        
        // Seamless loop reset logic
        if (scrollRef.current.scrollLeft >= contentWidth * 2) {
          scrollRef.current.scrollLeft = contentWidth;
        }
        updateProgress();
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoPlay, isDragging, contentWidth, isInitialized]);

  const updateProgress = () => {
    if (!scrollRef.current || contentWidth === 0) return;
    const currentScroll = scrollRef.current.scrollLeft;
    const scrollInSet = (currentScroll % contentWidth);
    const progress = (scrollInSet / contentWidth) * 100;
    setScrollProgress(progress);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setAutoPlay(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      if (!isDragging) setAutoPlay(true);
    }, 2000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    updateProgress();
  };

  const getServiceLink = (serviceId: string) => {
    if (serviceId === "diasexpress") return "/services/diasexpress";
    return `/${serviceId}`;
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden select-none border-t border-gray-100">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-1.5 bg-dexOrange rounded-full"></span>
              <span className="text-dexBlue font-black text-xs uppercase tracking-[0.4em]">Soluções Inteligentes</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-dexDarkBlue tracking-tighter leading-none mb-6">
              Ecossistema <span className="text-dexOrange">DEX</span> Tech
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl italic border-l-4 border-dexBlue pl-6 leading-relaxed">
              "Transformando agilidade em confiança através de quadros inteligentes de alta performance."
            </p>
          </div>
        </div>
      </div>

      <div 
        className="relative w-full py-10"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => !isDragging && setAutoPlay(true)}
      >
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="carousel-container overflow-x-auto gap-10 px-6 md:px-24 pb-20 hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: 'auto' }}
        >
          {displayItems.map((item, idx) => (
            <Link 
              to={getServiceLink(item.service)}
              key={`${item.service}-${idx}`} 
              className={`carousel-item w-[80vw] sm:w-72 md:w-80 h-[400px] md:h-[500px] relative overflow-hidden rounded-[3rem] shadow-2xl group transition-all duration-700 animate-float-up-down`}
              style={{ 
                animationDelay: `${(idx % SERVICE_IMAGES.length) * 0.7}s`,
                animationDuration: `${5 + (idx % 3)}s` 
              }}
              draggable={false}
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-125 pointer-events-none"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dexDarkBlue via-dexDarkBlue/40 to-transparent opacity-90 group-hover:opacity-100 transition-all"></div>
              
              <div className="absolute top-6 left-6 z-20">
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl">
                    <svg className="w-6 h-6 text-dexOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                <span className="text-dexOrange font-black text-[10px] uppercase tracking-[0.5em] block mb-3 drop-shadow-sm">
                  DEX {item.service.toUpperCase()}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-black tracking-tighter leading-none mb-4 drop-shadow-md">
                  {item.title}
                </h3>
                <p className="text-blue-100/80 text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
                  {item.description}
                </p>
                <div className="mt-6 flex items-center text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 delay-100">
                   Acessar Solução 
                   <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Cinematic edge gradients */}
        <div className="absolute top-0 left-0 w-48 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
      </div>

      <div className="container mx-auto px-6 mt-10">
        <div className="max-w-4xl mx-auto px-10 py-12 bg-white rounded-[3.5rem] border border-gray-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-dexOrange"></div>
          <div className="w-full h-2 bg-gray-100 rounded-full relative overflow-hidden mb-6">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-dexBlue to-dexOrange transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[11px] font-black text-dexDarkBlue uppercase tracking-[0.3em] flex items-center gap-2">
               <span className="w-2 h-2 bg-dexOrange rounded-full animate-pulse"></span>
               Experiência Infinite DEX
            </span>
            <span className="text-[10px] font-bold text-gray-400 italic">Fluxo Inteligente: Direita para Esquerda</span>
            <div className="flex gap-2">
               <div className="w-8 h-1 bg-dexBlue rounded-full opacity-30"></div>
               <div className="w-8 h-1 bg-dexOrange rounded-full"></div>
               <div className="w-8 h-1 bg-dexBlue rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionGallery;
