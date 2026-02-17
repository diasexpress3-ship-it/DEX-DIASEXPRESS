
import React from "react";
import { Link } from "react-router-dom";
import { PARTNERS } from "../constants";

const Partners: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
       <div className="bg-white border-b py-24">
          <div className="container mx-auto px-6 text-center">
             <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6 uppercase">Rede de Excelência</h1>
             <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
               A DEX está construindo uma rede robusta com os principais pilares da economia moçambicana. Buscamos parceiros que compartilhem nossa visão de agilidade e inovação.
             </p>
          </div>
       </div>

       <div className="container mx-auto py-20 px-6">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {PARTNERS.map((p, i) => (
             <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-dexBlue opacity-0 group-hover:opacity-[0.03] transition-opacity rounded-full -mr-16 -mt-16"></div>
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-dexDarkBlue group-hover:text-white transition-all duration-500">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                   </svg>
                </div>
                <h3 className="text-xl font-black mb-4 tracking-tight group-hover:text-dexBlue transition-colors uppercase leading-tight min-h-[3rem]">{p.name}</h3>
                <p className="text-gray-500 mb-8 flex-grow leading-relaxed font-medium italic text-sm">"{p.description}"</p>
                <Link 
                  to={p.link} 
                  className="inline-flex items-center justify-center bg-gray-900 text-white font-black px-6 py-4 rounded-xl hover:bg-dexOrange transition-all group/btn shadow-sm hover:shadow-md text-xs tracking-widest uppercase"
                >
                   Candidatar-se à Rede
                   <svg className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </Link>
             </div>
           ))}
           
           {/* High-Impact Highlight Partner CTA Card */}
           <div className="bg-dexDarkBlue p-10 rounded-[2.5rem] border-2 border-dexOrange/30 flex flex-col items-center justify-center text-center group relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-dexOrange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-20 h-20 bg-dexOrange shadow-[0_0_30px_rgba(255,122,0,0.3)] rounded-full flex items-center justify-center mb-8 text-white relative z-10 animate-pulse">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <h4 className="text-2xl font-black text-white mb-4 tracking-tight uppercase relative z-10">Novo Canal de Parceria</h4>
              <p className="text-blue-100/60 text-sm mb-10 leading-relaxed relative z-10">Tem um salão de eventos ou uma loja de materiais? Sua empresa pode ser o próximo motor de inovação na nossa rede.</p>
              <Link 
                to="/contact?service=Nova Parceria" 
                className="w-full bg-dexOrange text-white font-black py-5 rounded-2xl hover:bg-white hover:text-dexDarkBlue hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3 group/join relative z-10 uppercase tracking-widest text-xs"
              >
                Solicitar Parceria DEX
                <svg className="w-5 h-5 group-hover/join:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </Link>
           </div>
         </div>

         <div className="mt-24 bg-white rounded-[4rem] p-12 md:p-20 border border-gray-100 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-dexBlue opacity-[0.02] rounded-full -mr-48 -mt-48 transition-transform group-hover:scale-125 duration-1000"></div>
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
               <div>
                  <span className="text-dexOrange font-black text-xs uppercase tracking-[0.4em] mb-4 block">Expansion Strategy</span>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight text-dexDarkBlue">Construindo Juntos o Futuro de Moçambique</h2>
                  <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed font-light">
                    Nossa rede de parceiros é o que nos permite ir mais longe. Buscamos inovação técnica nas áreas de construção, gastronomia, recursos hídricos e eventos.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     {["Materiais", "Restauração", "Hídrico", "Eventos", "Logística"].map((val) => (
                       <span key={val} className="px-6 py-2 bg-gray-100 border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600">{val}</span>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col items-center">
                  <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-200 w-full max-w-sm text-center shadow-2xl transition-transform hover:-translate-y-2">
                     <div className="mb-6 inline-block p-5 bg-dexDarkBlue rounded-2xl shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                     </div>
                     <h3 className="text-2xl font-black mb-4 text-dexDarkBlue">Vamos Conectar?</h3>
                     <p className="text-gray-500 mb-8 font-light text-sm">Inicie uma conversa estratégica para integrar sua loja ou salão ao nosso ecossistema.</p>
                     <Link 
                       to="/contact?service=Parceria Estratégica" 
                       className="block w-full bg-dexBlue text-white font-black py-5 rounded-2xl hover:bg-dexOrange transition-all shadow-xl tracking-widest uppercase text-xs"
                     >
                       Falar com a Holding
                     </Link>
                  </div>
               </div>
            </div>
         </div>
       </div>
    </div>
  );
};

export default Partners;
