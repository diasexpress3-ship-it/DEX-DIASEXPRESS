import React, { useState } from "react";
import { Link } from "react-router-dom";
import { COMPANY_WHATSAPP, COMPANY_EMAIL, COMPANY_PHONE } from "../constants";
import RequestQuoteSection from "../components/RequestQuoteSection";

const DexATSPro: React.FC = () => {
  const [activeTab, setActiveTab] = useState("features");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: "📊",
      title: "Dashboard Executivo",
      description: "Métricas em tempo real: candidatos ativos, vagas abertas, processos em andamento e taxa de conversão."
    },
    {
      icon: "📋",
      title: "Gestão de Vagas",
      description: "Criação, publicação e acompanhamento de vagas com status personalizáveis."
    },
    {
      icon: "🔄",
      title: "Pipeline Visual (Kanban)",
      description: "Interface de arrastar e soltar para mover candidatos entre etapas: Novo, Triagem, Entrevista, Proposta, Contratado."
    },
    {
      icon: "👤",
      title: "Perfil do Candidato",
      description: "Histórico completo de interações, documentos, anotações e avaliações."
    },
    {
      icon: "🤖",
      title: "Chatbot WhatsApp",
      description: "Triagem inicial via WhatsApp com perguntas personalizáveis e sistema de pontuação automática."
    },
    {
      icon: "🏢",
      title: "Multi-Cliente (White Label)",
      description: "Cada empresa com sua identidade visual e dados completamente isolados."
    },
    {
      icon: "📈",
      title: "Relatórios e Analytics",
      description: "Gráficos interativos, exportação de dados e previsões com IA."
    },
    {
      icon: "🧠",
      title: "Base de Talentos",
      description: "Pool de candidatos com alertas automáticos para novas vagas compatíveis."
    }
  ];

  const beneficios = [
    {
      titulo: "⏱️ Redução de 70%",
      descricao: "no tempo de triagem de candidatos"
    },
    {
      titulo: "📈 Aumento de 50%",
      descricao: "na taxa de conversão de candidaturas"
    },
    {
      titulo: "💰 Diminuição de 40%",
      descricao: "nos custos operacionais de recrutamento"
    },
    {
      titulo: "👥 Melhoria significativa",
      descricao: "na experiência do candidato"
    }
  ];

  const roadmap = [
    { periodo: "Q2 2026", items: ["Integração com portais de emprego", "App móvel para recrutadores"] },
    { periodo: "Q3 2026", items: ["IA para match automático de perfis", "Video-entrevistas integradas"] },
    { periodo: "Q4 2026", items: ["Assinatura digital de contratos", "Integração com folha de pagamento"] }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-dexDarkBlue via-purple-900 to-dexDarkBlue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-24 md:py-32 text-center">
          <span className="inline-block text-purple-300 font-black text-xs uppercase tracking-[0.5em] mb-6 animate-fadeIn">
            DEX TALENT TECH
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter animate-slideUp">
            DEX-ATS-<span className="text-purple-400">PRO</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-6 text-purple-100">
            O Primeiro ATS Moçambicano com Chatbot WhatsApp
          </p>
          <p className="text-xl text-blue-100/90 max-w-3xl mx-auto font-light leading-relaxed animate-fadeIn animation-delay-300">
            Revolucione o recrutamento na sua empresa com inteligência artificial, 
            automação via WhatsApp e gestão multi-cliente.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-12 animate-fadeIn animation-delay-500">
            <a 
              href={`https://wa.me/${COMPANY_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-500 text-white font-black px-8 py-4 rounded-xl hover:bg-purple-600 transition-all transform hover:scale-105 shadow-xl text-sm uppercase tracking-widest"
            >
              Solicitar Demonstração
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

      <div className="container mx-auto px-6 py-24">
        {/* Problema x Solução */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="bg-red-50 rounded-3xl p-10 border border-red-100">
            <span className="text-5xl mb-4 block">😫</span>
            <h3 className="text-3xl font-black text-red-700 mb-6">Recrutamento Tradicional</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-red-600 flex-shrink-0 mt-0.5">✗</span>
                <span>Processos manuais com Excel e papel</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-red-600 flex-shrink-0 mt-0.5">✗</span>
                <span>Perda de candidatos qualificados</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-red-600 flex-shrink-0 mt-0.5">✗</span>
                <span>Dificuldade em gerir múltiplas vagas</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-red-600 flex-shrink-0 mt-0.5">✗</span>
                <span>Comunicação ineficiente com candidatos</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-red-600 flex-shrink-0 mt-0.5">✗</span>
                <span>Falta de dados para decisão</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-3xl p-10 border border-green-100">
            <span className="text-5xl mb-4 block">✨</span>
            <h3 className="text-3xl font-black text-green-700 mb-6">Solução DEX-ATS-PRO</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">✓</span>
                <span>Automação completa do ciclo de recrutamento</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">✓</span>
                <span>Base de talentos permanente com alertas</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">✓</span>
                <span>Pipeline visual e organizado (Kanban)</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">✓</span>
                <span>Chatbot WhatsApp 24/7</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">✓</span>
                <span>Relatórios detalhados e métricas em tempo real</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Benefícios */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-black text-xs uppercase tracking-[0.5em] mb-4 block">
              RESULTADOS COMPROVADOS
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-dexDarkBlue mb-6">
              Benefícios <span className="text-purple-500">Reais</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {beneficios.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <p className="text-3xl font-black text-purple-600 mb-2">{item.titulo}</p>
                <p className="text-sm text-gray-600">{item.descricao}</p>
                <div className={`h-1 bg-purple-500 rounded-full mt-4 transition-all duration-500 ${hoveredCard === index ? 'w-full' : 'w-0'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Funcionalidades */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-black text-xs uppercase tracking-[0.5em] mb-4 block">
              FUNCIONALIDADES
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-dexDarkBlue mb-6">
              Tudo o que precisa num <span className="text-purple-500">único lugar</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100"
                onMouseEnter={() => setHoveredCard(index + 10)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">
                  {feature.icon}
                </span>
                <h3 className="text-xl font-black text-dexDarkBlue mb-3 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-2xl transition-all duration-500 ${hoveredCard === index + 10 ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Integration Highlight */}
        <div className="mb-32">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }} />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-7xl mb-4 block">🤖💬</span>
                <h3 className="text-3xl md:text-4xl font-black mb-6">
                  Chatbot de Triagem para WhatsApp
                </h3>
                <p className="text-xl text-green-100 mb-8">
                  Mais de 90% dos moçambicanos utilizam WhatsApp. O DEX ATS fala a língua do candidato.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    <span>Perguntas personalizáveis por vaga</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    <span>Sistema de pontuação automática</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    <span>Upload de currículo via link</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    <span>Base de talentos para reprovados</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">👤</div>
                  <div className="flex-1 bg-white/20 rounded-2xl p-4">
                    <p className="text-sm">Olá, estou interessado na vaga de Programador</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4 flex-row-reverse">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">🤖</div>
                  <div className="flex-1 bg-purple-500/30 rounded-2xl p-4">
                    <p className="text-sm">Ótimo! Vou fazer algumas perguntas. Qual sua experiência com React?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">👤</div>
                  <div className="flex-1 bg-white/20 rounded-2xl p-4">
                    <p className="text-sm">3 anos de experiência</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-black text-xs uppercase tracking-[0.5em] mb-4 block">
              ROADMAP
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-dexDarkBlue mb-6">
              O Futuro do <span className="text-purple-500">Recrutamento</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roadmap.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <span className="text-3xl font-black text-purple-600 mb-4 block">{item.periodo}</span>
                <ul className="space-y-3">
                  {item.items.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-br from-gray-900 to-dexDarkBlue rounded-[3rem] p-16 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-black mb-6">
            Pronto para revolucionar o <span className="text-purple-400">recrutamento</span>?
          </h3>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Solicite uma demonstração gratuita e descubra como o DEX-ATS-PRO pode transformar os seus processos de recrutamento.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://wa.me/${COMPANY_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-500 text-white font-black px-8 py-4 rounded-xl hover:bg-purple-600 transition-all transform hover:scale-105 shadow-xl"
            >
              Quero uma Demonstração
            </a>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm text-white font-black px-8 py-4 rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              Falar com a Equipa
            </Link>
          </div>
          <div className="mt-8 text-sm text-gray-400">
            📍 Maputo, Moçambique | 📧 {COMPANY_EMAIL} | 📞 {COMPANY_PHONE}
          </div>
        </div>

        <RequestQuoteSection serviceName="DEX-ATS-PRO" />
      </div>
    </div>
  );
};

export default DexATSPro;
