import React, { useState } from 'react';

interface TeamImageUploadProps {
  currentImageUrl: string;
  name: string;
  role: string;
}

const TeamImageUpload: React.FC<TeamImageUploadProps> = ({
  currentImageUrl,
  name,
  role
}) => {
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simular upload (substitua com sua lógica de upload real)
    setUploading(true);
    
    // Criar preview local
    const reader = new FileReader();
    reader.onload = (event) => {
      setTimeout(() => {
        setImageUrl(event.target?.result as string);
        setUploading(false);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

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

        {/* Botão de upload (aparece ao passar o mouse) */}
        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-dexOrange rounded-full flex items-center justify-center mx-auto mb-4 transform scale-90 group-hover:scale-100 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-bold text-lg">{uploading ? 'ENVIANDO...' : 'TROCAR FOTO'}</p>
            <p className="text-sm text-gray-300 mt-2">Clique para selecionar uma imagem</p>
          </div>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {/* Loading overlay */}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-dexOrange border-t-transparent mx-auto mb-4"></div>
              <p className="text-white font-bold">Enviando imagem...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamImageUpload;