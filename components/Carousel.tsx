import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";
import { SERVICES } from "../constants";
import "./carousel.css";

const Carousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Triple duplication for perfect seamless looping
  const carouselItems = [...SERVICES, ...SERVICES, ...SERVICES];

  useEffect(() => {
    const calculateWidth = () => {
      if (scrollRef.current && scrollRef.current.children.length > 0) {
        const container = scrollRef.current;
        const firstChild = container.children[0] as HTMLElement;
        
        if (firstChild) {
          const style = window.getComputedStyle(container);
          const gapValue = parseInt(style.gap) || 24;
          const itemWidth = firstChild.offsetWidth;
          // Calculate width of one full set of items
          const singleSetWidth = (itemWidth + gapValue) * SERVICES.length;
          
          setContentWidth(singleSetWidth);
          // Start at the second set to allow scrolling both ways (though we go RTL)
          container.scrollLeft = singleSetWidth;
          setIsInitialized(true);
        }
      }
    };

    // Delay slightly to ensure layout is ready
    const timer = setTimeout(calculateWidth, 100);
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
    const speed = 0.8; // Pixels per frame at 60fps

    const scroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (scrollRef.current && !isPaused) {
        // Move view right (items appear to move LEFT)
        scrollRef.current.scrollLeft += (speed * (elapsed / 16));
        
        // Loop reset logic
        if (scrollRef.current.scrollLeft >= contentWidth * 2) {
          scrollRef.current.scrollLeft = contentWidth;
        }
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, contentWidth, isInitialized]);

  return (
    <div 
      className="relative group w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        ref={scrollRef}
        className="carousel-container overflow-x-auto pb-10 pt-4 gap-6 md:gap-8 hide-scrollbar px-4 cursor-default"
        style={{ scrollBehavior: 'auto' }}
      >
        {carouselItems.map((s, index) => (
          <div 
            key={`${s.id}-${index}`} 
            className="carousel-item w-[300px] md:w-[360px] aspect-square"
          >
            <ServiceCard {...s} index={index % SERVICES.length} />
          </div>
        ))}
      </div>
      
      {/* Visual edge fades */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default Carousel;
