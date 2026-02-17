
import React from "react";
import InviteExpressCard from "../components/InviteExpressCard";
import RequestQuoteSection from "../components/RequestQuoteSection";

const InviteExpress: React.FC = () => {
  const features = [
    {
      title: "Design Exclusivo",
      desc: "Crie convites personalizados com temas únicos que refletem a identidade do seu evento.",
      icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    },
    {
      title: "Envio Instantâneo",
      desc: "Envie por WhatsApp, Email ou redes sociais com apenas um clique. Sem papel, sem atrasos.",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
    {
      title: "Analytics em Tempo Real",
      desc: "Saiba exatamente quem confirmou, quem visualizou e planeje seu evento com precisão.",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-dexGreen py-32 text-white relative overflow-hidden">
         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 0 L100 0 L100 100 Z" fill="white" />
            </svg>
         </div>
         
         <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
           <span className="inline-block bg-white text-dexGreen px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">Sua Festa Começa Aqui</span>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
             Convites Digitais de<br/>Alta Performance
           </h1>
           <p className="text-xl md:text-2xl text-green-50 max-w-2xl mx-auto font-light leading-relaxed">
             Diga adeus aos convites impressos caros e difíceis de rastrear. O <strong>InviteExpress</strong> é a ponte entre você e seus convidados.
           </p>
         </div>
      </section>

      <div className="container mx-auto py-24 px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center group animate-horizontal-flow hover:pause"
              style={{ animationDelay: `${index * 1}s` }}
            >
               <div className="w-24 h-24 bg-green-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 transition-all duration-500 group-hover:bg-dexGreen group-hover:text-white group-hover:shadow-2xl group-hover:-translate-y-2 border border-green-100">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}/>
                  </svg>
               </div>
               <h4 className="text-2xl font-black mb-4 tracking-tight group-hover:text-dexGreen transition-colors">{feature.title}</h4>
               <p className="text-gray-500 leading-relaxed font-medium">
                 {feature.desc}
               </p>
            </div>
          ))}
        </div>

        <InviteExpressCard />

        <RequestQuoteSection serviceName="InviteExpress" />

        <div className="mt-24 text-center max-w-2xl mx-auto">
           <h3 className="text-3xl font-black mb-6 tracking-tight italic">"InviteExpress não é apenas um convite, é o início de uma experiência memorável."</h3>
           <div className="flex flex-col items-center">
              <div className="w-16 h-1 bg-dexGreen rounded-full mb-4"></div>
              <p className="text-gray-400 font-medium">Equipe de Design InviteExpress</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InviteExpress;
