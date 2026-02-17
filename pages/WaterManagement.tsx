
import React from "react";
import { Link } from "react-router-dom";
import RequestQuoteSection from "../components/RequestQuoteSection";

const WaterManagement: React.FC = () => {
  const resourceItems = [
    { 
        title: "Captura via Imagem", 
        desc: "Registro de consumo baseado em fotos com OCR inteligente para auditoria e precisão total.", 
        icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    },
    { 
        title: "Monitoramento Real-time", 
        desc: "Acompanhamento instantâneo do fluxo de consumo e status da rede hídrica.", 
        icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    { 
        title: "Gestão de Exclusões", 
        desc: "Controle eficiente de cortes e exclusões baseados em dados reais de adimplência.", 
        icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
    },
    { 
        title: "Faturamento Automático", 
        desc: "Cálculo instantâneo de faturas com base em tabelas parametrizadas e leituras visuais.", 
        icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    },
    { 
        title: "Painel Admin & PWA", 
        desc: "Dashboards consolidados e acessibilidade total sem necessidade de download.", 
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    },
    { 
        title: "Ordens de Serviço", 
        desc: "Gestão técnica de manutenções e novas ligações em tempo real.", 
        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-sky-500 py-32 text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 50 Q 25 25, 50 50 T 100 50 L 100 100 L 0 100 Z" fill="white" />
            </svg>
         </div>
         
         <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
           <span className="inline-block bg-white text-sky-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">Inovação em Recursos Hídricos</span>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
             Nexus Aqua Manager
           </h1>
           <p className="text-xl md:text-2xl text-sky-50 max-w-2xl mx-auto font-light leading-relaxed">
             Plataforma de última geração para exclusão, monitoramento em tempo real e captura de consumo baseada em imagens.
           </p>
         </div>
      </section>

      <div className="container mx-auto py-24 px-6">
        {/* Features Grid */}
        <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-tight">Potência Operacional Nexus</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {resourceItems.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-sky-50 p-8 rounded-3xl border border-sky-100 shadow-sm animate-pulse-zoom group"
              style={{ animationDelay: `${idx * 0.4}s` }}
            >
               <div className="w-14 h-14 bg-sky-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/></svg>
               </div>
               <h4 className="text-xl font-black mb-2 tracking-tight">{item.title}</h4>
               <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Technical Detail Section */}
        <div className="bg-dexDarkBlue rounded-[3rem] p-12 md:p-20 text-white shadow-3xl overflow-hidden relative mb-24">
           <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500 opacity-10 rounded-full -mr-32 -mt-32"></div>
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <span className="text-sky-400 font-black text-xs uppercase tracking-widest mb-4 block">Captura Inteligente</span>
                 <h3 className="text-4xl font-black mb-8 tracking-tighter">Imagens que geram faturamento real.</h3>
                 <div className="space-y-8">
                    <div className="flex items-start gap-4">
                       <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                       </div>
                       <div>
                          <p className="font-bold text-lg">OCR de Alta Precisão</p>
                          <p className="text-sky-200/60">Leitura automática de hidrômetros através de fotos capturadas em campo pelo smartphone.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                       </div>
                       <div>
                          <p className="font-bold text-lg">Monitoramento Nexus 24/7</p>
                          <p className="text-sky-200/60">Visibilidade total sobre o consumo da rede com alertas de anomalias em tempo real.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="bg-sky-500 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center shadow-2xl">
                 <h4 className="text-3xl font-black mb-6">Controle de Exclusões</h4>
                 <p className="text-sky-50 text-lg mb-8 font-light leading-relaxed">Gestão centralizada de cortes e suspensões com logs de auditoria visual integrados.</p>
                 <Link to="/contact" className="bg-white text-sky-600 font-black px-10 py-4 rounded-2xl hover:bg-sky-50 transition-all shadow-xl">Solicitar Demo Nexus</Link>
              </div>
           </div>
        </div>

        <RequestQuoteSection serviceName="Nexus Aqua Manager" />
      </div>
    </div>
  );
};

export default WaterManagement;
