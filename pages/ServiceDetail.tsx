import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SERVICES, COMPANY_EMAIL, DIASEXPRESS_CATEGORIES } from "../constants";
import RequestQuoteSection from "../components/RequestQuoteSection";

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = SERVICES.find(s => s.id === serviceId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("todos");

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

  // Filtrar categorias baseado na pesquisa e tipo de filtro
  const filteredCategories = DIASEXPRESS_CATEGORIES.filter(cat => {
    const matchesSearch = searchTerm === "" || 
      cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterType === "todos") return matchesSearch;
    if (filterType === "domesticos") return cat.id.includes("domesticos") || cat.id.includes("empregadas");
    if (filterType === "comerciais") return cat.id.includes("limpeza") || cat.id.includes("jardinagem");
    if (filterType === "tecnicos") return cat.id.includes("manutencao") || cat.id.includes("carpintaria") || cat.id.includes("construcao");
    return matchesSearch;
  });

  // Estatísticas para a página
  const stats = [
    { label: "Categorias", value: DIASEXPRESS_CATEGORIES.length, icon: "📊", color: "from-blue-500 to-cyan-500" },
    { label: "Serviços", value: DIASEXPRESS_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0), icon: "🔧", color: "from-orange-500 to-red-500" },
    { label: "Profissionais", value: "100+", icon: "👥", color: "from-green-500 to-emerald-500" },
    { label: "Cobertura", value: "Maputo", icon: "📍", color: "from-purple-500 to-pink-500" },
  ];

  // Cores para os cards de categorias
  const categoryColors = [
    { from: 'from-amber-500', to: 'to-orange-500', light: 'from-amber-50', border: 'border-amber-200' },
    { from: 'from-sky-500', to: 'to-blue-500', light: 'from-sky-50', border: 'border-sky-200' },
    { from: 'from-emerald-500', to: 'to-green-500', light: 'from-emerald-50', border: 'border-emerald-200' },
    { from: 'from-purple-500', to: 'to-pink-500', light: 'from-purple-50', border: 'border-purple-200' },
    { from: 'from-red-500', to: 'to-rose-500', light: 'from-red-50', border: 'border-red-200' },
    { from: 'from-indigo-500', to: 'to-blue-500', light: 'from-indigo-50', border: 'border-indigo-200' },
    { from: 'from-stone-500', to: 'to-zinc-500', light: 'from-stone-50', border: 'border-stone-200' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Mantido igual */}
      <div className="h-96 relative flex items-center justify-center text-white overflow-hidden" style={{ backgroundColor: service.color }}>
        <div className="absolute inset-0 opacity-20 pattern-dots"></div>
        <div className="relative z-10 text-center px-6">
           <span className="text-xs font-black uppercase tracking-[0.4em] mb-4 block opacity-80">Serviços Expressos</span>
           <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter drop-shadow-lg">{service.title}</h1>
           <div className="flex items-center justify-center gap-2">
              <span className="h-1 w-12 bg-white rounded-full"></span>
              <span className="uppercase tracking-[0.3em] font-bold text-sm">Soluções Corporativas & Domésticas</span>
              <span className="h-1 w-12 bg-white rounded-full"></span>
           </div>
        </div>
      </div>

      <div className="container mx-auto py-16 px-6">
        {/* Stats Cards com animação */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-90`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="relative z-10">
                <span className="text-3xl mb-2 block">{stat.icon}</span>
                <p className="text-2xl font-black mb-1">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visão Geral - Mantido */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Visão Geral do Serviço</h2>
          <p className="text-gray-600 text-xl leading-relaxed font-light">
            {service.fullDescription || service.description}
          </p>
        </div>

        {/* Seção de Categorias Premium 2026 */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <span className="text-dexOrange font-black text-xs uppercase tracking-[0.5em] mb-4 block">
                CATEGORIAS DETALHADAS
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-dexDarkBlue tracking-tight">
                Mais de <span className="text-dexOrange">30 serviços</span>
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl">
                Explore todas as categorias e encontre o serviço perfeito para sua necessidade
              </p>
            </div>

            {/* Barra de Pesquisa */}
            <div className="w-full md:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pr-12 rounded-full border-2 border-gray-200 focus:border-dexOrange focus:ring-4 focus:ring-dexOrange/20 transition-all text-lg"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
              </div>
            </div>
          </div>

          {/* Filtros Rápidos */}
          <div className="flex flex-wrap gap-3 mb-12">
            {[
              { id: "todos", label: "Todos", icon: "🌟" },
              { id: "domesticos", label: "Domésticos", icon: "🏠" },
              { id: "comerciais", label: "Comerciais", icon: "🏢" },
              { id: "tecnicos", label: "Técnicos", icon: "🔧" },
            ].map((filtro) => (
              <button
                key={filtro.id}
                onClick={() => setFilterType(filtro.id)}
                className={`
                  px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 flex items-center gap-2
                  ${filterType === filtro.id 
                    ? 'bg-dexOrange text-white shadow-xl' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                <span className="text-xl">{filtro.icon}</span>
                {filtro.label}
              </button>
            ))}
          </div>

          {/* Grid de Categorias Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((categoria, index) => {
              // CORREÇÃO: Usar cores com fallback seguro
              const colorScheme = categoryColors[index % categoryColors.length] || {
                from: 'from-gray-500',
                to: 'to-gray-600',
                light: 'from-gray-50',
                border: 'border-gray-200'
              };

              return (
                <div
                  key={categoria.id}
                  className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedCategory(selectedCategory === categoria.id ? null : categoria.id)}
                >
                  {/* Gradiente de fundo */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.from} ${colorScheme.to} opacity-90`} />
                  
                  {/* Padrão de pontos decorativos */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                  }} />
                  
                  {/* Efeito de brilho no hover */}
                  <div className={`
                    absolute inset-0 bg-white/20 transition-opacity duration-500
                    ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}
                  `} />

                  <div className="relative p-8 text-white z-10">
                    {/* Header da Categoria */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl border border-white/30">
                          {categoria.icon}
                        </div>
                        <h3 className="text-2xl font-black drop-shadow-lg">{categoria.title}</h3>
                      </div>
                      
                      {/* Indicador de expansão animado */}
                      <div className={`
                        w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center
                        transition-transform duration-500 border border-white/30
                        ${selectedCategory === categoria.id ? 'rotate-180' : ''}
                      `}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Descrição */}
                    <p className="text-white/90 text-sm mb-4 line-clamp-2 drop-shadow">
                      {categoria.description}
                    </p>

                    {/* Contador de serviços */}
                    <div className="flex items-center justify-between">
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold border border-white/30">
                        {categoria.items.length} serviços
                      </span>
                      <span className="text-xs opacity-75">
                        Clique para {selectedCategory === categoria.id ? 'recolher' : 'expandir'}
                      </span>
                    </div>

                    {/* Lista de serviços expandível */}
                    {selectedCategory === categoria.id && (
                      <div className="mt-6 pt-6 border-t border-white/30 animate-slideDown">
                        <h4 className="text-sm font-black mb-4 flex items-center gap-2">
                          <span className="w-1 h-4 bg-white rounded-full" />
                          Serviços disponíveis:
                        </h4>
                        <ul className="grid grid-cols-1 gap-3">
                          {categoria.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm text-white/90 group/item"
                              style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                              <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                              </span>
                              <span className="flex-1 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mensagem quando não há resultados */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="text-2xl font-black text-gray-700 mb-2">Nenhum serviço encontrado</h3>
              <p className="text-gray-400">Tente pesquisar com outras palavras</p>
            </div>
          )}
        </div>

        {/* Grid de Confiabilidade e Eficiência - Mantido */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 group hover:border-dexBlue transition-colors">
            <div className="text-dexBlue mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2">Confiabilidade</h4>
            <p className="text-gray-600 font-medium italic">Sistemas de verificação e controle de qualidade para sua total paz de espírito.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 group hover:border-dexOrange transition-colors">
            <div className="text-dexOrange mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2">Eficiência</h4>
            <p className="text-gray-600 font-medium italic">Redução de tempo e custos através de processos otimizados e tecnologia via expressa.</p>
          </div>
        </div>

        {/* Processo de Funcionamento com Animações */}
        <div className="mb-20">
          <div className="inline-block bg-gray-100 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 text-gray-500">
            FLUXO DE ATENDIMENTO
          </div>
          <h3 className="text-3xl font-black mb-10 tracking-tight text-gray-900">
            O Processo <span className="text-dexOrange">Expresso</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                number: "01", 
                title: "BUSQUE O SERVIÇO", 
                desc: "Navegue por categorias ou busque pelo serviço específico que precisa em nossa plataforma.",
                icon: "🔍",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                number: "02", 
                title: "ESCOLHA O PRESTADOR", 
                desc: "Veja perfis verificados, avaliações reais e escolha o melhor profissional.",
                icon: "👤",
                color: "from-orange-500 to-red-500"
              },
              { 
                number: "03", 
                title: "AGENDE E PAGUE", 
                desc: "Marque data e horário de sua preferência e pague de forma segura.",
                icon: "💳",
                color: "from-green-500 to-emerald-500"
              },
              { 
                number: "04", 
                title: "AVALIE O SERVIÇO", 
                desc: "Após a conclusão, avalie o profissional e compartilhe sua experiência.",
                icon: "⭐",
                color: "from-purple-500 to-pink-500"
              },
            ].map((step, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-float-up-down"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredCard(index + 10)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-6xl font-black text-gray-100 group-hover:text-gray-200 transition-colors">
                      {step.number}
                    </span>
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {step.icon}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-black text-gray-900 mb-3 group-hover:text-dexOrange transition-colors">
                    {step.title}
                  </h4>
                  
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Barra de progresso animada */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                    <div className={`
                      h-full bg-gradient-to-r ${step.color} transition-all duration-500
                      ${hoveredCard === index + 10 ? 'w-full' : 'w-0'}
                    `} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-gray-900 to-dexDarkBlue rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }} />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-black mb-6">
                Precisa de um serviço <span className="text-dexOrange">específico</span>?
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Nossa equipe está pronta para encontrar o profissional ideal para você
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-dexOrange text-white font-black px-8 py-4 rounded-xl hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl"
                >
                  Falar com a equipa
                </Link>
                <Link
                  to="/services"
                  className="bg-white/10 backdrop-blur-sm text-white font-black px-8 py-4 rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  Ver todos os serviços
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar e Request Quote */}
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <RequestQuoteSection serviceName={service.title} />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-900 text-white p-10 rounded-3xl sticky top-32 shadow-2xl border border-white/5 overflow-hidden animate-float-slow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-dexOrange opacity-5 rounded-full -mr-16 -mt-16"></div>
              <h3 className="text-2xl font-bold mb-6 relative z-10">Inicie sua Via Expressa</h3>
              <p className="text-gray-400 mb-8 font-light relative z-10">
                Interessado em implementar este serviço? Nossa equipe está pronta para lhe atender via e-mail direto.
              </p>
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
                <button 
                  type="submit" 
                  className="w-full bg-dexOrange py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/20 mt-2 flex items-center justify-center gap-2"
                >
                  Enviar E-mail Direto
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
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
