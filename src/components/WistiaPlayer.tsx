// src/components/WistiaPlayer.tsx
import React, { useEffect } from 'react';

interface WistiaPlayerProps {
  mediaId: string;
  className?: string; // Para permitir estilos personalizados desde fuera
}

const WistiaPlayer: React.FC<WistiaPlayerProps> = ({ mediaId, className }) => {
  useEffect(() => {
    // ID único para el script de este video específico
    const embedScriptId = `wistia-embed-script-${mediaId}`;

    // 1. Cargar el script principal del reproductor de Wistia si aún no existe
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const playerScript = document.createElement('script');
      playerScript.src = "https://fast.wistia.com/player.js";
      playerScript.async = true;
      document.body.appendChild(playerScript);
    }

    // 2. Cargar el script específico que activa este video en particular
    // Nos aseguramos de no cargarlo múltiples veces
    if (!document.getElementById(embedScriptId)) {
      const embedScript = document.createElement('script');
      embedScript.id = embedScriptId;
      embedScript.src = `https://fast.wistia.com/embed/${mediaId}.js`;
      embedScript.async = true;
      document.body.appendChild(embedScript);
    }

    // Función de limpieza: se ejecuta si el componente se desmonta
    return () => {
      const embedScript = document.getElementById(embedScriptId);
      if (embedScript) {
        embedScript.remove();
      }
    };
  }, [mediaId]); // Este efecto se ejecutará cada vez que el 'mediaId' cambie

  return (
    // Usamos un div contenedor para aplicar las clases de tamaño y hacerlo responsivo
    <div className={className}>
      <wistia-player media-id={mediaId}></wistia-player>
    </div>
  );
};

export default WistiaPlayer;