
import React from "react";
import { Link } from "react-router-dom";

interface RequestQuoteSectionProps {
  serviceName?: string;
}

const RequestQuoteSection: React.FC<RequestQuoteSectionProps> = ({ serviceName }) => {
  return (
    <div className="mt-20 bg-dexBlue rounded-3xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl animate-zoom-out border border-white/10 relative overflow-hidden group">
      {/* Decorative gradient flare */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      
      <div className="max-w-xl relative z-10 text-center md:text-left">
        <h3 className="text-3xl md:text-4xl font-black mb-5 tracking-tight leading-tight">
          Precisa de uma Solução sob Medida?
        </h3>
        <p className="text-blue-100 text-lg md:text-xl font-light leading-relaxed">
          Nossa equipe de consultoria está pronta para desenvolver projetos específicos para sua empresa ou residência{serviceName ? ` focados em ${serviceName}` : ""}.
        </p>
      </div>
      
      <Link 
        to={`/contact${serviceName ? `?service=${encodeURIComponent(serviceName)}` : ""}`}
        className="relative z-10 bg-dexOrange hover:bg-orange-600 text-white font-black py-5 px-12 rounded-2xl transition-all shadow-xl shadow-orange-900/20 whitespace-nowrap transform hover:scale-105 active:scale-95 flex items-center gap-3 group/btn"
      >
        Solicitar Orçamento
        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
};

export default RequestQuoteSection;