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
        // Primeiro tenta buscar do Firestore (para todos os usuários)
        const docRef = doc(db, 'config', 'founderImage');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const firestoreUrl = docSnap.data().url;
          setFounderImage(firestoreUrl);
          // Atualiza localStorage como backup
          localStorage.setItem('founderImage', firestoreUrl);
          console.log('✅ Imagem carregada do Firestore:', firestoreUrl);
        } else {
          // Se não tiver no Firestore, tenta o localStorage
          const savedImage = localStorage.getItem('founderImage');
          if (savedImage) {
            setFounderImage(savedImage);
            console.log('✅ Imagem carregada do localStorage');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar imagem do Firestore:', error);
        // Fallback para localStorage
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
    // A imagem já é salva no Firestore pelo componente TeamImageUpload
  };

  // Se estiver carregando, mostra um skeleton sutil (mantém o design)
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
            SOBRE NÓS
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 animate-slideUp">
            Transformamos necessidades reais em <br/>
            <span className="text-dexOrange">soluções digitais inteligentes</span>
          </h1>
          <p className="text-xl text-blue-100/80 max-w-4xl mx-auto font-light leading-relaxed animate-fadeIn animation-delay-300">
            A DiasExpress (DEX) é uma plataforma tecnológica moçambicana criada para revolucionar 
            a forma como pessoas e empresas acessam serviços, gerenciam operações e impulsionam resultados.
          </p>
        </div>
      </div>

      {/* Intro & Leadership Section */}
      <div className="container mx-auto py-24 px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          {/* Texto da esquerda */}
          <div className="animate-fadeIn">
            <h2 className="text-4xl font-black text-dexDarkBlue mb-8 tracking-tighter uppercase">
              Inovação em Moçambique
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
              <p>
                Unimos inovação, tecnologia mobile e web e inteligência operacional para criar 
                um ecossistema digital moderno, seguro e eficiente, preparado para atender 
                Moçambique hoje e escalar para África amanhã.
              </p>
              <p>
                Sob a liderança de <strong className="font-bold text-gray-900">Vicente Dias</strong>, 
                a DiasExpress conecta clientes a profissionais qualificados de forma rápida, 
                segura e inteligente.
              </p>
            </div>
            
            <div className="mt-12 p-10 bg-gray-50 rounded-[2.5rem] border-l-8 border-dexOrange shadow-sm">
              <p className="italic text-gray-900 text-xl font-medium leading-relaxed">
                "Nossa missão é criar conexões que simplificam, tecnologias que protegem 
                e serviços que encantam."
              </p>
              <p className="mt-4 text-dexOrange font-black text-xs uppercase tracking-widest">
                — Vicente Dias, CEO & Founder
              </p>
            </div>
          </div>

          {/* Imagem do Founder com Upload */}
          <TeamImageUpload 
            currentImageUrl={founderImage}
            name="Vicente Dias"
            role="CEO & Founder"
            onImageUpdate={handleImageUpdate}
          />
        </div>

        {/* Quadros de Valores (AGILIDADE, INOVAÇÃO, QUALIDADE, FOCO) COM ANIMAÇÕES SEQUENCIAIS */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-dexBlue font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
              FUNDAÇÃO TÉCNICA
            </span>
            <h2 className="text-4xl font-black tracking-tight text-dexDarkBlue uppercase">
              DNA Operacional
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Agilidade - Animação up-down */}
            <div className="bg-gradient-to-br from-dexBlue to-blue-700 h-64 rounded-[2.5rem] flex flex-col justify-end p-8 text-white shadow-xl animate-float-up-down group">
              <span className="text-3xl font-black tracking-tighter mb-2">Agilidade</span>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity">
                Resposta DEX
              </p>
            </div>

            {/* Inovação - Animação left-right (delay 1s) */}
            <div className="bg-gradient-to-br from-dexOrange to-orange-600 h-72 rounded-[2.5rem] flex flex-col justify-end p-8 text-white shadow-xl animate-float-left-right animation-delay-1000 group">
              <span className="text-3xl font-black tracking-tighter mb-2">Inovação</span>
              <p className="text-sm font-bold uppercase tracking-widest text-orange-200 opacity-0 group-hover:opacity-100 transition-opacity">
                Tecnologia
              </p>
            </div>

            {/* Qualidade - Animação up-down (delay 2s) */}
            <div className="bg-gradient-to-br from-dexGreen to-green-700 h-64 rounded-[2.5rem] flex flex-col justify-end p-8 text-white shadow-xl animate-float-up-down animation-delay-2000 group">
              <span className="text-3xl font-black tracking-tighter mb-2">Qualidade</span>
              <p className="text-sm font-bold uppercase tracking-widest text-green-200 opacity-0 group-hover:opacity-100 transition-opacity">
                Selo de Elite
              </p>
            </div>

            {/* Foco - Animação combinada (delay 3s) */}
            <div className="bg-gradient-to-br from-dexDarkBlue to-black h-72 rounded-[2.5rem] flex flex-col justify-end p-8 text-white shadow-xl animate-float-combined animation-delay-3000 group">
              <span className="text-3xl font-black tracking-tighter mb-2">Foco</span>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                No Cliente
              </p>
            </div>
          </div>
        </div>

        {/* Serviços - DiasExpress (mantido exatamente igual) */}
        <div className="mb-32">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-20 h-20 bg-dexOrange text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">🌍 DiasExpress – Soluções Domésticas</h3>
              <p className="text-gray-500 mb-6 font-medium italic">
                Plataforma Premium de Serviços Domésticos em Moçambique.
              </p>
              <p className="text-gray-600 mb-6">
                A DiasExpress conecta clientes a profissionais qualificados de forma rápida, 
                segura e inteligente.
              </p>
              
              <div className="mb-6">
                <p className="text-dexDarkBlue font-bold text-sm mb-4">Disponibilizamos:</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Canalizadores", "Pintores", "Ladrilhadores", "Babás diaristas",
                    "Empregadas domésticas", "Pedreiros", "Serralheiros", "Técnicos de manutenção"
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-dexOrange rounded-full"></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200">
                <p className="text-dexDarkBlue font-bold mb-3">Nossa plataforma permite:</p>
                <ul className="space-y-2">
                  {[
                    "✔ Solicitação via aplicação Mobile e Web",
                    "✔ Acompanhamento em tempo real",
                    "✔ Sistema de avaliações e ranking",
                    "✔ Pagamentos digitais integrados",
                    "✔ Segurança e verificação de prestadores"
                  ].map(item => (
                    <li key={item} className="text-sm text-gray-600">{item}</li>
                  ))}
                </ul>
                <p className="text-dexOrange font-bold mt-4">
                  Tornamos o acesso a serviços domésticos simples, confiável e transparente.
                </p>
              </div>
            </div>

            {/* InviteExpress */}
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-20 h-20 bg-dexGreen text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">💌 InviteExpress</h3>
              <p className="text-gray-500 mb-6 font-medium italic">Convites Digitais Inteligentes</p>
              <p className="text-gray-600 mb-6">
                Diga adeus aos convites impressos caros e difíceis de rastrear. O InviteExpress 
                é a ponte entre você e seus convidados em uma única aplicação.
              </p>
              
              <div className="mb-6">
                <p className="text-dexDarkBlue font-bold text-sm mb-3">Com ele você pode:</p>
                <ul className="space-y-2">
                  {[
                    "Criar convites digitais personalizados",
                    "Enviar de forma multicanal",
                    "Utilizar QR Code exclusivo",
                    "Confirmar presença em tempo real",
                    "Gerenciar convidados com inteligência"
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-dexGreen rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-dexGreen font-bold mt-4">
                Mais organização, menos custos, mais controle.
              </p>
            </div>
          </div>

          {/* Segunda linha de serviços */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* AquaManager */}
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-20 h-20 bg-sky-500 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                </svg>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">💧 Plataforma Multicanal de Gestão de Água</h3>
              <p className="text-gray-600 mb-6">
                Aplicação Mobile, Web e PWA para gestão inteligente de consumo e faturamento de água.
              </p>
              
              <p className="text-dexDarkBlue font-bold text-sm mb-3">Permite:</p>
              <ul className="space-y-2 mb-4">
                {[
                  "Monitorar consumo em tempo real",
                  "Acompanhar tendências",
                  "Automatizar faturamento",
                  "Reduzir desperdícios",
                  "Melhorar eficiência operacional"
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sky-500 font-bold mt-4">
                Uma solução moderna para instituições, condomínios e empresas.
              </p>
            </div>

            {/* GastroManager */}
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-20 h-20 bg-dexDarkBlue text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                </svg>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">🍽 DEX GastroManager</h3>
              <p className="text-gray-600 mb-6">
                Ecossistema digital para restaurantes e negócios gastronômicos.
              </p>
              
              <p className="text-dexDarkBlue font-bold text-sm mb-3">Com o DEX GastroManager é possível:</p>
              <ul className="space-y-2 mb-4">
                {[
                  "Monitorar vendas",
                  "Gerenciar equipes",
                  "Controlar estoque",
                  "Visualizar lucros em tempo real",
                  "Tomar decisões baseadas em dados"
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-dexDarkBlue rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-dexDarkBlue font-bold mt-4">
                Transformamos dados em crescimento.
              </p>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="bg-dexDarkBlue rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-dexOrange opacity-10 rounded-full -mr-20 -mt-20"></div>
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {/* Missão */}
            <div className="text-center md:text-left">
              <h4 className="text-dexOrange font-black text-xs uppercase tracking-[0.4em] mb-6">🎯 Missão</h4>
              <p className="text-lg font-light leading-relaxed">
                Digitalizar serviços e processos em Moçambique, oferecendo soluções inteligentes 
                que aumentam eficiência, segurança e rentabilidade.
              </p>
            </div>

            {/* Visão */}
            <div className="text-center md:text-left">
              <h4 className="text-dexOrange font-black text-xs uppercase tracking-[0.4em] mb-6">👁 Visão</h4>
              <p className="text-lg font-light leading-relaxed">
                Ser a principal plataforma digital de serviços e soluções corporativas em África.
              </p>
            </div>

            {/* Valores */}
            <div className="text-center md:text-left">
              <h4 className="text-dexOrange font-black text-xs uppercase tracking-[0.4em] mb-6">🔐 Valores</h4>
              <ul className="space-y-2 text-lg font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-dexOrange rounded-full"></span>
                  Inovação contínua
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-dexOrange rounded-full"></span>
                  Transparência
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-dexOrange rounded-full"></span>
                  Segurança
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-dexOrange rounded-full"></span>
                  Impacto social
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-dexOrange rounded-full"></span>
                  Excelência operacional
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
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
