import React, { useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import RequestQuoteSection from "../components/RequestQuoteSection";
import { SERVICES, DIASEXPRESS_CATEGORIES, COMPANY_WHATSAPP, COMPANY_EMAIL } from "../constants";

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = (serviceId: string) => {
    if (activeService === serviceId) {
      setActiveService(null);
      setShowCategories(false);
    } else {
      setActiveService(serviceId);
      setShowCategories(true);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-dexDarkBlue via-dexBlue to-dexDarkBlue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-24 md:py-32 text-center">
          <span className="inline-block text-dexOrange font-black text-xs uppercase tracking-[0.5em] mb-6 animate-fadeIn">
            SOLUÇÕES DEX
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter animate-slideUp">
            Serviços que <br/>
            <span className="text-dexOrange">simplificam seu dia</span>
          </h1>
          <p className="text-xl text-blue-100/90 max-w-3xl mx-auto font-light leading-relaxed animate-fadeIn animation-delay-300">
            Descubra um ecossistema completo de soluções digitais e serviços profissionais, 
            desenhados para maximizar sua produtividade e tranquilidade em Moçambique.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-12 animate-fadeIn animation-delay-500">
            <a 
              href={`https://wa.me/${COMPANY_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dexOrange text-white font-black px-8 py-4 rounded-xl hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl text-sm uppercase tracking-widest"
            >
              Solicitar Orçamento
            </a>
            <Link 
              to="/contact"
              className="bg-white/10 backdrop-blur-sm text-white font-black px-8 py-4 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20 text-sm uppercase tracking-widest"
            >
              Falar com Consultor
            </Link>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Main Services Grid */}
      <div className="container mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className="transform transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div 
                className="bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer group"
                onClick={() => toggleCategories(service.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <span className="text-dexOrange font-black text-xs uppercase tracking-widest">
                      {service.id === 'diasexpress' ? 'MAIS DE 30 CATEGORIAS' : 'TECNOLOGIA DEX'}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl md:text-3xl font-black text-dexDarkBlue tracking-tight">
                      {service.title}
                    </h2>
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: service.color }}
                    >
                      {service.id === 'diasexpress' ? '🏠' : 
                       service.id === 'aquamanager' ? '💧' :
                       service.id === 'gastromanager' ? '🍽️' : '💌'}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.fullDescription || service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Link 
                      to={service.link}
                      className="text-dexBlue font-black text-sm uppercase tracking-widest hover:text-dexOrange transition-colors flex items-center gap-2 group/link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Saber mais
                      <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    {service.categories && (
                      <button 
                        className="text-sm text-gray-400 hover:text-dexOrange transition-colors flex items-center gap-1"
                        onClick={(e) => { e.stopPropagation(); toggleCategories(service.id); }}
                      >
                        <span>{activeService === service.id ? 'Ocultar' : 'Ver'} categorias</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-300 ${activeService === service.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Categorias detalhadas da DIASEXPRESS */}
              {service.id === 'diasexpress' && activeService === 'diasexpress' && (
                <div className="mt-4 bg-white rounded-3xl shadow-xl overflow-hidden animate-slideDown">
                  <div className="bg-gradient-to-r from-dexOrange to-orange-600 p-6 text-white">
                    <h3 className="text-2xl font-black mb-2">📋 Todas as Categorias</h3>
                    <p className="text-orange-100">Mais de 30 serviços profissionais para sua casa e empresa</p>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {DIASEXPRESS_CATEGORIES.map((category) => (
                        <div key={category.id} className="group">
                          <h4 className="text-xl font-black text-dexDarkBlue mb-3 flex items-center gap-2">
                            <span className="text-2xl">{category.title.split(' ')[0]}</span>
                            <span>{category.title.replace(/^[^\s]+\s/, '')}</span>
                          </h4>
                          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                            {category.description}
                          </p>
                          <ul className="space-y-2">
                            {category.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-dexOrange transition-colors">
                                <span className="text-dexOrange mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                          <h5 className="font-black text-dexDarkBlue mb-2">Precisa de um serviço específico?</h5>
                          <p className="text-sm text-gray-500">Fale connosco e encontraremos o profissional ideal</p>
                        </div>
                        <a 
                          href={`https://wa.me/${COMPANY_WHATSAPP}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-dexOrange text-white font-black px-6 py-3 rounded-xl hover:bg-orange-600 transition-all text-sm uppercase tracking-widest whitespace-nowrap"
                        >
                          Solicitar via WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl md:text-4xl font-black text-dexOrange mb-2">30+</div>
            <div className="text-sm text-gray-600 font-medium">Categorias de Serviços</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl md:text-4xl font-black text-dexBlue mb-2">100+</div>
            <div className="text-sm text-gray-600 font-medium">Profissionais Verificados</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl md:text-4xl font-black text-dexGreen mb-2">4</div>
            <div className="text-sm text-gray-600 font-medium">Plataformas Digitais</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl md:text-4xl font-black text-dexDarkBlue mb-2">24/7</div>
            <div className="text-sm text-gray-600 font-medium">Suporte ao Cliente</div>
          </div>
        </div>

        {/* Request Quote Section */}
        <RequestQuoteSection />
      </div>
    </div>
  );
};

export default Services;
