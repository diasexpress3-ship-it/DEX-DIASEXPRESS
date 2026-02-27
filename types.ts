export interface ServiceInfo {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  color: string;
  link: string;
  image: string; // ADICIONADO: imagem padrão do serviço
}

export interface Partner {
  name: string;
  link: string;
  description?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// Interface para as imagens do Firestore
export interface ServiceImages {
  [key: `service_${string}`]: string;
  updatedAt?: string;
}
