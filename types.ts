
export interface ServiceInfo {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  color: string;
  link: string;
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
