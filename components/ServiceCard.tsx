import React from "react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  link: string;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  id,
  title, 
  description, 
  color, 
  link, 
  index = 0
}) => {
  return (
    <div 
      className="flex flex-col h-full w-full p-6 md:p-8 rounded-3xl shadow-lg text-white transition-all transform hover:scale-[1.02] hover:shadow-2xl group border border-white/10 overflow-hidden relative" 
      style={{ 
        backgroundColor: color,
        animationDelay: `${index * 0.2}s`
      }}
    >
      {/* Overlay sutil para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Ícone no topo */}
        <div className="mb-4 md:mb-6 bg-white bg-opacity-20 p-3 md:p-4 rounded-2xl inline-block w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-inner">
          <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        
        {/* Área de texto com altura flexível */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-3 tracking-tighter leading-tight drop-shadow-md line-clamp-2">
            {title}
          </h3>
          <p className="text-white text-opacity-90 text-sm md:text-base leading-relaxed mb-4 md:mb-6 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Botão Saiba Mais - sempre visível e bem posicionado */}
        <div className="mt-auto pt-2">
          <Link 
            to={link} 
            className="inline-flex items-center justify-center bg-white text-gray-900 font-black text-xs uppercase tracking-widest px-4 md:px-6 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-xl w-full md:w-auto group/btn"
          >
            <span>Saiba Mais</span>
            <svg className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
