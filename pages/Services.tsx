
import React from "react";
import ServiceCard from "../components/ServiceCard";
import RequestQuoteSection from "../components/RequestQuoteSection";
import { SERVICES } from "../constants";

const Services: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-white border-b py-20 px-6">
         <div className="container mx-auto text-center">
            <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Nossos Serviços</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
               Soluções desenhadas para maximizar sua produtividade e tranquilidade. Escolha a solução que melhor se adapta às suas necessidades.
            </p>
         </div>
      </div>

      <div className="container mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SERVICES.map((s, index) => (
            <div key={s.id} className="h-full">
               <ServiceCard {...s} index={index} />
            </div>
          ))}
        </div>

        <RequestQuoteSection />
      </div>
    </div>
  );
};

export default Services;
