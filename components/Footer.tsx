
import React from "react";
import { Link } from "react-router-dom";
import { SLOGAN, COMPANY_EMAIL, COMPANY_WHATSAPP, COMPANY_LINKEDIN } from "../constants";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dexDarkBlue text-white pt-24 pb-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6">
        <div className="space-y-6">
          <div className="flex flex-col">
            <h2 className="font-black text-3xl tracking-tighter text-white">
              DEX <span className="text-dexOrange">|</span> DIASEXPRESS
            </h2>
            <span className="text-xs font-bold uppercase tracking-widest text-dexOrange opacity-80">{SLOGAN}</span>
          </div>
          <p className="text-blue-200 leading-relaxed font-light">
            Sua parceira estratégica em serviços domésticos e gestão inteligente de eventos em Moçambique.
          </p>
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">CEO & Founder</p>
            <p className="font-black text-xl text-white">Vicente Dias</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-black text-lg mb-8 uppercase tracking-widest text-dexOrange">Unidades</h3>
          <ul className="space-y-4 text-blue-100/70 font-medium">
            <li><Link to="/services/diasexpress" className="hover:text-white transition-colors">DIASEXPRESS Doméstica</Link></li>
            <li><Link to="/inviteexpress" className="hover:text-white transition-colors">InviteExpress Digital</Link></li>
            <li><Link to="/aquamanager" className="hover:text-white transition-colors">Nexus Aqua Manager</Link></li>
            <li><Link to="/gastromanager" className="hover:text-white transition-colors">DEX GastroManager</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">The Express</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-black text-lg mb-8 uppercase tracking-widest text-dexOrange">Institucional</h3>
          <ul className="space-y-4 text-blue-100/70 font-medium">
            <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Sobre a Holding</Link></li>
            <li><Link to="/partners" className="hover:text-white transition-colors">Parceiros</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contato Direto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-black text-lg mb-8 uppercase tracking-widest text-dexOrange">Escritórios</h3>
          <p className="text-blue-100/70 mb-4 leading-relaxed">
            Av. 25 de Setembro<br/>Maputo, Moçambique
          </p>
          <div className="flex gap-4">
             <a 
                href={COMPANY_LINKEDIN} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 p-3 rounded-xl hover:bg-dexBlue hover:shadow-[0_0_20px_rgba(30,78,216,0.5)] transition-all cursor-pointer transform hover:scale-110" 
                aria-label="LinkedIn oficial Vicente Dias"
             >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0-2.761 2.239-5 5-5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
             </a>
             <a 
                href={`https://wa.me/${COMPANY_WHATSAPP}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 p-3 rounded-xl hover:bg-green-600 hover:shadow-[0_0_20px_rgba(22,163,74,0.5)] transition-all cursor-pointer transform hover:scale-110" 
                aria-label="WhatsApp oficial da DEX"
             >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.432h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
             </a>
             <a 
                href={`mailto:${COMPANY_EMAIL}`} 
                className="bg-white/5 p-3 rounded-xl hover:bg-dexOrange hover:shadow-[0_0_20px_rgba(255,122,0,0.5)] transition-all cursor-pointer transform hover:scale-110" 
                aria-label="Enviar Email para a DEX"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
             </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 mt-20 pt-8 text-center text-xs text-blue-200/40 uppercase tracking-[0.2em] font-bold">
        © {new Date().getFullYear()} DEX | DIASEXPRESS. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
