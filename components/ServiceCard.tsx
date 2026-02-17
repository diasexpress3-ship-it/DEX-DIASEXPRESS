
import React from "react";
import { Link } from "react-router-dom";
import { ServiceInfo } from "../types";

interface ServiceCardProps extends ServiceInfo {
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, color, link, index = 0 }) => {
  return (
    <div 
      className="flex flex-col h-full w-full p-8 rounded-3xl shadow-lg text-white transition-all transform hover:scale-[1.02] hover:shadow-2xl group border border-white/10 overflow-hidden relative" 
      style={{ 
        backgroundColor: color,
        animationDelay: `${index * 0.2}s`
      }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 bg-white bg-opacity-20 p-4 rounded-2xl inline-block w-14 h-14 flex items-center justify-center shadow-inner">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        
        {/* Text Area with Blue Background Hover Effect */}
        <div className="p-6 rounded-2xl transition-all duration-500 group-hover:bg-dexBlue group-hover:shadow-2xl">
          <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tighter leading-tight drop-shadow-md">{title}</h3>
          <p className="text-white text-opacity-80 mb-6 leading-snug font-medium text-sm md:text-base italic">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-6">
          <Link 
            to={link} 
            className="inline-flex items-center justify-center bg-white text-gray-900 font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-colors shadow-xl"
          >
            Saiba Mais
            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
