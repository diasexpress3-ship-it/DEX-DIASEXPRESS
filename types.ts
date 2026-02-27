export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface ServiceInfo {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  color: string;
  link: string;
  image: string;
  categories?: ServiceCategory[]; // Opcional para serviços que têm subcategorias
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
