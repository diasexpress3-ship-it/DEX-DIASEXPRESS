
import React from "react";
import { Link } from "react-router-dom";
import RequestQuoteSection from "../components/RequestQuoteSection";

const BarRestManagement: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-dexDarkBlue py-32 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <span className="inline-block bg-dexOrange text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 animate-fadeIn">Controle Total na Palma da Mão</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
            Gestão Inteligente para<br/><span className="text-dexOrange">Bares & Restaurantes</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
            Monitore tendências, gerencie sua equipe e visualize lucros em tempo real com o ecossistema <strong>DEX GastroManager</strong>.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-24 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {/* Card 1: Tendências em Tempo Real */}
          <div 
            className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition-all group animate-float-slow"
            style={{ animationDelay: '0s' }}
          >
             <div className="w-16 h-16 bg-dexBlue text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
             </div>
             <h4 className="text-2xl font-black mb-4 tracking-tight">Tendências em Tempo Real</h4>
             <p className="text-gray-500 leading-relaxed">Acompanhe de qualquer lugar do mundo o fluxo de vendas e o comportamento do seu negócio conforme acontece.</p>
          </div>

          {/* Card 2: QR Code por Produto */}
          <div 
            className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition-all group animate-float-slow"
            style={{ animationDelay: '1s' }}
          >
             <div className="w-16 h-16 bg-dexOrange text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 002 2z"/></svg>
             </div>
             <h4 className="text-2xl font-black mb-4 tracking-tight">QR Code por Produto</h4>
             <p className="text-gray-500 leading-relaxed">Cada item vendido gera um código único para controle de estoque, rastreabilidade e segurança total no ponto de venda.</p>
          </div>

          {/* Card 3: Resultado Instantâneo */}
          <div 
            className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition-all group animate-float-slow"
            style={{ animationDelay: '2s' }}
          >
             <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
             </div>
             <h4 className="text-2xl font-black mb-4 tracking-tight">Resultado Instantâneo</h4>
             <p className="text-gray-500 leading-relaxed">Fechamento financeiro automatizado: o lucro é calculado no momento exato em que o serviço é entregue ao cliente.</p>
          </div>

          {/* Card 4: Gestão de Colaboradores */}
          <div 
            className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition-all group lg:col-span-2 animate-float-slow"
            style={{ animationDelay: '3s' }}
          >
             <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 bg-gray-900 text-white rounded-3xl flex items-center justify-center flex-shrink-0 shadow-xl">
                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </div>
                <div>
                   <h4 className="text-2xl font-black mb-2 tracking-tight">Gestão de Colaboradores</h4>
                   <p className="text-gray-500">Controle quem está autorizado a vender. Monitore a performance individual e identifique qual atendente ou serviço gera maior volume diário.</p>
                </div>
             </div>
          </div>

          <div className="bg-dexOrange p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center text-white shadow-2xl animate-float-slow" style={{ animationDelay: '3.5s' }}>
             <h4 className="text-2xl font-black mb-4">Pronto para Otimizar?</h4>
             <Link to="/contact" className="bg-white text-dexOrange font-black px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-xl">Solicitar Demo</Link>
          </div>
        </div>

        <RequestQuoteSection serviceName="DEX GastroManager" />

        <div className="bg-gray-900 rounded-[3.5rem] mt-24 p-12 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16 shadow-3xl">
           <div className="lg:w-1/2">
              <span className="text-dexOrange font-black text-xs uppercase tracking-widest mb-4 block">Inteligência Comercial</span>
              <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">O Top Seller do Dia a um clique.</h3>
              <p className="text-gray-400 text-xl font-light leading-relaxed mb-8">
                Nossa aplicação identifica instantaneamente qual serviço ou produto é o campeão de vendas do dia, permitindo ajustes estratégicos de estoque e marketing em tempo real.
              </p>
              <ul className="space-y-4">
                 {["Dashboards Intuitivos", "Relatórios de Performance", "Controle de Quebras", "Integração Mobile"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                       <svg className="w-6 h-6 text-dexOrange" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                       <span className="font-bold">{item}</span>
                    </li>
                 ))}
              </ul>
           </div>
           <div className="lg:w-1/2 w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-[3rem] border border-white/10 flex items-center justify-center p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-dexBlue/20 mix-blend-overlay"></div>
              <div className="text-center relative z-10 animate-pulse">
                 <svg className="w-32 h-32 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                 <p className="font-black text-2xl uppercase tracking-widest text-dexOrange">Dashboard Live</p>
                 <p className="text-gray-400 text-sm mt-2 font-medium">Visualização protegida por criptografia DEX</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BarRestManagement;
