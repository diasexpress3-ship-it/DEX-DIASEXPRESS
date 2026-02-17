
import React from "react";
import { Link } from "react-router-dom";

const InviteExpressCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-dexGreen p-10 rounded-3xl shadow-2xl text-white max-w-2xl mx-auto group">
      {/* Decorative circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white bg-opacity-10 rounded-full transition-transform group-hover:scale-125 duration-700"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white bg-opacity-10 rounded-full transition-transform group-hover:scale-110 duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="bg-white p-3 rounded-2xl mr-4 shadow-lg">
             <svg className="w-8 h-8 text-dexGreen" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
             </svg>
          </div>
          <h3 className="text-3xl font-black tracking-tight">InviteExpress</h3>
        </div>
        
        <p className="text-lg text-white text-opacity-90 mb-8 leading-relaxed">
          Transforme a forma como você convida seus convidados. Nossa plataforma permite criar, enviar e monitorar confirmações de forma totalmente digital, sustentável e rápida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/inviteexpress" className="inline-flex items-center justify-center bg-white text-dexGreen font-bold px-8 py-4 rounded-2xl hover:bg-opacity-90 transition-all shadow-xl">
            Acesse o Serviço
          </Link>
          <Link to="/contact" className="inline-flex items-center justify-center bg-dexGreen border-2 border-white border-opacity-30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white hover:text-dexGreen transition-all">
            Falar com Consultor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InviteExpressCard;
