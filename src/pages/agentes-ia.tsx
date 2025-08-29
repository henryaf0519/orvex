import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
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
import WistiaPlayer from "../components/WistiaPlayer";
import CalendlyEmbed from "../components/CalendlyEmbed";
import CalendlyModal from "../components/CalendlyModal";

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

// Datos para la sección de Precios
/*const pricingPlans = [
  {
    name: "Starter",
    description: "Ideal para pequeños negocios.",
    price: "$35",
    priceDetails: "USD/mes",
    features: [
      "1 Número WhatsApp API",
      "5,000 Contactos 1 a 1",
      "1 Agente de IA",
      "10 Automatizaciones",
    ],
    buttonText: "Empezar Ahora",
    isPopular: false,
  },
  {
    name: "Advanced",
    description:
      "Ideal para negocios con equipos de trabajo que priorizan su atención al cliente por WhatsApp.",
    price: "$50",
    priceDetails: "USD/mes",
    features: [
      "1 Número WhatsApp API",
      "3 Agentes de IA",
      "10,000 Contactos 1 a 1",
      "Automatizaciones Ilimitadas",
    ],
    buttonText: "Comprar Plan",
    isPopular: true,
  },
  {
    name: "Personalizado",
    description: "Soluciones personalizadas para tu negocio.",
    price: "A Convenir",
    priceDetails: "",
    features: [
      "Agentes IA Pro con integraciones avanzadas",
      "Soporte y consultoría dedicada",
    ],
    extraInfo: "Todo lo de Advanced, y además:",
    buttonText: "Contactar Ventas",
    isPopular: false,
  },
]; */

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        {/* Hero Section - OPCIÓN B: ALTO IMPACTO */}
        {/* Hero Section - VIDEO COMPLETO Y TEXTO VISIBLE */}
        <section
          id="inicio"
          className="relative min-h-screen flex flex-col items-center justify-center gap-8 px-6 py-20 text-center bg-darkBgColor"
        >
          {/* 1. Contenido de Texto (Parte Superior) - AHORA SIN EL BOTÓN */}
          <div className="relative z-10 w-full max-w-5xl">
            <motion.h1
              ref={containerRef}
              className="text-4xl sm:text-5xl md:text-5xl font-extrabold leading-tight text-white my-4"
            >
              <span className="text-primaryColor">Orvex:</span> {displayedText}
              <motion.span
                className="inline-block w-1 h-12 bg-white ml-1"
                animate={
                  typingFinished ? { opacity: [0, 1, 0] } : { opacity: [0, 1] }
                }
                transition={
                  typingFinished
                    ? { repeat: Infinity, duration: 1.2 }
                    : { repeat: Infinity, duration: 0.6, ease: "linear" }
                }
              />
            </motion.h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              En los próximos 7 días, tu negocio puede dejar de perder dinero
              por citas canceladas y empezar a cobrar por adelantado... sin
              contratar personal, sin aprender tecnología y sin perder más
              tiempo en WhatsApp, web o donde lo necesites.
            </p>
          </div>

          {/* 2. Contenido de Video (Parte Intermedia) */}
          <div className="relative z-10 w-full max-w-5xl mx-auto">
            <div className="aspect-video bg-black rounded-lg overflow-hidden border-2 border-gray-800 shadow-2xl">
              <WistiaPlayer mediaId="b0dckf0a2r" className="w-full h-full" />
            </div>
          </div>

          {/* 3. BOTÓN (Parte Inferior) - MOVIDO AQUÍ */}
          <div className="relative z-10 w-full mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primaryColor hover:bg-red-700 text-white font-bold py-3 px-8 text-base md:py-4 md:px-10 md:text-lg rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105"
            >
              Solicita una Demostración Gratuita
            </button>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 sm:py-24 bg-darkBgColor">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Columna Izquierda: Imagen */}
              <div className="relative flex justify-center group">
                <img
                  src="/assets/chat.png"
                  alt="Agente IA gestionando un chat con un cliente"
                  className="w-full max-w-md aspect-square object-cover rounded-xl shadow-2xl"
                />
                <div className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Columna Derecha: Texto */}
              <div className="text-center lg:text-left">
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
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 sm:py-24 bg-darkBgColor">
          <div className="max-w-7xl mx-auto px-6">
            {/* Títulos */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                ¿Qué lograrás con{" "}
                <span className="text-primaryColor">ORVEX</span>?
              </h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Transforma tu negocio con un sistema inteligente que trabaja
                para ti.
              </p>
            </div>

            {/* Grid de 3 Columnas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              {/* Columna 1: Automatización */}
              <div className="text-center flex flex-col items-center">
                <div className="p-5 bg-gray-900 rounded-full border-2 border-primaryColor/30 mb-6 transition-all duration-300 hover:border-primaryColor">
                  <Zap size={32} className="text-primaryColor" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Automatización 24/7
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Recupera de 5 a 10 horas semanales delegando las respuestas
                  repetitivas a un agente que nunca descansa. Tu IA gestionará
                  consultas en WhatsApp, web y redes para que tú te dediques a
                  crecer.
                </p>
              </div>

              {/* Columna 2: Conversión */}
              <div className="text-center flex flex-col items-center">
                <div className="p-5 bg-gray-900 rounded-full border-2 border-primaryColor/30 mb-6 transition-all duration-300 hover:border-primaryColor">
                  <CalendarCheck size={32} className="text-primaryColor" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Conversión Inteligente
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Llena tu agenda con citas confirmadas y pagadas por
                  adelantado. Nuestro sistema asegura cada reserva con un pago,
                  eliminando las ausencias y garantizando tu flujo de caja.
                </p>
              </div>

              {/* Columna 3: Escalabilidad */}
              <div className="text-center flex flex-col items-center">
                <div className="p-5 bg-gray-900 rounded-full border-2 border-primaryColor/30 mb-6 transition-all duration-300 hover:border-primaryColor">
                  <TrendingUp size={32} className="text-primaryColor" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Escalabilidad Simple
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Crece sin aumentar tus costos fijos. Implementa tecnología de
                  punta sin necesidad de contratar más personal ni de tener
                  conocimientos técnicos. Nosotros nos encargamos de todo.
                </p>
              </div>
            </div>

            {/* Banner Inferior */}
            <div className="max-w-4xl mx-auto mt-20 bg-gray-900/50 border border-primaryColor/30 rounded-lg p-5 text-center">
              <p className="text-lg font-semibold text-white">
                ✨ Y lo mejor de todo: lo conseguirás con un{" "}
                <span className="text-primaryColor">
                  sistema claro y probado
                </span>
                , funcionando para ti en menos de 7 días.
              </p>
            </div>
          </div>
        </section>

        {/* How You'll Achieve It Section */}
        <section id="how-to" className="py-16 sm:py-24 bg-darkBgColor">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Columna Izquierda: Panel de Texto */}
                <div className="relative z-10 p-8 sm:p-12 flex flex-col justify-center">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                      ¿Cómo lo Vas a Lograr?
                    </h2>
                    <p className="mt-2 text-lg text-primaryColor font-semibold">
                      Con tu propio Agente Digital de IA 24/7
                    </p>
                    <p className="mt-4 text-gray-400">
                      Implementamos un sistema inteligente que se encarga de las
                      tareas repetitivas para que tú te enfoques en lo que
                      realmente importa:
                    </p>
                  </div>

                  <ul className="space-y-4 mt-8">
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        size={20}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span className="text-lg text-gray-300">
                        Filtra clientes y responde preguntas frecuentes.
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        size={20}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span className="text-lg text-gray-300">
                        Agenda citas y cobra por adelantado.
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        size={20}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span className="text-lg text-gray-300">
                        Evita cancelaciones y asegura tu agenda.
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle
                        size={20}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span className="text-lg text-gray-300">
                        Listo para ti en menos de 7 días.
                      </span>
                    </li>
                  </ul>

                  <div className="mt-10">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
                    >
                      Quiero mi Agente Ahora
                    </button>
                  </div>
                </div>

                {/* Columna Derecha: Imagen */}
                {/* En pantallas grandes (lg), esta imagen se posicionará de forma absoluta para crear el efecto de superposición */}
                <div className="hidden lg:block lg:relative">
                  <img
                    src="/assets/orvexchat.png" // RECOMENDACIÓN: Usa aquí una imagen profesional de tu equipo o de una persona sonriendo.
                    alt="Un equipo profesional colaborando gracias a la eficiencia de Orvex"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Capa de degradado para fusionar la imagen con el fondo */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gray-900/50 to-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Timeline Section  */}
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
            {/* Título de la Sección */}
            <div className="text-center mb-24">
              <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                La Nueva Era de tu{" "}
                <span className="text-primaryColor">Operación</span>
              </h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Implementamos un sistema inteligente que se encarga del trabajo
                pesado para que tú te dediques a lo que nadie más puede hacer:
                hacer crecer tu negocio.
              </p>
            </div>

            {/* Contenedor de la Línea de Tiempo */}
            <div className="relative">
              {/* Línea Vertical Central (visible en pantallas grandes) */}
              <div className="hidden lg:block absolute top-12 bottom-12 left-1/2 w-0.5 bg-gray-800"></div>

              <div className="space-y-24">
                {/* Beneficio 1: Automatización */}
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-primaryColor rounded-full border-4 border-black ring-4 ring-primaryColor/50"></div>
                  {/* Columna de Imagen */}
                  <div className="lg:order-last">
                    <img
                      src="/assets/automatizacion.png"
                      alt="Dashboard de automatización"
                      className="rounded-lg shadow-md border border-gray-800 w-full h-auto object-contain lg:aspect-video"
                    />
                  </div>
                  {/* Columna de Texto */}
                  <div className="text-center lg:text-left">
                    <h3 className="text-3xl font-semibold text-white">
                      Automatización sin complicaciones
                    </h3>
                    <p className="mt-4 text-lg text-gray-400 leading-relaxed">
                      Olvídate de lo técnico y de contratar asistentes
                      adicionales. Te entregamos un sistema listo para usar,
                      completamente configurado, para que empieces a
                      aprovecharlo desde el primer día sin perder tiempo.
                    </p>
                    <div className="mt-8 flex justify-center lg:justify-start">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primaryColor text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-primaryColor/50"
                      >
                        Automatizar mi Negocio Ahora
                      </button>
                    </div>
                  </div>
                </div>

                {/* Beneficio 2: Conversión */}
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-primaryColor rounded-full border-4 border-black ring-4 ring-primaryColor/50"></div>
                  {/* Columna de Imagen */}
                  <div>
                    <img
                      src="/assets/calendar.png"
                      alt="Calendario con citas pagadas"
                      className="rounded-lg shadow-md border border-gray-800 w-full h-auto object-contain lg:aspect-video"
                    />
                  </div>
                  {/* Columna de Texto */}
                  <div className="text-center lg:text-left lg:pl-12">
                    <h3 className="text-3xl font-semibold text-white">
                      Agenda Llena + Cobro Asegurado
                    </h3>
                    <p className="mt-4 text-lg text-gray-400 leading-relaxed">
                      Se acabaron los ‘te confirmo después’. Con nuestro agente,
                      solo agendas a quienes pagan y van en serio. Más ventas
                      cerradas, menos tiempo perdido.
                    </p>
                    <div className="mt-8 flex justify-center lg:justify-start">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primaryColor text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-primaryColor/50"
                      >
                        Asegurar mis Cobros
                      </button>
                    </div>
                  </div>
                </div>

                {/* Beneficio 3: Escalabilidad */}
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-primaryColor rounded-full border-4 border-black ring-4 ring-primaryColor/50"></div>
                  {/* Columna de Imagen */}
                  <div className="lg:order-last">
                    <img
                      src="/assets/business.png"
                      alt="Gráfico de crecimiento 24/7"
                      className="rounded-lg shadow-md border border-gray-800 w-full h-auto object-contain lg:aspect-video"
                    />
                  </div>
                  {/* Columna de Texto */}
                  <div className="text-center lg:text-left">
                    <h3 className="text-3xl font-semibold text-white">
                      Tu Negocio Activo las 24 Horas, Sin Contratar Personal
                    </h3>
                    <p className="mt-4 text-lg text-gray-400 leading-relaxed">
                      Tu agente trabaja de forma continua: responde preguntas,
                      agenda citas y atrae nuevos clientes a cualquier hora, sin
                      nómina ni limitaciones de horario.
                    </p>
                    <div className="mt-8 flex justify-center lg:justify-start">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primaryColor text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-primaryColor/50"
                      >
                        Activar mi Agente 24/7
                      </button>
                    </div>
                  </div>
                </div>

                {/* Beneficio 4: Ventas */}
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-primaryColor rounded-full border-4 border-black ring-4 ring-primaryColor/50"></div>
                  {/* Columna de Imagen */}
                  <div>
                    <img
                      src="/assets/sales.png"
                      alt="Impulso de ventas con IA"
                      className="rounded-lg shadow-md border border-gray-800 w-full h-auto object-contain lg:aspect-video"
                    />
                  </div>
                  {/* Columna de Texto */}
                  <div className="text-center lg:text-left lg:pl-12">
                    <h3 className="text-3xl font-semibold text-white">
                      Tu Mejor Vendedor, Siempre Activo
                    </h3>
                    <p className="mt-4 text-lg text-gray-400 leading-relaxed">
                      Un agente que nunca se detiene: comparte promociones,
                      impulsa tus ventas y mantiene a tus clientes pensando en
                      tu negocio, incluso mientras duermes.
                    </p>
                    <div className="mt-8 flex justify-center lg:justify-start">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primaryColor text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-primaryColor/50"
                      >
                        Impulsar mi negocio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 sm:py-24 bg-darkBgColor">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Resultados, no solo promesas.
              </h2>
              <p className="mt-4 text-lg text-primaryColor font-semibold max-w-3xl mx-auto">
                Esto es lo que ORVEX consigue para tu negocio desde la primera
                semana.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Columna Izquierda: Beneficios Clave */}
              <div className="space-y-8">
                {benefitsData.map((benefit, index) => (
                  <BenefitCard
                    key={index}
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                  />
                ))}
              </div>

              {/* Columna Derecha: Plataforma CRM */}
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl">
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
              </div>
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
              <div className="lg:col-span-2 bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Una Inversión Inteligente, no un Gasto
                </h2>
                <p className="text-lg text-gray-400 mb-8">
                  Analicemos los números. Un asistente tradicional puede ser un
                  recurso valioso, pero ¿es la opción más eficiente?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-gray-700 p-6 rounded-xl">
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
                  </div>
                  <div className="border-2 border-primaryColor p-6 rounded-xl relative overflow-hidden">
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
                  </div>
                </div>
                <p className="mt-8 text-center text-lg text-gray-300 italic">
                  "Si hoy pierdes al menos una venta a la semana, ya estás
                  pagando el costo de NO tenerlo."
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl h-full flex flex-col">
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
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="final-cta" className="py-20 sm:py-24 bg-black">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              ¿Listo para Dejar de Perder Clientes y Tiempo?
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Es hora de implementar la solución de IA que trabaja por ti 24/7,
              convierte más y te devuelve el control de tu negocio.
            </p>
            <div className="mt-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primaryColor hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105 inline-block text-xl"
              >
                Quiero Implementar mi Agente de IA Ahora
              </button>
            </div>
          </div>
        </section>

        {/* --- SECCIÓN DE PRECIOS AÑADIDA --- 
        <section id="pricing" className="py-16 sm:py-24 bg-darkBgColor">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Un Plan para Cada Etapa de tu Negocio
              </h2>
              <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                Elige la potencia que necesitas hoy y escala con nosotros
                mañana. Sin complicaciones.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-gray-900 p-8 rounded-2xl border h-full flex flex-col shadow-lg 
                            ${
                              plan.isPopular
                                ? "border-2 border-primaryColor relative scale-105 shadow-2xl"
                                : "border-gray-800"
                            }`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primaryColor text-white text-sm font-bold px-4 py-1 rounded-full">
                      Más Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-primaryColor font-semibold mt-1">
                    {plan.description}
                  </p>
                  <div className="my-8">
                    <span
                      className={`font-bold text-white ${
                        plan.priceDetails ? "text-5xl" : "text-4xl"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.priceDetails && (
                      <span className="text-lg text-gray-400">
                        {" "}
                        {plan.priceDetails}
                      </span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-white text-lg mb-4">
                      {plan.extraInfo || "Características Principales:"}
                    </h4>
                    <ul className="space-y-3 text-gray-300 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="text-green-500 flex-shrink-0" />{" "}
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {plan.name !== "Personalizado" && (
                      <>
                        <h4 className="font-bold text-white text-lg mb-4 border-t border-gray-700 pt-6">
                          Incluido en todos los planes:
                        </h4>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-semibold">
                                WhatsApp Business API Gratuita:
                              </span>{" "}
                              Te ayudamos con la configuración y la verificación
                              oficial (sello azul).
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-semibold">
                                Bandeja de Entrada Omnicanal:
                              </span>{" "}
                              Gestiona WhatsApp, Instagram, Messenger y más en
                              un solo lugar.
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-semibold">
                                Plataforma de Equipo:
                              </span>{" "}
                              Asigna conversaciones, crea plantillas y
                              automatiza respuestas.
                            </div>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={`mt-8 block w-full text-center font-bold py-3 px-8 rounded-full transition-colors duration-300 
                                ${
                                  plan.isPopular
                                    ? "bg-primaryColor hover:bg-red-700 text-white"
                                    : "bg-gray-700 hover:bg-gray-600 text-white"
                                }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        */}

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

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-24 bg-black">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
              Agenda tu Demostración Gratuita Ahora
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Elige la fecha y hora que mejor te convenga. En menos de 30
              minutos, descubrirás cómo nuestros agentes de IA pueden
              transformar tu negocio.
            </p>

            <div
              className="bg-darkBgColor rounded-xl shadow-xl overflow-hidden"
              style={{ height: "700px" }}
            >
              <CalendlyEmbed url="https://calendly.com/henryaf0519/reunion-demo-orvex" />
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Al agendar, aceptas nuestra{" "}
              <span className="text-primaryColor hover:underline cursor-pointer">
                Política de Privacidad
              </span>
              .
            </p>
          </div>
        </section>
      </div>
      <CalendlyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        url="https://calendly.com/henryaf0519/reunion-demo-orvex"
      />
    </>
  );
};

export default AgentesIA;
