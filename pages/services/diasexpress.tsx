import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DIASEXPRESS_CATEGORIES, COMPANY_WHATSAPP, COMPANY_EMAIL, SLOGAN } from "../../constants";
import RequestQuoteSection from "../../components/RequestQuoteSection";

const DiasexpressPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-dexOrange via-orange-500 to-dexOrange text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-white/80 font-black text-xs uppercase tracking-[0.5em] mb-6 animate-fadeIn">
              DEX DIASEXPRESS
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter animate-slideUp">
              SIMPLIFICANDO <br/>
              <span className="text-dexDarkBlue">SEU DIA</span>
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto font-light leading-relaxed animate-fadeIn animation-delay-300">
              {SLOGAN} através de serviços profissionais e confiáveis para sua casa e empresa.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* SERVICES DEXPRESSOS Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-dexBlue font-black text-xs uppercase tracking-[0.5em] mb-4 block">
            S E R V I Ç O S   D E X P R E S S O S
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-dexDarkBlue mb-6">
            DIASEXPRESS <span className="text-dexOrange">Soluções Domésticas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            SOLUÇÕES CORPORATIVAS & DOMÉSTICAS
          </p>
        </div>

        {/* Visão Geral */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gray-50 rounded-[3rem] p-12 border border-gray-100 shadow-xl">
            <h3 className="text-3xl font-black text-dexDarkBlue mb-6">Visão Geral do Serviço</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Conectamos você a profissionais qualificados para manutenção residencial, 
              garantindo segurança e o selo de qualidade DEX em cada tarefa do seu dia-a-dia.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-dexOrange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-dexOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-dexDarkBlue mb-2">Confiabilidade</h4>
                  <p className="text-sm text-gray-500">Profissionais verificados e com histórico de qualidade</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-dexOrange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-dexOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-dexDarkBlue mb-2">Eficiência</h4>
                  <p className="text-sm text-gray-500">Redução de tempo e custos através de processos otimizados</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categorias Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-dexDarkBlue text-center mb-12">
            Nossas <span className="text-dexOrange">Categorias</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DIASEXPRESS_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
              >
                <div 
                  className="p-8 cursor-pointer"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-3xl mb-2 block">{category.title.split(' ')[0]}</span>
                      <h4 className="text-xl font-black text-dexDarkBlue">
                        {category.title}
                      </h4>
                    </div>
                    <div className="bg-dexOrange/10 p-3 rounded-full">
                      <svg 
                        className={`w-5 h-5 text-dexOrange transition-transform duration-300 ${expandedCategories.includes(category.id) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-dexBlue uppercase tracking-wider">
                      {category.items.length} serviços disponíveis
                    </span>
                    <span className="text-dexOrange text-sm">
                      {expandedCategories.includes(category.id) ? 'Clique para recolher' : 'Clique para ver'}
                    </span>
                  </div>

                  {expandedCategories.includes(category.id) && (
                    <div className="mt-6 pt-6 border-t border-gray-100 animate-slideDown">
                      <ul className="grid grid-cols-1 gap-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-dexOrange mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inicie sua Via Expressa */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-dexBlue to-dexDarkBlue rounded-[3rem] p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black mb-6">
                Inicie sua Via Expressa
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Interessado em implementar este serviço? Nossa equipe está pronta para lhe atender.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href={`https://wa.me/${COMPANY_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dexOrange text-white font-black px-8 py-4 rounded-xl hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  WhatsApp
                </a>
                <a 
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="bg-white/10 backdrop-blur-sm text-white font-black px-8 py-4 rounded-xl hover:bg-white/20 transition-all border border-white/20 inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </div>

              {/* QR Code Placeholder (opcional) */}
              <div className="mt-8 flex justify-center">
                <div className="bg-white p-4 rounded-2xl inline-block">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center">
                    QR Code <br/> para acesso rápido
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RequestQuoteSection />
      </div>
    </div>
  );
};

export default DiasexpressPage;
