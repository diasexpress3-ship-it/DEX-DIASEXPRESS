
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SERVICES, COMPANY_EMAIL } from "../constants";
import RequestQuoteSection from "../components/RequestQuoteSection";

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = SERVICES.find(s => s.id === serviceId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!service) {
    return (
      <div className="container mx-auto py-32 text-center px-6">
        <h1 className="text-4xl font-bold text-gray-400 mb-4">Serviço não encontrado</h1>
        <p className="mb-8">Desculpe, a página que você procura não existe.</p>
        <Link to="/services" className="bg-dexBlue text-white px-8 py-3 rounded-xl font-bold shadow-lg">Voltar para Serviços</Link>
      </div>
    );
  }

  const handleSidebarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Interesse Imediato: ${service.title}`);
    const body = encodeURIComponent(
      `Olá Equipe DEX,%0D%0A%0D%0A` +
      `Tenho interesse imediato no serviço de ${service.title} e gostaria de mais informações.%0D%0A%0D%0A` +
      `CONTATO:%0D%0A` +
      `Nome: ${name}%0D%0A` +
      `Email: ${email}%0D%0A%0D%0A` +
      `Solicitado via página de detalhes do serviço.`
    );
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`;
  };

  const steps = [
    { 
      title: "BUSQUE O SERVIÇO", 
      desc: "Navegue por categorias ou busque pelo serviço específico que precisa em nossa plataforma de Soluções Domésticas." 
    },
    { 
      title: "ESCOLHA O PRESTADOR", 
      desc: "Veja perfis verificados, avaliações reais e escolha o melhor profissional para a sua Via Expressa." 
    },
    { 
      title: "AGENDE E PAGUE", 
      desc: "Marque data e horário de sua preferência e pague de forma segura e flexível pela nossa plataforma integrada." 
    },
    { 
      title: "AVALIE O SERVIÇO", 
      desc: "Após a conclusão, avalie o profissional e compartilhe sua experiência para mantermos o selo de qualidade DEX." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="h-96 relative flex items-center justify-center text-white overflow-hidden" style={{ backgroundColor: service.color }}>
        <div className="absolute inset-0 opacity-20 pattern-dots"></div>
        <div className="relative z-10 text-center px-6">
           <span className="text-xs font-black uppercase tracking-[0.4em] mb-4 block opacity-80">Serviços de Expressos</span>
           <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter drop-shadow-lg">{service.title}</h1>
           <div className="flex items-center justify-center gap-2">
              <span className="h-1 w-12 bg-white rounded-full"></span>
              <span className="uppercase tracking-[0.3em] font-bold text-sm">Soluções Corporativas & Domésticas</span>
              <span className="h-1 w-12 bg-white rounded-full"></span>
           </div>
        </div>
      </div>

      <div className="container mx-auto py-24 px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Visão Geral do Serviço</h2>
              <p className="text-gray-600 text-xl leading-relaxed font-light">
                {service.fullDescription || service.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 group hover:border-dexBlue transition-colors">
                  <div className="text-dexBlue mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Confiabilidade</h4>
                  <p className="text-gray-600 font-medium italic">Sistemas de verificação e controle de qualidade para sua total paz de espírito.</p>
               </div>
               <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 group hover:border-dexOrange transition-colors">
                  <div className="text-dexOrange mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Eficiência</h4>
                  <p className="text-gray-600 font-medium italic">Redução de tempo e custos através de processos otimizados e tecnologia via expressa.</p>
               </div>
            </div>

            <div className="pt-4">
               <div className="inline-block bg-gray-100 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 text-gray-500">Fluxo de Atendimento</div>
               <h3 className="text-3xl font-black mb-10 tracking-tight text-gray-900">O Processo Normal</h3>
               <div className="space-y-10">
                  {steps.map((step, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-6 group animate-horizontal-flow hover:pause"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    >
                       <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-black text-xl shadow-xl group-hover:bg-dexOrange transition-all group-hover:-translate-y-1">
                          0{i+1}
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-gray-900 tracking-tight mb-2 group-hover:text-dexBlue transition-colors">{step.title}</h4>
                          <p className="text-gray-500 leading-relaxed font-medium text-lg italic">
                            {step.desc}
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            
            <RequestQuoteSection serviceName={service.title} />
          </div>

          <div className="lg:col-span-1">
             {/* Sidebar with Floating Animation */}
             <div className="bg-gray-900 text-white p-10 rounded-3xl sticky top-32 shadow-2xl border border-white/5 overflow-hidden animate-float-slow">
                <div className="absolute top-0 right-0 w-32 h-32 bg-dexOrange opacity-5 rounded-full -mr-16 -mt-16"></div>
                <h3 className="text-2xl font-bold mb-6 relative z-10">Inicie sua Via Expressa</h3>
                <p className="text-gray-400 mb-8 font-light relative z-10">Interessado em implementar este serviço? Nossa equipe está pronta para lhe atender via e-mail direto.</p>
                <form onSubmit={handleSidebarSubmit} className="space-y-4 relative z-10">
                   <input 
                    type="text" 
                    placeholder="Seu Nome" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-800 border-none rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-dexOrange outline-none transition-all font-medium" 
                   />
                   <input 
                    type="email" 
                    placeholder="Seu Email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800 border-none rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-dexOrange outline-none transition-all font-medium" 
                   />
                   <button type="submit" className="w-full bg-dexOrange py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/20 mt-2 flex items-center justify-center gap-2">
                      Enviar E-mail Direto
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                   </button>
                </form>
                <div className="mt-10 pt-8 border-t border-gray-800 flex items-center justify-between text-[10px] text-gray-500 font-black uppercase tracking-widest">
                   <span>Atendimento DEX</span>
                   <Link to="/contact" className="text-white hover:text-dexOrange transition-colors">Outros Canais →</Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
