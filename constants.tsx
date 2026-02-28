import { ServiceInfo, Partner, DiasexpressCategory } from './types';

export const SLOGAN = "Simplificando Seu Dia";
export const BRAND_NAME = "DEX | DIASEXPRESS";
export const COMPANY_EMAIL = "diasexpress3@gmail.com";
export const COMPANY_PHONE = "+258 87 142 5316";
export const COMPANY_WHATSAPP = "258871425316";
export const COMPANY_LINKEDIN = "https://www.linkedin.com/in/vicente-dias";

export const AI_SYSTEM_INSTRUCTION = `
Você é o Assistente Inteligente da DEX | DIASEXPRESS. Sua missão é "Simplificar o Dia" dos clientes em Moçambique.
Seu tom é profissional, ágil e inovador.

Informações da Empresa:
- DEX-SOLUÇÕES DOMÉSTICAS: Plataforma de serviços domésticos gerida pela DEX, conectando clientes a prestadores de confiança.
- DEX-ATS-PRO: Primeiro ATS moçambicano com Chatbot WhatsApp para recrutamento inteligente.
- AQUA MANAGER: Gestão inteligente de consumo de água via captura de imagens e monitoramento em tempo real.
- DEX GASTROMANAGER: Gestão de inventário e vendas para bares e restaurantes com QR Code.
- INVITEEXPRESS: Convites digitais inteligentes com confirmação em tempo real.

Fundador: Vicente Dias.
Localização: Maputo, Moçambique.

Sempre ofereça ajuda para explicar serviços ou direcionar para a página de contato. Responda de forma concisa e amigável.
`;

// Mapeamento de imagens por ID do serviço
const SERVICE_IMAGE_MAP: Record<string, string> = {
  diasexpress: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
  dexAts: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
  aquamanager: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  gastromanager: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
  inviteexpress: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
};

export const SERVICES: ServiceInfo[] = [
  { 
    id: "diasexpress",
    title: "DEX-SOLUÇÕES DOMÉSTICAS", 
    description: "Plataforma de serviços domésticos gerida pela DEX, conectando clientes a prestadores de confiança.", 
    fullDescription: "Conectamos você a profissionais qualificados para manutenção residencial, garantindo segurança e o selo de qualidade DEX em cada tarefa do seu dia-a-dia.",
    color: "#FF7A00", 
    link: "/services/diasexpress",
    image: SERVICE_IMAGE_MAP.diasexpress,
    categories: []
  },
  { 
    id: "dex-ats",
    title: "DEX-ATS-PRO", 
    description: "Primeiro ATS moçambicano com Chatbot WhatsApp para recrutamento inteligente.", 
    fullDescription: "Plataforma completa de recrutamento com sistema de rastreamento de candidatos, chatbot de triagem via WhatsApp, gestão multi-cliente e relatórios avançados. Reduza em 70% o tempo de triagem e aumente em 50% a taxa de conversão.",
    color: "#8B5CF6", 
    link: "/dex-ats-pro",
    image: SERVICE_IMAGE_MAP.dexAts
  },
  { 
    id: "aquamanager",
    title: "AQUA MANAGER", 
    description: "Gestão inteligente de consumo de água baseada em imagens e monitoramento real-time.", 
    fullDescription: "Solução avançada para monitoramento hídrico. Captura de consumo baseada em imagens (OCR), monitoramento em tempo real e gestão eficiente de exclusões para condomínios e empresas.",
    color: "#0EA5E9", 
    link: "/aquamanager",
    image: SERVICE_IMAGE_MAP.aquamanager
  },
  { 
    id: "gastromanager",
    title: "DEX GASTROMANAGER", 
    description: "Gestão inteligente de inventário e vendas para bares e restaurantes.", 
    fullDescription: "Uma solução robusta para o setor de restauração. Monitore inventário, tendências de vendas e gere QR Codes por produto em tempo real.",
    color: "#0A1D56", 
    link: "/gastromanager",
    image: SERVICE_IMAGE_MAP.gastromanager
  },
  { 
    id: "inviteexpress",
    title: "INVITEEXPRESS", 
    description: "Gestão de convites digitais inteligentes para todos os tipos de eventos.", 
    fullDescription: "A tecnologia da DEX para seus eventos. Crie convites digitais, publique e entregue via QR Code com confirmação em tempo real.",
    color: "#4CAF50", 
    link: "/inviteexpress",
    image: SERVICE_IMAGE_MAP.inviteexpress
  }
];

export const SERVICE_IMAGES = [
  {
    url: SERVICE_IMAGE_MAP.diasexpress,
    title: "Soluções Domésticas",
    service: "diasexpress",
    description: "Profissionais verificados para sua casa e empresa.",
    isGif: false
  },
  {
    url: SERVICE_IMAGE_MAP.dexAts,
    title: "ATS Recrutamento",
    service: "dex-ats",
    description: "Recrutamento inteligente com chatbot WhatsApp.",
    isGif: false
  },
  {
    url: SERVICE_IMAGE_MAP.aquamanager,
    title: "Gestão de Água",
    service: "aquamanager",
    description: "Monitoramento hídrico com leitura por imagem.",
    isGif: false
  },
  {
    url: SERVICE_IMAGE_MAP.gastromanager,
    title: "Gestão Gastro",
    service: "gastromanager",
    description: "Controle de inventário e vendas.",
    isGif: false
  },
  {
    url: SERVICE_IMAGE_MAP.inviteexpress,
    title: "Convites Digitais",
    service: "inviteexpress",
    description: "Convites inteligentes com QR Code.",
    isGif: false
  }
];

// DIASEXPRESS CATEGORIES - 7 categorias com mais de 30 serviços
export const DIASEXPRESS_CATEGORIES: DiasexpressCategory[] = [
  {
    id: "domesticos-gerais",
    title: "🏠 Serviços Domésticos Gerais",
    description: "Serviços essenciais para manutenção e organização do lar, garantindo conforto, higiene e bem-estar no dia a dia.",
    items: [
      "Limpeza doméstica (regular / profunda)",
      "Organização de casas",
      "Lavagem de loiça",
      "Lavandaria e engomadoria",
      "Limpeza pós-obra",
      "Limpeza pós-mudança"
    ],
    icon: "🏠",
    gradient: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-200",
    textColor: "text-amber-600"
  },
  {
    id: "limpeza-especializada",
    title: "🧹 Limpeza Especializada",
    description: "Serviços profissionais de limpeza para ambientes comerciais, empresariais e espaços de grande circulação, com padrões elevados de higiene e segurança.",
    items: [
      "Limpeza de escritórios",
      "Limpeza de condomínios",
      "Limpeza de lojas",
      "Limpeza de armazéns",
      "Limpeza industrial leve",
      "Higienização de espaços",
      "Desinfeção (casas e empresas)"
    ],
    icon: "🧹",
    gradient: "from-sky-500/10 to-blue-500/10",
    borderColor: "border-sky-200",
    textColor: "text-sky-600"
  },
  {
    id: "manutencao-reparacoes",
    title: "🔧 Manutenção & Reparações",
    description: "Serviços técnicos para resolver problemas domésticos e garantir o bom funcionamento das instalações da residência ou empresa.",
    items: [
      "Canalização",
      "Eletricidade residencial",
      "Reparação de tomadas e interruptores",
      "Reparação de torneiras e sanitas",
      "Instalação de chuveiros",
      "Reparação geral doméstica"
    ],
    icon: "🔧",
    gradient: "from-stone-500/10 to-zinc-500/10",
    borderColor: "border-stone-200",
    textColor: "text-stone-600"
  },
  {
    id: "carpintaria-marcenaria",
    title: "🪚 Carpintaria & Marcenaria",
    description: "Serviços especializados em madeira, montagem e ajustes estruturais, com acabamento profissional e durabilidade.",
    items: [
      "Reparação de portas",
      "Reparação de janelas",
      "Montagem de móveis",
      "Fabrico de móveis sob medida",
      "Ajustes de fechaduras",
      "Trabalhos em madeira"
    ],
    icon: "🪚",
    gradient: "from-amber-800/10 to-yellow-800/10",
    borderColor: "border-amber-700",
    textColor: "text-amber-800"
  },
  {
    id: "construcao-obras",
    title: "🧱 Construção & Obras",
    description: "Serviços de construção e melhoria de espaços residenciais e comerciais, com foco em qualidade, segurança e acabamento moderno.",
    items: [
      "Pequenas obras",
      "Pintura residencial",
      "Pintura comercial",
      "Reboco",
      "Assentamento de azulejos",
      "Gesso e teto falso",
      "Impermeabilização"
    ],
    icon: "🧱",
    gradient: "from-red-500/10 to-orange-500/10",
    borderColor: "border-red-200",
    textColor: "text-red-600"
  },
  {
    id: "jardinagem-exteriores",
    title: "🌿 Jardinagem & Espaços Exteriores",
    description: "Serviços voltados para manutenção, embelezamento e organização de áreas externas residenciais e empresariais.",
    items: [
      "Jardinagem residencial",
      "Corte de relva",
      "Manutenção de jardins",
      "Paisagismo",
      "Limpeza de quintais",
      "Plantio de árvores e flores"
    ],
    icon: "🌿",
    gradient: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-200",
    textColor: "text-green-600"
  },
  {
    id: "empregadas-babas",
    title: "🧑🏾‍🍳 Empregadas Domésticas & Babás",
    description: "Serviço premium de fornecimento de profissionais domésticas e babás verificadas, treinadas e selecionadas pela DEX Express, garantindo confiança, responsabilidade e qualidade no atendimento.",
    items: [
      "Empregadas domésticas internas (tempo integral)",
      "Empregadas domésticas externas (tempo parcial)",
      "Diaristas",
      "Babás integrais (tempo completo)",
      "Babás por período",
      "Apoio infantil especializado"
    ],
    icon: "🧑🏾‍🍳",
    gradient: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-200",
    textColor: "text-purple-600"
  }
];

// Perfil de parceiros estratégicos para a rede DEX
export const PARTNERS: Partner[] = [
  {
    name: "Materiais de Construção & Elétricos",
    link: "/contact?service=Parceria Materiais",
    description: "Buscamos lojas e fornecedores de material elétrico, canalização e construção para suprir nossa rede de Soluções Domésticas."
  },
  {
    name: "Restauração, Bares & Lazer",
    link: "/contact?service=Parceria Gastro",
    description: "Estabelecimentos que buscam implementar o DEX GastroManager para otimização de inventário e vendas por QR Code."
  },
  {
    name: "Fornecimento & Gestão Hídrica",
    link: "/contact?service=Parceria Aqua",
    description: "Entidades e gestores de recursos hídricos para integração com a plataforma Nexus Aqua Manager de faturamento inteligente."
  },
  {
    name: "Recrutamento & RH",
    link: "/contact?service=Parceria ATS",
    description: "Empresas de recrutamento interessadas em implementar o DEX-ATS-PRO para otimizar processos de seleção."
  },
  {
    name: "Salões & Organizadores de Eventos",
    link: "/contact?service=Parceria Eventos",
    description: "Profissionais de eventos interessados em oferecer a tecnologia InviteExpress para convites digitais e gestão de convidados."
  },
  {
    name: "Desenvolvimento & Tecnologia",
    link: "/contact?service=Parceria Tech",
    description: "Empresas de software e hardware para cocriação de soluções que sustentam a infraestrutura digital da Holding."
  }
];
