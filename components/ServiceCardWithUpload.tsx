import React, { useState } from 'react';
import { db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import ServiceCard from './ServiceCard';

interface ServiceCardWithUploadProps {
  service: {
    id: number;
    title: string;
    description: string;
    color: string;
    link: string;
    image: string; // URL da imagem original
  };
  index: number;
  onImageUpdate?: (serviceId: number, newUrl: string) => void;
}

// Chave da API do ImgBB
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_KEY || '';

const ServiceCardWithUpload: React.FC<ServiceCardWithUploadProps> = ({
  service,
  index,
  onImageUpdate
}) => {
  const [currentImage, setCurrentImage] = useState(service.image);
  const [uploading, setUploading] = useState(false);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const { isAdmin } = useAuth();

  const uploadToImgBB = async (file: File): Promise<string> => {
    if (!IMGBB_API_KEY) {
      throw new Error('Chave da API do ImgBB não configurada');
    }

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Falha no upload para o ImgBB');
    }

    const data = await response.json();
    return data.data.url;
  };

  const saveToFirestore = async (imageUrl: string) => {
    try {
      await setDoc(doc(db, 'config', 'serviceImages'), {
        [`service_${service.id}`]: imageUrl,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      console.log(`✅ URL salva para serviço ${service.id}`);
    } catch (error) {
      console.log(`⚠️ Erro ao salvar no Firestore:`, error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isAdmin) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione uma imagem válida.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    setUploading(true);

    try {
      // Preview local
      const objectUrl = URL.createObjectURL(file);
      setCurrentImage(objectUrl);

      // Upload para ImgBB
      const imgbbUrl = await uploadToImgBB(file);
      
      // Atualizar imagem
      setCurrentImage(imgbbUrl);
      
      // Salvar no Firestore
      await saveToFirestore(imgbbUrl);
      
      // Salvar no localStorage
      localStorage.setItem(`service_${service.id}_image`, imgbbUrl);
      
      // Notificar componente pai
      if (onImageUpdate) {
        onImageUpdate(service.id, imgbbUrl);
      }
      
      URL.revokeObjectURL(objectUrl);
      
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload. Tente novamente.');
      setCurrentImage(service.image);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div 
      className="relative h-full"
      onMouseEnter={() => isAdmin && setShowUploadButton(true)}
      onMouseLeave={() => isAdmin && setShowUploadButton(false)}
    >
      <ServiceCard
        title={service.title}
        description={service.description}
        color={service.color}
        link={service.link}
        index={index}
        backgroundImage={currentImage}
      />
      
      {/* Botão de upload para admin */}
      {isAdmin && showUploadButton && !uploading && (
        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer transition-opacity rounded-3xl z-20">
          <div className="text-center text-white">
            <div className="w-12 h-12 bg-dexOrange rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-bold text-sm">TROCAR IMAGEM</p>
          </div>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}
      
      {/* Loading overlay */}
      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-3xl z-20">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-dexOrange border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default ServiceCardWithUpload;
