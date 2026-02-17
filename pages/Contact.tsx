
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ContactForm } from "../types";
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_WHATSAPP } from "../constants";

interface ExtendedContactForm extends ContactForm {
  serviceSelection: string;
}

const Contact: React.FC = () => {
  const location = useLocation();
  const [form, setForm] = useState<ExtendedContactForm>({ 
    name: "", 
    email: "", 
    message: "",
    serviceSelection: "Consulta Geral"
  });
  const [isSent, setIsSent] = useState(false);
  const mailtoLinkRef = useRef<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get("service");
    if (serviceParam) {
      setForm(prev => ({ ...prev, serviceSelection: serviceParam }));
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateMailto = () => {
    const subject = encodeURIComponent(`Solicitação de Orçamento: ${form.serviceSelection} - ${form.name}`);
    const body = encodeURIComponent(
      `Olá Equipe DEX | DIASEXPRESS,%0D%0A%0D%0A` +
      `Gostaria de solicitar um orçamento detalhado para: ${form.serviceSelection}.%0D%0A%0D%0A` +
      `DADOS DO CLIENTE:%0D%0A` +
      `--------------------------------%0D%0A` +
      `Nome: ${form.name}%0D%0A` +
      `E-mail: ${form.email}%0D%0A%0D%0A` +
      `MENSAGEM ADICIONAL:%0D%0A` +
      `${form.message}%0D%0A%0D%0A` +
      `--------------------------------%0D%0A` +
      `Enviado via Portal DEX.`
    );
    return `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = generateMailto();
    mailtoLinkRef.current = link;
    window.location.href = link;
    setIsSent(true);
  };

  const handleManualOpen = () => {
    window.location.href = mailtoLinkRef.current || generateMailto();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
           {/* Contact Info Sidebar */}
           <div className="lg:w-2/5 bg-dexBlue p-16 text-white relative">
              <div className="relative z-10">
                <h2 className="text-4xl font-black mb-8 tracking-tight">Canais Diretos</h2>
                <p className="text-blue-100 text-lg mb-12 font-light leading-relaxed">
                  Escolha como prefere iniciar sua jornada de eficiência com a DEX.
                </p>
                
                <div className="space-y-8">
                   <a href={`mailto:${COMPANY_EMAIL}`} className="flex items-start gap-6 hover:translate-x-2 transition-transform group">
                      <div className="bg-white bg-opacity-10 p-4 rounded-2xl group-hover:bg-dexOrange transition-colors">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      </div>
                      <div>
                         <h4 className="font-bold text-lg">E-mail Corporativo</h4>
                         <p className="text-blue-200 group-hover:text-white transition-colors">{COMPANY_EMAIL}</p>
                      </div>
                   </a>
                   <a href={`https://wa.me/${COMPANY_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 hover:translate-x-2 transition-transform group">
                      <div className="bg-white bg-opacity-10 p-4 rounded-2xl group-hover:bg-green-500 transition-colors">
                         <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.432h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </div>
                      <div>
                         <h4 className="font-bold text-lg">WhatsApp Business</h4>
                         <p className="text-blue-200 group-hover:text-white transition-colors">{COMPANY_PHONE}</p>
                      </div>
                   </a>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-dexOrange"></div>
           </div>

           {/* Form Section */}
           <div className="lg:w-3/5 p-16">
              {isSent ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-8 animate-fadeIn">
                   <div className="relative">
                      <div className="absolute inset-0 bg-dexGreen opacity-20 blur-2xl rounded-full animate-pulse"></div>
                      <div className="w-28 h-28 bg-dexGreen rounded-full flex items-center justify-center text-white shadow-2xl relative z-10">
                         <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <h2 className="text-4xl font-black text-gray-900 tracking-tight">Preparando seu E-mail...</h2>
                      <p className="text-gray-500 text-lg max-w-sm mx-auto leading-relaxed">
                        Seu aplicativo de e-mail padrão deve abrir agora para você finalizar o envio.
                      </p>
                   </div>

                   <div className="flex flex-col gap-4 w-full max-w-xs">
                      <button 
                        onClick={handleManualOpen}
                        className="bg-dexBlue text-white font-black py-4 rounded-2xl hover:bg-dexDarkBlue transition-all shadow-xl flex items-center justify-center gap-2 group"
                      >
                         ABRIR MEU E-MAIL AGORA
                         <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                      </button>
                      <button 
                        onClick={() => setIsSent(false)} 
                        className="text-gray-400 font-bold text-sm hover:text-dexOrange transition-colors uppercase tracking-widest"
                      >
                        ← Editar Informações
                      </button>
                   </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6 animate-fadeIn">
                  <div className="mb-4">
                    <h3 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Solicitar Orçamento</h3>
                    <p className="text-gray-400 font-medium italic">Transforme sua ideia em uma Via Expressa hoje.</p>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="group">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-dexBlue transition-colors">Seu Nome</label>
                        <input 
                          required
                          type="text" 
                          name="name" 
                          placeholder="Como se chama?" 
                          value={form.name} 
                          onChange={handleChange} 
                          className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-dexBlue focus:bg-white rounded-2xl outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-dexBlue transition-colors">E-mail de Contato</label>
                        <input 
                          required
                          type="email" 
                          name="email" 
                          placeholder="seu@email.com" 
                          value={form.email} 
                          onChange={handleChange} 
                          className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-dexBlue focus:bg-white rounded-2xl outline-none transition-all font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-dexBlue transition-colors">Qual serviço você busca?</label>
                      <div className="relative">
                        <select 
                          name="serviceSelection" 
                          value={form.serviceSelection} 
                          onChange={handleChange} 
                          className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-dexBlue focus:bg-white rounded-2xl outline-none transition-all appearance-none font-bold text-dexDarkBlue"
                        >
                          <option>Consulta Geral</option>
                          <option>DIASEXPRESS Soluções Domésticas</option>
                          <option>Nexus Aqua Manager (Água)</option>
                          <option>DEX GastroManager (Restauração)</option>
                          <option>InviteExpress Digital</option>
                          <option>Parceria Estratégica</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-dexBlue">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-dexBlue transition-colors">Detalhes do Pedido</label>
                      <textarea 
                        required
                        name="message" 
                        placeholder="Descreva seu projeto ou necessidade..." 
                        value={form.message} 
                        onChange={handleChange} 
                        className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-dexBlue focus:bg-white rounded-2xl outline-none transition-all h-40 resize-none font-medium"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="group bg-dexOrange text-white font-black py-5 px-10 rounded-2xl hover:bg-orange-600 transition-all transform hover:scale-[1.02] shadow-xl shadow-orange-900/10 flex items-center justify-center relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      GERAR E-MAIL DE ORÇAMENTO
                      <svg className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </form>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
