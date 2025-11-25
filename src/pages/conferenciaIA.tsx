// src/pages/conferenciaIA.tsx
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Zap, Calendar, Users, BarChart, ArrowRight } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";

// Configuración del botón de WhatsApp
const WHATSAPP_LINK = "https://wa.me/573000000000?text=Hola,%20vengo%20de%20la%20conferencia%20y%20quiero%20ver%20la%20magia%20de%20Orvex.";

const ConferenciaIA: React.FC = () => {
  usePageTitle("Orvex | Experiencia IA");

  const features = [
    {
      title: "Gestión de Leads Simplificada",
      description: "Olvídate de los Excel. Visualiza cada oportunidad en un table inteligente para filtrar tus leads",
      image: "/assets/crm.png",
      icon: <Users className="text-primaryColor" size={24} />,
      align: "right"
    },
    {
      title: "Flujos de Conversación Visuales",
      description: "Diseña la lógica de tu negocio arrastrando y soltando. Tu IA sabrá exactamente qué responder y cuándo vender.",
      image: "/assets/flow.png",
      icon: <Zap className="text-primaryColor" size={24} />,
      align: "left"
    },
    {
      title: "Atención Omnicanal Centralizada",
      description: "WhatsApp, Instagram y Web en una sola pantalla. Tu IA responde al instante, tu equipo supervisa cuando es necesario.",
      image: "/assets/chat.png",
      icon: <MessageCircle className="text-primaryColor" size={24} />,
      align: "right"
    },
    {
      title: "Agenda Corporativa Inteligente",
      description: "Sincronización en tiempo real. La IA agenda citas basándose en la disponibilidad real de tu equipo, 24/7.",
      image: "/assets/calendar.png",
      icon: <Calendar className="text-primaryColor" size={24} />,
      align: "left"
    },
    {
      title: "Marketing Automatizado",
      description: "Envía campañas masivas personalizadas y recurrentes  con un solo clic.",
      image: "/assets/marketing.png",
      icon: <BarChart className="text-primaryColor" size={24} />,
      align: "right"
    }
  ];

  return (
    <div className="bg-black min-h-screen font-sans text-white selection:bg-primaryColor selection:text-white pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primaryColor/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gray-900 border border-gray-700 text-sm text-gray-300 mb-6">
             Bienvenido a la evolución de tu negocio
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
              El Cerebro Digital <br /> de tu Empresa
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Has visto el futuro en la conferencia. Ahora experiméntalo. 
              Orvex centraliza, automatiza y escala tu operación sin que muevas un dedo.
            </p>

            {/* Botón Principal */}
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-primaryColor text-white px-8 py-4 rounded-full text-xl font-bold shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.6)] transition-all"
            >
              <MessageCircle size={24} />
              Probar Demo en WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SHOWCASE --- */}
      <section className="max-w-7xl mx-auto px-6 space-y-24 md:space-y-32 py-10">
        {features.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${item.align === 'left' ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Texto */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 shadow-lg">
                {item.icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {item.title}
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Imagen con efecto glass */}
            <div className="flex-1 w-full relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primaryColor to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-900 ring-1 ring-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  {/* Overlay gradiente sutil sobre la imagen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-10 md:p-16 rounded-3xl relative overflow-hidden"
        >
          {/* Fondo decorativo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primaryColor/10 blur-[80px] rounded-full"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
            ¿Listo para automatizar lo aburrido?
          </h2>
          <p className="text-xl text-gray-400 mb-10 relative z-10">
            Interactúa con nuestra IA ahora mismo en WhatsApp y mira cómo agenda, vende y responde en segundos.
          </p>
          
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-2 text-white bg-[#25D366] hover:bg-[#20BD5C] px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-green-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={24} fill="white" />
            Hablar con Orvex en WhatsApp
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </section>

    </div>
  );
};

export default ConferenciaIA;