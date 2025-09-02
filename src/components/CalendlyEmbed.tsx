// src/components/CalendlyEmbed.tsx
import React from 'react';

// No necesitamos la lógica del script para el iframe, así que el componente es muy simple.
interface CalendlyEmbedProps {
  url: string;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ url }) => {
  // Construimos la URL con los parámetros de personalización
  const calendlyUrl = `${url}?background_color=000000&text_color=ffffff&primary_color=ff0000&hide_landing_page_details=1&redirect_url=https://orvex.dev/finish`;

  return (
    <iframe
      src={calendlyUrl}
      width="100%"
      height="100%" // Usar 100% para que ocupe todo el contenedor padre
      frameBorder="0"
      title="Agendar una demostración con Orvex"
      loading='lazy'
    ></iframe>
  );
};

export default CalendlyEmbed;