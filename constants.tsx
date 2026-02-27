import { ServiceInfo, Partner } from './types';

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
- DIASEXPRESS Soluções Domésticas: Conecta clientes a eletricistas e canalizadores qualificados.
- Nexus Aqua Manager: Gestão inteligente de consumo de água via captura de imagens e monitoramento em tempo real.
- DEX GastroManager: Gestão de inventário e vendas para bares e restaurantes com QR Code.
- InviteExpress: Convites digitais inteligentes com confirmação em tempo real.

Fundador: Vicente Dias.
Localização: Maputo, Moçambique.

Sempre ofereça ajuda para explicar serviços ou direcionar para a página de contato. Responda de forma concisa e amigável.
`;

// Mapeamento de imagens por ID do serviço - MIX DE JPG E GIF
const SERVICE_IMAGE_MAP: Record<string, string> = {
  // Imagem estática para DiasExpress
  diasexpress: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
  
  // GIF animado para AquaManager (monitoramento de água)
  aquamanager: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWp4d3Z6b3R4c2p0b3R4c2p0b3R4c2p0b3R4c2p0b3R4c2p0b3R4c2p0c2p0c2p0/3o7abKhOpu0ixowjeU/giphy.gif", // Exemplo - substituir por GIF real
  
  // Imagem estática para GastroManager
  gastromanager: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
  
  // GIF animado para InviteExpress (convites animados)
  inviteexpress: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3Z6c3R4c2p0b3R4c2p0b3R4c2p0b3R4c2p0b3R4c2p0b3R4c2p0c2p0c2p0/26ufdipQqU2lhNA4g/giphy.gif" // Exemplo - substituir por GIF real
};

export const SERVICES: ServiceInfo[] = [
  { 
    id: "diasexpress",
    title: "DIASEXPRESS Soluções Domésticas", 
    description: "Serviços domésticos confiáveis: eletricistas, canalizadores e técnicos monitorados.", 
    fullDescription: "Conectamos você a profissionais qualificados para manutenção residencial, garantindo segurança e o selo de qualidade DEX em cada tarefa do seu dia-a-dia.",
    color: "#FF7A00", 
    link: "/services/diasexpress",
    image: SERVICE_IMAGE_MAP.diasexpress
  },
  { 
    id: "aquamanager",
    title: "Nexus Aqua Manager", 
    description: "Gestão inteligente de consumo de água baseada em imagens e monitoramento real-time.", 
    fullDescription: "Solução avançada para monitoramento hídrico. Captura de consumo baseada em imagens (OCR), monitoramento em tempo real e gestão eficiente de exclusões para condomínios e empresas.",
    color: "#0EA5E9", 
    link: "/aquamanager",
    image: SERVICE_IMAGE_MAP.aquamanager
  },
  { 
    id: "gastromanager",
    title: "DEX GastroManager", 
    description: "Gestão inteligente de inventário e vendas para bares e restaurantes.", 
    fullDescription: "Uma solução robusta para o setor de restauração. Monitore inventário, tendências de vendas e gere QR Codes por produto em tempo real.",
    color: "#0A1D56", 
    link: "/gastromanager",
    image: SERVICE_IMAGE_MAP.gastromanager
  },
  { 
    id: "inviteexpress",
    title: "InviteExpress", 
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
    description: "Eletricistas e canalizadores profissionais para sua residência.",
    isGif: false // Opcional: para identificar se é GIF
  },
  {
    url: SERVICE_IMAGE_MAP.aquamanager,
    title: "Nexus Aqua Manager",
    service: "aquamanager",
    description: "Monitoramento hídrico e faturamento inteligente com leitura via imagem.",
    isGif: true // Este é um GIF
  },
  {
    url: SERVICE_IMAGE_MAP.gastromanager,
    title: "Gestão Gastro",
    service: "gastromanager",
    description: "Controle de inventário e vendas para o setor gastronômico.",
    isGif: false
  },
  {
    url: SERVICE_IMAGE_MAP.inviteexpress,
    title: "Convites Digitais",
    service: "inviteexpress",
    description: "Tecnologia digital para convites de eventos de todos os tipos.",
    isGif: true // Este é um GIF
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
