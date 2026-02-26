import React, { useState, useEffect } from 'react';
import { storage } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../hooks/useAuth';

interface TeamImageUploadProps {
  currentImageUrl: string;
  name: string;
  role: string;
  onImageUpdate?: (newUrl: string) => void;
}

// Chave da API do ImgBB via variável de ambiente
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY || '';

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
  const { isAdmin, loading } = useAuth();

  // Atualizar imagem quando a prop mudar
  useEffect(() => {
    setImageUrl(currentImageUrl);
  }, [currentImageUrl]);

  // Função para fazer upload para o ImgBB
  const uploadToImgBB = async (file: File): Promise<string> => {
    // Verificar se a chave da API está configurada
    if (!IMGBB_API_KEY) {
      throw new Error('Chave da API do ImgBB não configurada. Adicione NEXT_PUBLIC_IMGBB_KEY no .env');
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
    
    if (!data.success) {
      throw new Error(data.error?.message || 'Erro desconhecido no ImgBB');
    }

    // Retorna a URL direta da imagem
    return data.data.url;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isAdmin) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida.');
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB.');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(10);

    try {
      // Criar preview local IMEDIATAMENTE
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      setUploadProgress(30);

      // Tentar upload para ImgBB
      try {
        setUploadProgress(50);
        const imgbbUrl = await uploadToImgBB(file);
        setUploadProgress(90);

        // Atualizar com URL real do ImgBB
        setImageUrl(imgbbUrl);
        setUploadProgress(100);
        
        // Notificar componente pai
        if (onImageUpdate) {
          onImageUpdate(imgbbUrl);
        }

        // Salvar no localStorage como backup
        localStorage.setItem('founderImage', imgbbUrl);
        
        console.log('✅ Upload para ImgBB concluído com sucesso! URL:', imgbbUrl);
        
      } catch (uploadError) {
        console.warn('Upload ImgBB falhou, usando modo local (Base64):', uploadError);
        
        // FALLBACK: Salvar imagem localmente como Base64
        setUploadProgress(60);
        
        const reader = new FileReader();
        
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
        
        reader.readAsDataURL(file);
        
        const base64String = await base64Promise;
        setUploadProgress(90);
        
        // Atualizar com URL Base64
        setImageUrl(base64String);
        
        // Notificar componente pai com a string Base64
        if (onImageUpdate) {
          onImageUpdate(base64String);
        }

        // Salvar Base64 no localStorage
        localStorage.setItem('founderImage', base64String);
        
        console.log('Upload local (Base64) concluído com sucesso!');
      }
      
      // Limpar preview URL
      URL.revokeObjectURL(objectUrl);
      
      // Limpar progresso após 2 segundos
      setTimeout(() => setUploadProgress(0), 2000);
      
    } catch (err) {
      console.error('Erro no upload:', err);
      setError('Erro ao fazer upload. Tente novamente.');
      
      // Reverter para imagem anterior
      setImageUrl(currentImageUrl);
      
    } finally {
      setUploading(false);
    }
  };

  // Se está carregando, mostra um placeholder
  if (loading) {
    return (
      <div className="relative">
        <div className="w-full h-96 bg-gray-200 rounded-[2.5rem] animate-pulse"></div>
      </div>
    );
  }

  // Se não é admin, mostra apenas a imagem sem opção de upload
  if (!isAdmin) {
    return (
      <div className="relative group">
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dexDarkBlue via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-3xl font-black tracking-tight mb-2">{name}</h3>
            <p className="text-dexOrange font-bold text-sm uppercase tracking-widest">{role}</p>
          </div>
        </div>
      </div>
    );
  }

  // Se é admin, mostra com opção de upload
  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-dexDarkBlue via-transparent to-transparent opacity-60"></div>
        
        {/* Informações do membro */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-3xl font-black tracking-tight mb-2">{name}</h3>
          <p className="text-dexOrange font-bold text-sm uppercase tracking-widest">{role}</p>
        </div>

        {/* Barra de progresso do upload */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-dexOrange/30">
            <div 
              className="h-full bg-dexOrange transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {/* Botão de upload (aparece ao passar o mouse) */}
        {isAdmin && (
          <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-dexOrange rounded-full flex items-center justify-center mx-auto mb-4 transform scale-90 group-hover:scale-100 transition-transform">
                {uploading ? (
                  <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <p className="font-bold text-lg">{uploading ? 'ENVIANDO...' : 'TROCAR FOTO'}</p>
              <p className="text-sm text-gray-300 mt-2">
                {uploading ? 'Aguarde...' : 'Clique para selecionar uma imagem'}
              </p>
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

        {/* Loading overlay */}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-dexOrange border-t-transparent mx-auto mb-4"></div>
              <p className="text-white font-bold">Enviando imagem...</p>
              <p className="text-white/70 text-sm mt-2">
                {uploadProgress < 50 ? 'Preparando...' : uploadProgress < 80 ? 'Enviando...' : 'Processando...'}
              </p>
              {uploadProgress > 0 && (
                <div className="w-48 h-2 bg-white/20 rounded-full mt-3 mx-auto">
                  <div 
                    className="h-full bg-dexOrange rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mensagem de erro */}
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
