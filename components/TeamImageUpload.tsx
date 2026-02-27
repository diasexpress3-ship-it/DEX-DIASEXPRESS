import React, { useState, useEffect } from 'react';
import { storage, db } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';

interface TeamImageUploadProps {
  currentImageUrl: string;
  name: string;
  role: string;
  onImageUpdate?: (newUrl: string) => void;
}

// Chave da API do ImgBB via variável de ambiente (Vite)
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_KEY || '';

const TeamImageUpload: React.FC<TeamImageUploadProps> = ({
  currentImageUrl,
  name,
  role,
  onImageUpdate
}) => {
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const { isAdmin, loading } = useAuth();

  // LOGS PARA DEBUG - VERIFICAR SE O ADMIN ESTÁ SENDO RECONHECIDO
  console.log('🔑 VITE_IMGBB_KEY:', import.meta.env.VITE_IMGBB_KEY ? '✅ Configurada' : '❌ Não configurada');
  console.log('👤 isAdmin:', isAdmin);
  console.log('👤 loading:', loading);

  useEffect(() => {
    setImageUrl(currentImageUrl);
  }, [currentImageUrl]);

  const saveImageToFirestore = async (imageUrl: string) => {
    try {
      await setDoc(doc(db, 'config', 'founderImage'), {
        url: imageUrl,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      });
      console.log('✅ URL salva no Firestore para todos os usuários!');
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar no Firestore:', error);
      return false;
    }
  };

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return; // Removido !isAdmin temporariamente para teste

    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB.');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(10);

    try {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      setUploadProgress(30);

      try {
        setUploadProgress(50);
        const imgbbUrl = await uploadToImgBB(file);
        setUploadProgress(90);

        setImageUrl(imgbbUrl);
        setUploadProgress(100);
        
        await saveImageToFirestore(imgbbUrl);
        
        if (onImageUpdate) {
          onImageUpdate(imgbbUrl);
        }

        localStorage.setItem('founderImage', imgbbUrl);
        
        console.log('✅ Upload para ImgBB concluído com sucesso! URL:', imgbbUrl);
        
      } catch (uploadError) {
        console.warn('Upload ImgBB falhou, usando modo local (Base64):', uploadError);
        
        setUploadProgress(60);
        
        const reader = new FileReader();
        
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
        
        reader.readAsDataURL(file);
        
        const base64String = await base64Promise;
        setUploadProgress(90);
        
        setImageUrl(base64String);
        
        if (onImageUpdate) {
          onImageUpdate(base64String);
        }

        localStorage.setItem('founderImage', base64String);
        
        console.log('Upload local (Base64) concluído com sucesso!');
      }
      
      URL.revokeObjectURL(objectUrl);
      setTimeout(() => setUploadProgress(0), 2000);
      
    } catch (err) {
      console.error('Erro no upload:', err);
      setError('Erro ao fazer upload. Tente novamente.');
      setImageUrl(currentImageUrl);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="relative">
        <div className="w-full h-96 bg-gray-200 rounded-[2.5rem] animate-pulse"></div>
      </div>
    );
  }

  // POR ENQUANTO, VAMOS MOSTRAR O BOTÃO PARA QUALQUER UM (PARA TESTE)
  // Depois que funcionar, voltamos para if (!isAdmin)
  // if (!isAdmin) {
  //   return ( ... )
  // }

  // VERSÃO COM BOTÃO SEMPRE VISÍVEL PARA TESTE
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setShowUploadButton(true)}
      onMouseLeave={() => setShowUploadButton(false)}
    >
      <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-dexDarkBlue via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-3xl font-black tracking-tight mb-2">{name}</h3>
          <p className="text-dexOrange font-bold text-sm uppercase tracking-widest">{role}</p>
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-dexOrange/30">
            <div 
              className="h-full bg-dexOrange transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {/* BOTÃO DE UPLOAD - Aparece ao passar o mouse (QUALQUER UM POR ENQUANTO) */}
        {showUploadButton && !uploading && (
          <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 cursor-pointer z-20">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-dexOrange rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-bold text-lg">TROCAR FOTO</p>
              <p className="text-sm text-gray-300 mt-2">Clique para selecionar uma imagem</p>
              <p className="text-xs text-dexOrange mt-1">(Admin)</p>
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

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-dexOrange border-t-transparent mx-auto mb-4"></div>
              <p className="text-white font-bold">Enviando imagem...</p>
              <p className="text-white/70 text-sm mt-2">
                {uploadProgress < 50 ? 'Preparando...' : uploadProgress < 80 ? 'Enviando...' : 'Processando...'}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white p-3 rounded-xl text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamImageUpload;
