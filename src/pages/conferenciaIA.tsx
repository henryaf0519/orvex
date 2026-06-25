// src/pages/conferenciaIA.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Play, Share2, Gem, MessageSquare, Camera } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { usePageTitle } from "../hooks/usePageTitle";
import { useNavigate } from 'react-router-dom';
import MobileTestimonialsCarousel from "../components/mobileTestimonies";
import VerticalScrollTestimonials from "../components/testimonies";

const WHATSAPP_LINK = "https://wa.me/573237407414?text=Hola%20estoy%20interesado%20en%20sus%20servicios";


const ConferenciaIA: React.FC = () => {
  const navigate = useNavigate();
  usePageTitle("Orvex | Desarrollo Web & Agencia IA");

  const clients = [
    {
      name: "Arriendy",
      logo: "/assets/arriendy.svg", // Asegúrate de crear esta carpeta y guardar las imágenes
      url: "https://www.arriendy.com/"
    },
    {
      name: "Root & Cane",
      logo: "/assets/rootCane.png",
      url: "https://rootandcane.com/products"
    },
    {
      name: "Development Solutions Foundation",
      logo: "/assets/dfs.webp",
      url: "https://corporaciondsf.com/"
    },
    {
      name: "Afiliamos Seguridad Social ",
      logo: "/assets/afiliamos.png",
      url: "https://wa.me/573006604848?text=Hola,%20me%20gustaría%20más%20información."
    },
    {
      name: "Finmark Laboratories",
      logo: "/assets/finlab.png",
      url: "https://example.com"
    },
    {
      name: "Naturanja",
      logo: "/assets/naturanja.png",
      url: "https://www.instagram.com/naturanja_oficial/?hl=es"
    }

  ];

  const services = [
    {
      title: "Diseño y Desarrollo Web",
      description: "Creamos sitios web visualmente atractivos, rápidos y optimizados para convertir visitantes en clientes. Desde landing pages hasta e-commerce, tu página será tu mejor vendedor, disponible 24/7.",
      icon: <Monitor className="text-white w-6 h-6 md:w-8 md:h-8" />,
    },
    {
      title: "Producción de Contenido Visual",
      description: "Creamos videos de hasta 60 segundos con Avatares IA hiperrealistas, subtítulos dinámicos, música y edición profesional diseñada para el éxito en redes sociales.",
      icon: <Camera className="text-white w-6 h-6 md:w-8 md:h-8" />,
    },
    {
      // --- TARJETA ACTUALIZADA PARA INCLUIR LA PLATAFORMA ---
      title: "Embudos & Automatización WhatsApp",
      description: "Diseñamos sistemas inteligentes y chatbots avanzados. Captamos leads, nutrimos prospectos y automatizamos tu ciclo de ventas directamente en WhatsApp sin intervención manual.",
      icon: <MessageSquare className="text-white w-6 h-6 md:w-8 md:h-8" />,
    },
    {
      title: "Gestión de Redes Sociales",
      description: "Construimos y posicionamos tu marca en Instagram, Facebook, TikTok y más. Desarrollamos contenido estratégico, visualmente impactante y alineado con tus objetivos de crecimiento.",
      icon: <Share2 className="text-white w-6 h-6 md:w-8 md:h-8" />,
    },
    {
      title: "Branding e Identidad de Marca",
      description: "Desarrollamos la identidad visual y el tono de comunicación de tu empresa para que destaque en su sector y conecte emocionalmente con tu audiencia en todos los canales.",
      icon: <Gem className="text-white w-6 h-6 md:w-8 md:h-8" />,
    }]

  const portfolioVideos = [
    { id: "6gLeL7EE0S4", title: "Video de Prueba 1" },
    { id: "ySJbuxo6g6U", title: "Video de Prueba 2" },
    { id: "OHbAR-BQ0MM", title: "Video de Prueba 3" },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const updateDevice = () => {
    setIsMobile(window.innerWidth <= 768);
  };



  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans text-white selection:bg-primaryColor selection:text-white pb-12 md:pb-20 overflow-x-hidden relative">

      {/* --- BOTONES FLOTANTES (Social Media) --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-center">
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="bg-[#25D366] p-3 md:p-4 rounded-full shadow-lg hover:shadow-green-500/30 text-white flex items-center justify-center transform transition-transform hover:scale-110"
          title="Chatea con nosotros"
        >
          <FaWhatsapp className="w-6 h-6 md:w-8 md:h-8" />
        </motion.a>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-10 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[400px] bg-primaryColor/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gray-900 border border-gray-700 text-xs md:text-sm text-gray-300 mb-4 md:mb-6">
              Agencia de Desarrollo, Marketing & Inteligencia Artificial
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent px-2">
              Transformamos tu Visión <br className="hidden md:block" /> en Código y Realidad
            </h1>

            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 px-2">
              Desde Landing Pages y plataformas E-commerce, hasta nuestra propia plataforma CRM de automatización para WhatsApp.
            </p>

            <motion.a
              onClick={() => navigate('/cotizador')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex cursor-pointer items-center justify-center gap-3 bg-primaryColor text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-bold shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.6)] transition-all w-full md:w-auto max-w-xs mx-auto"
            >
              Cotizar Proyecto
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* --- CLIENTS CAROUSEL (ACTUALIZADO CON LOGOS Y LINKS) --- */}
      <section className="py-10 border-y border-gray-800/50 bg-[#111111]/50 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 text-center">
          <p className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wider">
            Empresas que confían en nosotros
          </p>
        </div>

        <div className="relative flex overflow-x-hidden w-full group">
          {/* Degradados laterales para el efecto de fundido */}
          <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex whitespace-nowrap items-center gap-16 md:gap-24 px-6 md:px-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }} // Ajusta 'duration' para la velocidad
          >
            {/* Duplicamos el array para que el scroll sea infinito y continuo */}
            {[...clients, ...clients].map((client, index) => (
              <a
                key={index}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300"
                title={`Visitar página de ${client.name}`}
              >
                {/* 
                */}
                <img
                  src={client.logo}
                  alt={`Logo de ${client.name}`}
                  className="h-10 md:h-14 w-auto object-contain filter  transition-all duration-300"
                  onError={(e) => {
                    // Fallback en caso de que la imagen no cargue: muestra el nombre
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Texto de respaldo oculto por defecto */}
                <span className="hidden text-xl md:text-3xl font-bold text-gray-400 hover:text-white">
                  {client.name}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>
      {/* --- SERVICES GRID --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Soluciones integrales para escalar tu presencia en el mundo digital.</p>
        </div>

        {/* --- GRID TIPO BENTO BOX --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              /* Magia de Grid: 
                 - lg:col-span-2 para las 3 primeras (ocupan 33% c/u)
                 - lg:col-span-3 para las 2 últimas (ocupan 50% c/u y se centran en la fila de abajo)
                 - md:col-span-2 centra la última tarjeta si se ve en Tablet (iPad)
              */
              className={`bg-[#141414] border border-[#222222] hover:border-primaryColor/50 rounded-2xl p-8 md:p-10 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col h-full
                    ${index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}
                    ${index === 4 ? 'md:col-span-2 lg:col-span-3' : ''}
                `}
            >
              <div className="mb-6 bg-gray-800/50 w-14 h-14 rounded-xl flex items-center justify-center border border-gray-700 group-hover:bg-primaryColor/20 group-hover:border-primaryColor/50 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed flex-grow text-sm md:text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- BOTÓN CENTRADO --- */}
        <div className="mt-16 md:mt-20 flex justify-center w-full">
          <motion.button
            onClick={() => navigate('/cotizador')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer inline-flex items-center justify-center gap-3 bg-primaryColor text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-bold shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.6)] transition-all w-full md:w-auto min-w-[280px]"
          >
            Cotizar Proyecto
          </motion.button>
        </div>
      </section>

      {/* --- VIDEO DEMO SECTION (Avatares IA) --- */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-transparent to-[#111] border-b border-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primaryColor font-bold tracking-wider uppercase text-sm mb-2 block">Agencia de Contenido Visual</span>
            <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white/90 flex items-center justify-center gap-2">
              <Play className="w-8 h-8 text-primaryColor fill-primaryColor" />
              Revoluciona tus Redes con IA
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
              Creamos videos impactantes de hasta 60 segundos con Avatares IA hiperrealistas, subtítulos dinámicos y musicalización lista para viralizar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioVideos.map((video) => (
                <motion.div
                  key={video.id}
                  whileHover={{ y: -10 }}
                  className="relative rounded-3xl overflow-hidden border border-gray-800 bg-black shadow-2xl group"
                >
                  <div className="aspect-[9/16] md:aspect-[9/16] w-full max-h-[450px] md:max-h-none mx-auto">
                    <iframe
                      className="w-full h-full"
                      // El parámetro 'mute=1' es lo que permite que 'autoplay=1' funcione
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&rel=0&modestbranding=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </motion.div>


              ))}
            </div>
            <motion.a
              onClick={() => navigate('/cotizador')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 cursor-pointer inline-flex items-center justify-center gap-3 bg-primaryColor text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-bold shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.6)] transition-all w-full md:w-auto max-w-xs mx-auto"
            >
              Quiero mi Avatar IA
            </motion.a>
          </motion.div>
        </div>
      </section>



      {/* --- NUEVA SECCIÓN: PLATAFORMA CRM WHATSAPP --- */}
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white/90 flex items-center justify-center gap-2">
              <Play className="w-6 h-6 text-primaryColor fill-primaryColor" />
              Mira la magia en acción
            </h3>

            {/* --- NUEVO SUBTÍTULO --- */}
            <p className="text-gray-400 max-w-lg mx-auto mb-10 text-sm md:text-base leading-relaxed">
              Descubre cómo revolucionamos las ventas y automatizamos la atención de tu negocio con el poder de <span className="text-white font-semibold">WhatsApp Flows</span>.
            </p>

            {/* Contenedor estilo "iPhone" para el video */}
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[10px] md:border-[14px] rounded-[2.5rem] w-full max-w-[300px] md:max-w-[320px] shadow-2xl shadow-primaryColor/20">
              {/* Cámara/Notch */}
              <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[12px] md:-start-[17px] top-[72px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[12px] md:-start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[12px] md:-start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[12px] md:-end-[17px] top-[142px] rounded-e-lg"></div>

              <div className="rounded-[2rem] overflow-hidden w-full bg-black aspect-[9/19] relative">
                {/* Aquí va el video. Asegúrate de tener el archivo en public/assets/demo-whatsapp.mp4 */}
                <video
                  className="w-full h-full object-cover"
                  src="/assets/demo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/assets/chat.png" // Imagen de carga mientras carga el video
                >
                  Tu navegador no soporta el elemento de video.
                </video>

                {/* Gradiente inferior para que se integre mejor */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              * Grabación real de nuestro agente Orvex en WhatsApp
            </p>
          </motion.div>

          <motion.a
            href="https://wa.me/573237407414?text=Hola,%20me%20interesa%20automatizar%20mi%20atención"
            target="_blank"
            rel="noopener noreferrer"
            className="m-5 inline-flex items-center justify-center gap-3 bg-primaryColor text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-bold shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.6)] transition-all w-full md:w-auto max-w-xs mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Automatizar Whatsapp
          </motion.a>
        </div>
      </section>

      <section className="px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          {isMobile ? (
            <MobileTestimonialsCarousel />
          ) : (
            <VerticalScrollTestimonials />
          )}
        </div>
      </section>




      {/* --- FINAL CTA --- */}
      <section className="py-16 md:py-24 px-4 md:px-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-[#111111] border border-[#222222] p-8 md:p-16 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-primaryColor/10 blur-[60px] md:blur-[80px] rounded-full pointer-events-none"></div>

          <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 relative z-10">
            ¿Listo para escalar tu negocio al siguiente nivel?
          </h2>
          <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-10 relative z-10 px-2 max-w-2xl mx-auto">
            Cuéntanos tu idea. Diseñamos el software, desarrollamos la web, automatizamos tu WhatsApp o creamos el contenido IA que necesitas para destacar.
          </p>

          <motion.a
            onClick={() => navigate('/cotizador')}
            className="relative  cursor-pointer z-10 inline-flex items-center justify-center gap-2 text-black bg-white hover:bg-gray-200 px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold transition-all shadow-lg w-full md:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cotizar Proyecto
          </motion.a>
        </motion.div>
      </section>

    </div>
  );
};

export default ConferenciaIA;