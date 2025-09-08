import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Importar Link
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import {
  CheckCircle,
  BarChart3,
  Clock,
  Zap,
  Users,
  XCircle,
  Minus,
  Plus,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import WistiaPlayer from "../components/WistiaPlayer";

// --- DATOS CENTRALIZADOS ---

// Datos para las tarjetas de beneficios
const benefitsData = [
  {
    icon: BarChart3,
    title: "Incremento en Ventas y Conversión",
    description:
      "Convierte más conversaciones en ingresos. Tu agente IA está entrenado para guiar a los clientes a través del proceso de compra 24/7.",
  },
  {
    icon: Zap,
    title: "Eficiencia y Ahorro de Costos",
    description:
      "Automatiza respuestas y procesos para que no necesites contratar más personal. Tu equipo se enfoca en tareas de alto valor.",
  },
  {
    icon: Clock,
    title: "Recupera de 5 a 10 Horas Semanales",
    description:
      "Delega las tareas repetitivas a tu agente de IA y libera tiempo valioso para dedicarlo a la estrategia y el crecimiento de tu negocio.",
  },
];

// Datos para la sección de Preguntas Frecuentes (FAQ)
const faqData = [
  {
    question: "¿Tengo que instalar algo complicado?",
    answer:
      "No. Nosotros nos encargamos de todo el proceso técnico. Tú solo necesitas llenar un formulario con la información clave de tu negocio y nosotros hacemos el resto.",
  },
  {
    question: "¿Existe alguna cláusula de permanencia?",
    answer:
      "No. Creemos en la flexibilidad. Puedes elegir el plan que mejor se adapte a ti y cambiarlo o cancelarlo cuando lo necesites, sin contratos a largo plazo.",
  },
  {
    question: "¿Qué pasa si no tengo página web o CRM?",
    answer:
      "No es un problema. Tu agente de IA puede operar perfectamente a través de WhatsApp y redes sociales. Además, nuestra plataforma incluye un CRM integrado para que gestiones a tus clientes desde el primer día.",
  },
  {
    question: "¿En cuánto tiempo estará funcionando mi agente?",
    answer:
      "Nuestro proceso de implementación estándar es de 5 a 7 días hábiles. Así de rápido empezarás a ver los resultados.",
  },
  {
    question: "¿Mis clientes se darán cuenta de que hablan con un robot?",
    answer:
      "Precisamente por eso creamos agentes personalizados. Entrenamos a la IA para que hable en el tono y estilo de tu marca. Además, desde nuestra plataforma, tú o tu equipo pueden intervenir en la conversación en cualquier momento para gestionar leads complejos, asegurando una experiencia fluida.",
  },
  {
    question: "¿Esto funciona solo para WhatsApp?",
    answer:
      "No, nuestra plataforma es omnicanal. Integramos tu agente en WhatsApp, Instagram, Facebook Messenger y tu sitio web, centralizando todas las conversaciones en una única bandeja de entrada para un control total.",
  },
  {
    question: "¿Qué tan personalizado puede ser el agente?",
    answer:
      "Totalmente personalizado. No usamos plantillas genéricas. Construimos un agente de IA a la medida, entrenado para ejecutar los procesos específicos de tu negocio, ya sea vender, dar soporte, calificar o cualquier otra tarea que necesites automatizar.",
  },
  {
    question:
      "¿Qué tipo de soporte ofrecen una vez que mi agente está funcionando?",
    answer:
      "Ofrecemos soporte continuo para asegurar que tu operación funcione sin problemas. Dependiendo de tu plan, esto incluye desde soporte técnico hasta consultoría dedicada para ayudarte a optimizar tus flujos y estrategias.",
  },
  {
    question: "¿Necesito configurar mi número de WhatsApp por mi cuenta?",
    answer:
      "Absolutamente nada. Nosotros gestionamos todo el proceso de configuración de la API oficial de WhatsApp a través de la plataforma de Meta. Nos aseguramos de que tu número esté verificado y funcionando sin que tengas que preocuparte por ningún detalle técnico.",
  },
];

// --- COMPONENTES REUTILIZABLES ---

// Componente para los items del FAQ
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          {question}
        </h3>
        <span className="text-primaryColor text-2xl transform transition-transform duration-300">
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <p className="text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// Componente para las tarjetas de beneficios
const BenefitCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-xl shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-primaryColor/20">
    <Icon className="text-primaryColor text-3xl flex-shrink-0 mt-1" />
    <div>
      <h4 className="font-bold text-white text-xl">{title}</h4>
      <p className="text-gray-400 mt-1">{description}</p>
    </div>
  </div>
);

const AgentesIA: React.FC = () => {
  const fullText =
    " Automatiza tu Agenda y Multiplica tus Citas sin Contratar Personal.";
  const progress = useMotionValue(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typingFinished, setTypingFinished] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(progress, fullText.length + 1, {
              duration: fullText.length * 0.08,
              ease: "linear",
              onComplete: () => setTypingFinished(true),
            });
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fullText, progress]);

  useMotionValueEvent(progress, "change", (latest) => {
    setDisplayedText(fullText.slice(0, Math.floor(latest)));
  });

  return (
    <>
      <div
        id="inicio"
        className="font-inter antialiased bg-darkBgColor text-gray-100"
      >
        {/* Hero Section */}
        <section
          id="inicio"
          className="relative min-h-screen flex flex-col items-center justify-center gap-8 px-6 py-20 text-center bg-darkBgColor"
        >
          <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center min-h-[320px] sm:min-h-[280px]">
            <h1
              ref={containerRef}
              className="text-4xl sm:text-5xl md:text-5xl font-extrabold leading-tight text-white my-4"
            >
              <span className="text-primaryColor">Orvex:</span> {displayedText}
              <motion.span
                className="inline-block w-1 h-12 bg-white ml-1 align-middle"
                animate={
                  typingFinished ? { opacity: [0, 1, 0] } : { opacity: [0, 1] }
                }
                transition={
                  typingFinished
                    ? { repeat: Infinity, duration: 1.2 }
                    : { repeat: Infinity, duration: 0.6, ease: "linear" }
                }
              />
            </h1>

            <p
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              En los próximos 7 días, tu negocio puede dejar de perder dinero
              por citas canceladas y empezar a cobrar por adelantado... sin
              contratar personal, sin aprender tecnología y sin perder más
              tiempo en WhatsApp, web o donde lo necesites.
            </p>
          </div>

          <div
            className="relative z-10 w-full max-w-5xl mx-auto"
          >
            <div className="aspect-video bg-black rounded-lg overflow-hidden border-2 border-gray-800 shadow-2xl">
              <WistiaPlayer mediaId="b0dckf0a2r" className="w-full h-full" />
            </div>
          </div>

          <div
            className="relative z-10 w-full mt-8"         
          >
            <Link
              to="/schedule"
              className="bg-primaryColor hover:bg-red-700 text-white font-bold py-3 px-8 text-base md:py-4 md:px-10 md:text-lg rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105"
            >
              Solicita una Demostración Gratuita
            </Link>
          </div>
        </section>
        {/* Problem Section */}
        <section className="py-16 sm:py-24 bg-darkBgColor">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Columna Izquierda: Imagen con animación */}
              <motion.div
                className="relative flex justify-center group"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <img
                  src="/assets/chat.webp"
                  alt="Agente IA gestionando un chat con un cliente"
                  className="w-full max-w-md aspect-square object-cover rounded-xl shadow-2xl"
                />
                <div className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </motion.div>

              {/* Columna Derecha: Texto con animación */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.0 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                  ¿Tu día a día se siente como una carrera{" "}
                  <span className="text-primaryColor">contra el tiempo?</span>
                </h2>
                <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed">
                  ¿Te cancelan citas a último minuto? ¿Respondes las mismas
                  preguntas en WhatsApp a las 11 de la noche? Cada semana, esta
                  rutina te cuesta dinero, tiempo y, lo más valioso, tu
                  tranquilidad.
                </p>
                <p className="mt-4 text-lg sm:text-xl text-white font-semibold">
                  El problema no es tu dedicación. Es depender de herramientas
                  que ya no dan abasto.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Benefits Section */}
        <section id="benefits" className="py-16 sm:py-24 bg-darkBgColor">
          <div className="max-w-7xl mx-auto px-6">
            {/* Títulos con animación */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                ¿Qué lograrás con{" "}
                <span className="text-primaryColor">ORVEX</span>?
              </h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Transforma tu negocio con un sistema inteligente que trabaja
                para ti.
              </p>
            </motion.div>

            {/* Grid de 3 Columnas con animación escalonada */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              {[
                {
                  icon: <Zap size={32} className="text-primaryColor" />,
                  title: "Automatización 24/7",
                  description:
                    "Recupera de 5 a 10 horas semanales delegando las respuestas repetitivas a un agente que nunca descansa. Tu IA gestionará consultas en WhatsApp, web y redes para que tú te dediques a crecer.",
                },
                {
                  icon: (
                    <CalendarCheck size={32} className="text-primaryColor" />
                  ),
                  title: "Conversión Inteligente",
                  description:
                    "Llena tu agenda con citas confirmadas y pagadas por adelantado. Nuestro sistema asegura cada reserva con un pago, eliminando las ausencias y garantizando tu flujo de caja.",
                },
                {
                  icon: <TrendingUp size={32} className="text-primaryColor" />,
                  title: "Escalabilidad Simple",
                  description:
                    "Crece sin aumentar tus costos fijos. Implementa tecnología de punta sin necesidad de contratar más personal ni de tener conocimientos técnicos. Nosotros nos encargamos de todo.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.2 + index * 0.2,
                  }}
                >
                  <div className="p-5 bg-gray-900 rounded-full border-2 border-primaryColor/30 mb-6 transition-all duration-300 hover:border-primaryColor">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Banner Inferior con animación */}
            <motion.div
              className="max-w-4xl mx-auto mt-20 bg-gray-900/50 border border-primaryColor/30 rounded-lg p-5 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-lg font-semibold text-white">
                ✨ Y lo mejor de todo: lo conseguirás con un{" "}
                <span className="text-primaryColor">
                  sistema claro y probado
                </span>
                , funcionando para ti en menos de 7 días.
              </p>
            </motion.div>
          </div>
        </section>
        {/* How It Works Section */}
        <section id="how-to" className="py-16 sm:py-24 bg-darkBgColor">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Columna Izquierda: Panel de Texto */}
                <div className="relative z-10 p-8 sm:p-12 flex flex-col justify-center">
                  <div>
                    {/* Título y subtítulos animados */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                      className="text-3xl sm:text-4xl font-bold text-white leading-tight"
                    >
                      ¿Cómo lo Vas a Lograr?
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                      className="mt-2 text-lg text-primaryColor font-semibold"
                    >
                      Con tu propio Agente Digital de IA 24/7
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.4,
                      }}
                      className="mt-4 text-gray-400"
                    >
                      Implementamos un sistema inteligente que se encarga de las
                      tareas repetitivas para que tú te enfoques en lo que
                      realmente importa:
                    </motion.p>
                  </div>

                  {/* Lista de beneficios con animación escalonada */}
                  <ul className="space-y-4 mt-8">
                    {[
                      "Filtra clientes y responde preguntas frecuentes.",
                      "Agenda citas y cobra por adelantado.",
                      "Evita cancelaciones y asegura tu agenda.",
                      "Listo para ti en menos de 7 días.",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                          delay: 0.5 + index * 0.15,
                        }}
                      >
                        <CheckCircle
                          size={20}
                          className="text-green-500 flex-shrink-0"
                        />
                        <span className="text-lg text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Botón con animación */}
                  <motion.div
                    className="mt-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "backOut", delay: 1.0 }}
                  >
                    <Link
                      to="/schedule"
                      className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
                    >
                      Quiero mi Agente Ahora
                    </Link>
                  </motion.div>
                </div>

                {/* Columna Derecha: Imagen */}
                <div className="hidden lg:block lg:relative">
                  <motion.img
                    src="/assets/orvexchat.webp"
                    alt="Un equipo profesional colaborando gracias a la eficiencia de Orvex"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gray-900/50 to-gray-900"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Transformation Section */}
        <section
          id="transformacion"
          className="py-16 sm:py-24 bg-black relative"
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* Elementos de fondo decorativos (Efecto Aurora) */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primaryColor/10 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primaryColor/10 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Título de la Sección con animación */}
            <motion.div
              className="text-center mb-24"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                La Nueva Era de tu{" "}
                <span className="text-primaryColor">Operación</span>
              </h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Implementamos un sistema inteligente que se encarga del trabajo
                pesado para que tú te dediques a lo que nadie más puede hacer:
                hacer crecer tu negocio.
              </p>
            </motion.div>

            {/* Contenedor de la Línea de Tiempo */}
            <div className="relative">
              {/* Línea Vertical Central (visible en pantallas grandes) */}
              <div className="hidden lg:block absolute top-12 bottom-12 left-1/2 w-0.5 bg-gray-800"></div>

              <div className="space-y-24">
                {[
                  {
                    imageSrc: "/assets/automatizacion.webp",
                    alt: "Dashboard de automatización",
                    title: "Automatización sin complicaciones",
                    description:
                      "Olvídate de lo técnico y de contratar asistentes adicionales. Te entregamos un sistema listo para usar, completamente configurado, para que empieces a aprovecharlo desde el primer día sin perder tiempo.",
                    buttonText: "Automatizar mi Negocio Ahora",
                    imageOrderClass: "lg:order-last",
                  },
                  {
                    imageSrc: "/assets/fullcalendar.webp",
                    alt: "Calendario con citas pagadas",
                    title: "Agenda Llena + Cobro Asegurado",
                    description:
                      "Se acabaron los ‘te confirmo después’. Con nuestro agente, solo agendas a quienes pagan y van en serio. Más ventas cerradas, menos tiempo perdido.",
                    buttonText: "Asegurar mis Cobros",
                    imageOrderClass: "",
                  },
                  {
                    imageSrc: "/assets/business.webp",
                    alt: "Gráfico de crecimiento 24/7",
                    title:
                      "Tu Negocio Activo las 24 Horas, Sin Contratar Personal",
                    description:
                      "Tu agente trabaja de forma continua: responde preguntas, agenda citas y atrae nuevos clientes a cualquier hora, sin nómina ni limitaciones de horario.",
                    buttonText: "Activar mi Agente 24/7",
                    imageOrderClass: "lg:order-last",
                  },
                  {
                    imageSrc: "/assets/sales.webp",
                    alt: "Impulso de ventas con IA",
                    title: "Tu Mejor Vendedor, Siempre Activo",
                    description:
                      "Un agente que nunca se detiene: comparte promociones, impulsa tus ventas y mantiene a tus clientes pensando en tu negocio, incluso mientras duermes.",
                    buttonText: "Impulsar mi negocio",
                    imageOrderClass: "",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    {/* El punto de la línea de tiempo, también animado */}
                    <motion.div
                      className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-primaryColor rounded-full border-4 border-black ring-4 ring-primaryColor/50"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.4,
                      }}
                    ></motion.div>

                    {/* Columna de Imagen */}
                    <motion.div
                      className={item.imageOrderClass}
                      initial={{
                        opacity: 0,
                        y: 100,
                      }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <img
                        src={item.imageSrc}
                        alt={item.alt}
                        className="rounded-lg shadow-md border border-gray-800 w-full h-auto object-contain lg:aspect-video"
                      />
                    </motion.div>

                    {/* Columna de Texto */}
                    <motion.div
                      className={`text-center lg:text-left ${
                        item.imageOrderClass ? "" : "lg:pl-12"
                      }`}
                      initial={{
                        opacity: 0,
                        y: -100,
                      }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                    >
                      <h3 className="text-3xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-lg text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-8 flex justify-center lg:justify-start">
                        <Link
                          to="/schedule"
                          className="bg-primaryColor text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-primaryColor/50"
                        >
                          {item.buttonText}
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Benefits + CRM Section */}
        <section id="benefits" className="py-16 sm:py-24 bg-darkBgColor">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Resultados, no solo promesas.
              </h2>
              <p className="mt-4 text-lg text-primaryColor font-semibold max-w-3xl mx-auto">
                Esto es lo que ORVEX consigue para tu negocio desde la primera
                semana.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Columna Izquierda: Beneficios Clave con animación escalonada */}
              <div className="space-y-8">
                {benefitsData.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.2,
                    }}
                  >
                    <BenefitCard
                      icon={benefit.icon}
                      title={benefit.title}
                      description={benefit.description}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Columna Derecha: Plataforma CRM con animación */}
              <motion.div
                className="bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
              >
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
                  Tu <span className="text-primaryColor">Ecosistema</span> de
                  Crecimiento
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  ORVEX no es solo un agente de IA; es una plataforma de gestión
                  integral diseñada para convertir conversaciones en clientes.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primaryColor mt-1.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">
                        Bandeja Omnicanal:
                      </span>{" "}
                      Unifica WhatsApp, web y redes sociales en un solo lugar.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primaryColor mt-1.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">
                        Gestión de Pipeline:
                      </span>{" "}
                      Visualiza y gestiona cada lead, desde el primer contacto
                      hasta el cierre de la venta.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primaryColor mt-1.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      <span className="font-semibold text-white">
                        Marketing Automatizado:
                      </span>{" "}
                      Envía promociones, recordatorios y contenido de valor para
                      nutrir a tus clientes sin esfuerzo.
                    </span>
                  </li>
                </ul>
                <p className="mt-6 text-lg text-white font-medium">
                  Toma el control total de la experiencia de tu cliente.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Investment Section */}
        <section
          id="investment-proof"
          className="py-16 sm:py-24 bg-darkBgColor"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Columna principal (izquierda) con animación */}
              <motion.div
                className="lg:col-span-2 bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Una Inversión Inteligente, no un Gasto
                </h2>
                <p className="text-lg text-gray-400 mb-8">
                  Analicemos los números. Un asistente tradicional puede ser un
                  recurso valioso, pero ¿es la opción más eficiente?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Tarjeta "Asistente Humano" con animación */}
                  <motion.div
                    className="border border-gray-700 p-6 rounded-xl"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-white">
                      Asistente Humano
                    </h3>
                    <p className="text-4xl font-bold text-gray-500 my-4">
                      $2.5M+<span className="text-lg font-normal">/mes</span>
                    </p>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center gap-2">
                        <XCircle className="text-red-500" /> Horario limitado
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="text-red-500" /> Propenso a errores
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="text-red-500" /> Necesita días
                        libres
                      </li>
                    </ul>
                  </motion.div>
                  {/* Tarjeta "Agente IA ORVEX" con animación */}
                  <motion.div
                    className="border-2 border-primaryColor p-6 rounded-xl relative overflow-hidden"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                  >
                    <div className="absolute top-0 right-0 bg-primaryColor text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      RECOMENDADO
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      Agente IA ORVEX
                    </h3>
                    <p className="text-4xl font-bold text-white my-4">
                      Fracción
                      <span className="text-lg font-normal"> del costo</span>
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="text-green-500" /> Trabaja 24/7
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="text-green-500" /> Precisión
                        milimétrica
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="text-green-500" /> Nunca
                        descansa
                      </li>
                    </ul>
                  </motion.div>
                </div>
                <p className="mt-8 text-center text-lg text-gray-300 italic">
                  "Si hoy pierdes al menos una venta a la semana, ya estás
                  pagando el costo de NO tenerlo."
                </p>
              </motion.div>

              {/* Columna derecha con animación */}
              <motion.div
                className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl h-full flex flex-col"
                   initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div>
                  <div className="text-primaryColor text-4xl mb-4">
                    <Users />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Únete a los Líderes del Mercado
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Empresas de diversos sectores como tiendas virtuales,
                    agencias de marketing, centros médicos y psicológicos,
                    clínicas estéticas, inmobiliarias, restaurantes y
                    profesionales de alto rendimiento ya confían en ORVEX.
                  </p>
                </div>
                <div className="flex-grow"></div>
                <p className="text-white font-semibold mt-6">
                  Si ellos ya transformaron su negocio, tú también puedes
                  hacerlo.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Final CTA Section */}
        <section id="final-cta" className="py-20 sm:py-24 bg-black">
          <div
            className="max-w-4xl mx-auto px-6 text-center" 
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              ¿Listo para Dejar de Perder Clientes y Tiempo?
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Es hora de implementar la solución de IA que trabaja por ti 24/7,
              convierte más y te devuelve el control de tu negocio.
            </p>
            <div
              className="mt-10"
            >
              <Link
                to="/schedule"
                className="bg-primaryColor hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105 inline-block text-xl"
              >
                Quiero Implementar mi Agente de IA Ahora
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 sm:py-24 bg-darkBgColor">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Preguntas Frecuentes
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Resolvemos tus dudas para que tomes la mejor decisión.
              </p>
            </div>
            <div>
              {faqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AgentesIA;