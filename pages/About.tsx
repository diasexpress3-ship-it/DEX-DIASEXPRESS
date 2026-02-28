import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TeamImageUpload from "../components/TeamImageUpload";
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const DEFAULT_FOUNDER_IMAGE = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop";

const About: React.FC = () => {
  const [founderImage, setFounderImage] = useState(DEFAULT_FOUNDER_IMAGE);
  const [loading, setLoading] = useState(true);

  // Carregar imagem salva ao iniciar (primeiro do Firestore, depois localStorage)
  useEffect(() => {
    const loadImage = async () => {
      try {
        const docRef = doc(db, 'config', 'founderImage');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const firestoreUrl = docSnap.data().url;
          setFounderImage(firestoreUrl);
          localStorage.setItem('founderImage', firestoreUrl);
          console.log('✅ Imagem carregada do Firestore:', firestoreUrl);
        } else {
          const savedImage = localStorage.getItem('founderImage');
          if (savedImage) {
            setFounderImage(savedImage);
            console.log('✅ Imagem carregada do localStorage');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar imagem do Firestore:', error);
        const savedImage = localStorage.getItem('founderImage');
        if (savedImage) {
          setFounderImage(savedImage);
        }
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, []);

  const handleImageUpdate = (newUrl: string) => {
    setFounderImage(newUrl);
    console.log('🖼️ Imagem atualizada no About:', newUrl);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-dexDarkBlue py-32 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-dexBlue/20 to-dexOrange/20 opacity-50"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="h-8 w-32 bg-white/20 animate-pulse rounded-full mx-auto mb-4"></div>
            <div className="h-20 w-3/4 bg-white/20 animate-pulse rounded-lg mx-auto mb-6"></div>
            <div className="h-12 w-2/3 bg-white/20 animate-pulse rounded-lg mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-dexDarkBlue py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dexBlue/20 to-dexOrange/20 opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <span className="text-dexOrange font-black text-xs uppercase tracking-[0.5em] mb-4 block animate-fadeIn">
            SOBRE A DEX
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 animate-slideUp">
            A ponte simples entre si <br/>
            <span className="text-dexOrange">e o que precisa</span>
          </h1>
          <p className="text-xl text-blue-100/80 max-w-4xl mx-auto font-light leading-relaxed animate-fadeIn animation-delay-300">
            A DEX | DIASEXPRESS é um ecossistema tecnológico moçambicano que conecta pessoas, 
            negócios e oportunidades através de soluções simples, inteligentes e feitas sob medida.
          </p>
        </div>
      </div>

      {/* Sobre a DEX - Nova Secção Institucional */}
      <div className="container mx-auto px-6 max-w-7xl -mt-16 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl p-12 md:p-20 border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Texto Institucional */}
            <div className="space-y-8">
              <div>
                <span className="text-dexOrange font-black text-xs uppercase tracking-[0.5em] mb-4 block">
                  QUEM SOMOS
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-dexDarkBlue tracking-tighter mb-8">
                  Muito mais que <br/>
                  <span className="text-dexOrange">tecnologia</span>
                </h2>
              </div>

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  A DEX nasce para <strong className="text-dexDarkBlue">simplificar o dia de moçambicanos e empresas</strong>, 
                  conectando tecnologia, serviços e oportunidades de forma inteligente, acessível e humana.
                </p>
                <p>
                  Não somos apenas uma plataforma digital. Somos um <strong className="text-dexDarkBlue">ecossistema completo</strong> 
                  que oferece desde soluções domésticas geridas pela nossa equipa, até ferramentas avançadas 
                  como convites digitais, gestão inteligente de água, sistema de restauração, ATS com Chatbot 
                  para recrutamento via WhatsApp, e criação de aplicações e websites sob medida.
                </p>
                <p>
                  Acreditamos que a verdadeira inovação acontece quando a tecnologia serve as pessoas — 
                  e não o contrário.
                </p>
              </div>

              {/* Números de Impacto */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-black text-dexOrange">30+</div>
                  <div className="text-sm text-gray-500">Categorias de serviços</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dexBlue">100+</div>
                  <div className="text-sm text-gray-500">Profissionais parceiros</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dexGreen">5</div>
                  <div className="text-sm text-gray-500">Soluções digitais</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dexDarkBlue">24/7</div>
                  <div className="text-sm text-gray-500">Suporte ativo</div>
                </div>
              </div>
            </div>

            {/* Cards de Destaque - O que fazemos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-dexOrange/5 to-orange-50 p-6 rounded-3xl border border-orange-100">
                <div className="w-12 h-12 bg-dexOrange/10 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-dexOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-dexDarkBlue mb-2">DIASEXPRESS</h3>
                <p className="text-sm text-gray-500">Plataforma gerida pela DEX que conecta clientes a prestadores de confiança — da captação à contratação.</p>
              </div>

              <div className="bg-gradient-to-br from-dexGreen/5 to-green-50 p-6 rounded-3xl border border-green-100">
                <div className="w-12 h-12 bg-dexGreen/10 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-dexGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-dexDarkBlue mb-2">InviteExpress</h3>
                <p className="text-sm text-gray-500">Convites digitais inteligentes com QR Code, gestão de confirmações e personalização total.</p>
              </div>

              <div className="bg-gradient-to-br from-sky-500/5 to-sky-50 p-6 rounded-3xl border border-sky-100">
                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-dexDarkBlue mb-2">Nexus Aqua Manager</h3>
                <p className="text-sm text-gray-500">Controlo inteligente de consumo de água com leitura por imagem e monitoramento em tempo real.</p>
              </div>

              <div className="bg-gradient-to-br from-dexDarkBlue/5 to-blue-50 p-6 rounded-3xl border border-blue-100">
                <div className="w-12 h-12 bg-dexDarkBlue/10 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-dexDarkBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-dexDarkBlue mb-2">DEX GastroManager</h3>
                <p className="text-sm text-gray-500">Sistema completo para restaurantes: gestão de inventário, vendas e QR Code por produto.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/5 to-purple-50 p-6 rounded-3xl border border-purple-100 sm:col-span-2">
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-dexDarkBlue mb-2">ATS + Chatbot para WhatsApp</h3>
                <p className="text-sm text-gray-500">Sistema de recrutamento com triagem automatizada via WhatsApp, suporte multi-cliente e gestão de candidatos.</p>
              </div>

              <div className="bg-gradient-to-br from-gray-700/5 to-gray-50 p-6 rounded-3xl border border-gray-200 sm:col-span-2">
                <div className="w-12 h-12 bg-gray-700/10 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-dexDarkBlue mb-2">DEX Web & Apps</h3>
                <p className="text-sm text-gray-500">Desenvolvimento de aplicações e websites personalizados para empresas, negócios e empreendedores moçambicanos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section - CEO & Founder (Mantido com texto melhorado) */}
      <div className="container mx-auto py-32 px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Texto do Fundador - Melhorado */}
          <div className="animate-fadeIn order-2 lg:order-1">
            <span className="text-dexOrange font-black text-xs uppercase tracking-[0.5em] mb-4 block">
              LIDERANÇA
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-dexDarkBlue mb-8 tracking-tighter">
              Vicente <span className="text-dexOrange">Dias</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                <strong className="text-dexDarkBlue">CEO e Fundador da DEX | DIASEXPRESS</strong>, 
                Vicente Dias é um empreendedor moçambicano com a missão de digitalizar serviços e 
                criar pontes entre pessoas e oportunidades através da tecnologia.
              </p>
              <p>
                Com uma visão focada no impacto social e na inovação com identidade local, lidera 
                uma equipa que desenvolve soluções pensadas para a realidade moçambicana — desde 
                a gestão de serviços domésticos até sistemas avançados de recrutamento e 
                desenvolvimento de aplicações sob medida.
              </p>
              <p>
                A sua abordagem combina <strong className="text-dexDarkBlue">excelência operacional</strong>, 
                <strong className="text-dexDarkBlue"> transparência</strong> e um profundo compromisso 
                com a <strong className="text-dexDarkBlue">geração de emprego e desenvolvimento local</strong>.
              </p>
            </div>

            {/* Citação */}
            <div className="mt-12 p-8 bg-gray-50 rounded-[2.5rem] border-l-8 border-dexOrange shadow-sm relative">
              <svg className="absolute top-6 left-6 w-12 h-12 text-dexOrange/10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="italic text-gray-800 text-xl font-medium leading-relaxed pl-16">
                "Acredito que a verdadeira inovação acontece quando a tecnologia encontra a realidade das pessoas. 
                Na DEX, construímos soluções que simplificam o dia e geram oportunidades reais para Moçambique."
              </p>
              <p className="mt-4 text-dexOrange font-black text-sm uppercase tracking-widest pl-16">
                — Vicente Dias, CEO & Founder
              </p>
            </div>
          </div>

          {/* Imagem do Founder com Upload (mantida) */}
          <div className="order-1 lg:order-2">
            <TeamImageUpload 
              currentImageUrl={founderImage}
              name="Vicente Dias"
              role="CEO & Founder"
              onImageUpdate={handleImageUpdate}
            />
          </div>
        </div>
      </div>

      {/* DNA Operacional (mantido com animações) */}
      <div className="container mx-auto px-6 max-w-7xl mb-32">
        <div className="text-center mb-16">
          <span className="text-dexBlue font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
            FUNDAÇÃO TÉCNICA
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-dexDarkBlue tracking-tight">
            DNA <span className="text-dexOrange">Operacional</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-dexBlue to-blue-700 h-64 rounded-[2.5rem] flex flex-col justify-end p-8 text-white shadow-xl animate-float-up-down group">
            <span className="text-3xl font-black tracking-tighter mb-2">Agilidade</span>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity">
              Resposta DEX
            </p>
          </div>

          <div className="bg-gradient-to-br from-dexOrange to-orange-600 h-72 rounded-[2.5rem] flex flex-col justify-end p-8 text-white shadow-xl animate-float-left-right animation-delay-1000 group">
            <span className="text-3xl font-black tracking-tighter mb-2">Inovação</span>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-200 opacity-0 group-hover:opacity-100 transition-opacity">
              Tecnologia
            </p>
          </div>

          <div className="bg-gradient-to-br from-dexGreen to-green-700 h-64 rounded-[2.5rem] flex flex-col justify-end p-8 text-white shadow-xl animate-float-up-down animation-delay-2000 group">
            <span className="text-3xl font-black tracking-tighter mb-2">Qualidade</span>
            <p className="text-sm font-bold uppercase tracking-widest text-green-200 opacity-0 group-hover:opacity-100 transition-opacity">
              Selo de Elite
            </p>
          </div>

          <div className="bg-gradient-to-br from-dexDarkBlue to-black h-72 rounded-[2.5rem] flex flex-col justify-end p-8 text-white shadow-xl animate-float-combined animation-delay-3000 group">
            <span className="text-3xl font-black tracking-tighter mb-2">Foco</span>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              No Cliente
            </p>
          </div>
        </div>
      </div>

      {/* Missão, Visão e Valores (Melhorados) */}
      <div className="container mx-auto px-6 max-w-7xl mb-32">
        <div className="bg-gradient-to-br from-dexDarkBlue via-dexBlue to-dexDarkBlue rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-dexOrange opacity-10 rounded-full -mr-20 -mt-20"></div>
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            
            {/* Missão */}
            <div className="text-center md:text-left">
              <div className="inline-block p-4 bg-white/10 rounded-2xl mb-6">
                <span className="text-4xl">🎯</span>
              </div>
              <h4 className="text-dexOrange font-black text-sm uppercase tracking-[0.4em] mb-4">Missão</h4>
              <p className="text-lg text-blue-100/90 leading-relaxed">
                Simplificar a vida de moçambicanos e empresas, conectando pessoas a soluções inteligentes 
                — dentro e fora do mundo digital — com confiança, qualidade e impacto real.
              </p>
            </div>

            {/* Visão */}
            <div className="text-center md:text-left">
              <div className="inline-block p-4 bg-white/10 rounded-2xl mb-6">
                <span className="text-4xl">👁</span>
              </div>
              <h4 className="text-dexOrange font-black text-sm uppercase tracking-[0.4em] mb-4">Visão</h4>
              <p className="text-lg text-blue-100/90 leading-relaxed">
                Ser a principal ponte digital entre serviços, tecnologia e pessoas em África, 
                com raízes moçambicanas e impacto continental.
              </p>
            </div>

            {/* Valores */}
            <div className="text-center md:text-left">
              <div className="inline-block p-4 bg-white/10 rounded-2xl mb-6">
                <span className="text-4xl">🔐</span>
              </div>
              <h4 className="text-dexOrange font-black text-sm uppercase tracking-[0.4em] mb-4">Valores</h4>
              <ul className="space-y-3 text-blue-100/90">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-dexOrange rounded-full"></span>
                  <span>Inovação com identidade local</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-dexOrange rounded-full"></span>
                  <span>Transparência em cada ligação</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-dexOrange rounded-full"></span>
                  <span>Segurança e confiança</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-dexOrange rounded-full"></span>
                  <span>Impacto social e geração de emprego</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-dexOrange rounded-full"></span>
                  <span>Excelência com simplicidade</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Slogan */}
          <div className="text-center mt-16 pt-8 border-t border-white/10">
            <p className="text-2xl md:text-3xl font-black text-white/90 italic">
              "DEX: A ponte simples entre si e o que precisa."
            </p>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="container mx-auto px-6 max-w-7xl mb-32">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-[4rem] p-16 text-center border border-gray-100 shadow-xl">
          <h3 className="text-3xl md:text-4xl font-black text-dexDarkBlue mb-6">
            Vamos construir juntos a <span className="text-dexOrange">próxima solução</span>?
          </h3>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-10 font-light">
            Seja para serviços domésticos, convites digitais, gestão de água, restauração, 
            recrutamento ou desenvolvimento de aplicações — a DEX está pronta para simplificar o seu dia.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link 
              to="/contact" 
              className="bg-dexOrange text-white font-black px-10 py-5 rounded-xl hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl text-sm uppercase tracking-widest"
            >
              Falar com a equipa
            </Link>
            <Link 
              to="/services" 
              className="bg-white text-dexDarkBlue font-black px-10 py-5 rounded-xl hover:bg-gray-100 transition-all border-2 border-dexDarkBlue/10 text-sm uppercase tracking-widest"
            >
              Conhecer serviços
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section (mantido) */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-black text-dexDarkBlue mb-4 tracking-tight uppercase">
            DEX Holding 2030
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Construindo a infraestrutura digital que Moçambique merece. 
            Simplicidade que gera poder em todo o continente africano.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
