"use client";
import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  DollarSign,
  MessageSquare,
  Code,
  Laptop,
  Settings,
} from "lucide-react";
import Header from "../components/header";
import ToolCard from "../components/toolCards";
import { VerticalScrollTestimonials } from "../components/testimonies";
import { useScroll, useTransform } from "motion/react";
import { TitleAnimate } from "../components/titleAnimate";
import MobileTestimonialsCarousel from "../components/mobileTestimonies";
import { CardBody, CardContainer, CardItem } from "../components/3d-card";
import { usePageTitle } from "../hooks/usePageTitle";

const Home: React.FC = () => {
  usePageTitle("Orvex | Potencia Tu Negocio");
  const [isMobile, setIsMobile] = useState(false);
  const updateDevice = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  useEffect(() => {
    updateDevice(); // Verifica el tamaño de la pantalla al cargar
    window.addEventListener("resize", updateDevice); // Actualiza el estado en cambio de tamaño de la pantalla

    return () => {
      window.removeEventListener("resize", updateDevice);
    };
  }, []);
  return (
    <div className="min-h-screen bg-darkBgColor">
      <Header />
      <div
        id="inicio"
        className="h-[200vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
        ref={ref}
      >
        <TitleAnimate
          title=" Potencia Tu Negocio con"
          description=" Cada pregunta repetida que responde un empleado es tiempo perdido. Cada visitante que abandona tu web sin respuesta es una venta perdida. En Orvex, recuperamos ese tiempo y convertimos visitantes, permitiendo que tu equipo se enfoque en lo que realmente importa: hacer crecer el negocio."
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
        />
      </div>
      <div id="servicios" className="h-[70px] md:h-[80px]"></div>
      <section className="px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className=" flex items-center justify-center"></div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Nuestros Servicios Innovadores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            <CardContainer className="inter-var m-4 w-full sm:w-[80%] lg:w-[100%] border border-white rounded-xl transition-all duration-300 hover:border-neonRed hover:ring-4 hover:ring-neonRed">
              <CardBody className="bg-darkBgColor relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border transition-all duration-300">
                <div className="flex items-center justify-start space-x-4 h-[150]">
                  <CardItem translateZ="100" className="mt-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-primaryColor text-white">
                      <CalendarCheck size={32} />
                    </div>
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-white dark:text-white mb-4"
                  >
                    Agentes IA para Agendar Citas
                  </CardItem>
                </div>

                <CardItem
                  translateZ="50"
                  className="text-base font-bold text-white dark:text-white h-auto md:h-[250px]"
                >
                  Nuestros agentes de IA no solo llenan tu agenda, sino que se
                  aseguran de que tus pacientes acudan. Envían recordatorios
                  inteligentes y gestionan confirmaciones y cancelaciones de
                  forma automática, 24/7. Reduce a cero las ausencias y maximiza
                  la rentabilidad de tu consulta.
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer className="inter-var m-4 w-full sm:w-[80%] lg:w-[100%] border border-white rounded-xl transition-all duration-300 hover:border-neonRed hover:ring-4 hover:ring-neonRed">
              <CardBody className="bg-darkBgColor relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
                <div className="flex items-center justify-start space-x-4  h-[150]">
                  <CardItem translateZ="100" className=" mt-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-primaryColor text-white">
                      <DollarSign size={32} />
                    </div>
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-white dark:text-white mb-4 "
                  >
                    Agentes IA especializados en pagos
                  </CardItem>
                </div>
                <CardItem
                  translateZ="50"
                  className="text-base font-bold text-white dark:text-white h-auto md:h-[250px]"
                >
                  Se acabó la incertidumbre y la persecución de facturas.
                  Nuestro agente IA convierte una simple reserva en un contrato
                  pagado. El cliente elige el servicio, agenda la cita y paga en
                  un único paso, seguro y profesional. Tu flujo de caja se
                  automatiza y tu tiempo se dedica a dar el servicio, no a
                  cobrarlo.
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer className="inter-var m-4 w-full sm:w-[80%] lg:w-[100%] border border-white rounded-xl transition-all duration-300 hover:border-neonRed hover:ring-4 hover:ring-neonRed">
              <CardBody className="bg-darkBgColor relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
                <div className="flex items-center justify-start space-x-4  h-[150]">
                  <CardItem translateZ="100" className="mt-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-primaryColor text-white">
                      <MessageSquare size={32} />
                    </div>
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-white dark:text-white mb-4"
                  >
                    Chatbots IA para Web y WhatsApp
                  </CardItem>
                </div>

                <CardItem
                  translateZ="50"
                  className="text-base font-bold text-white dark:text-white h-auto md:h-[250px]"
                >
                  ¿Precio? ¿Horario? ¿Hacen envíos?. Responder lo mismo una y
                  otra vez te roba el tiempo que necesitas para pensar en
                  grande. Delega esa tarea repetitiva a un agente de IA que
                  trabaja en tu web y WhatsApp. Atenderá a cientos de clientes a
                  la vez con la información correcta, liberándote para que tú
                  hagas lo que nadie más puede hacer: dirigir.
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer className="inter-var m-4 w-full sm:w-[80%] lg:w-[100%] border border-white rounded-xl transition-all duration-300 hover:border-neonRed hover:ring-4 hover:ring-neonRed">
              <CardBody className="bg-darkBgColor relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
                <div className="flex items-center justify-start space-x-4  h-[150]">
                  <CardItem translateZ="100" className=" mt-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-primaryColor text-white">
                      <Code size={32} />
                    </div>
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-white dark:text-white mb-4"
                  >
                    Desarrollo de Páginas Web
                  </CardItem>
                </div>
                <CardItem
                  translateZ="50"
                  className="text-base font-bold text-white dark:text-white h-auto md:h-[250px]"
                >
                  Una web lenta, confusa o que se ve mal en el móvil destruye tu
                  credibilidad al instante. Construimos la presencia digital que
                  tu negocio merece: rápida, clara y profesional en cualquier
                  dispositivo. Proyectamos una imagen de autoridad y confianza
                  que hace que los clientes quieran trabajar contigo antes
                  incluso de haberte llamado.
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer className="inter-var m-4 w-full sm:w-[80%] lg:w-[100%] border border-white rounded-xl transition-all duration-300 hover:border-neonRed hover:ring-4 hover:ring-neonRed">
              <CardBody className="bg-darkBgColor relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
                <div className="flex items-center justify-start space-x-4  h-[150]">
                  <CardItem translateZ="100" className=" mt-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-primaryColor text-white">
                      <Laptop size={32} />
                    </div>
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-white dark:text-white mb-4"
                  >
                    Rediseño y Optimización Web
                  </CardItem>
                </div>

                <CardItem
                  translateZ="50"
                  className="text-base font-bold text-white dark:text-white 
                  "
                >
                  Tu página web es tu carta de presentación digital. Si se
                  siente vieja, lenta o descuidada, esa es la imagen que
                  proyectas. No se trata solo de cambiar colores; se trata de
                  restaurar tu credibilidad. Modernizamos la estética y la
                  experiencia de tu sitio para que refleje la calidad de tu
                  trabajo y vuelvas a sentirte orgulloso de compartir tu
                  dirección web.
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer className="inter-var m-4 w-full sm:w-[80%] lg:w-[100%] border border-white rounded-xl transition-all duration-300 hover:border-neonRed hover:ring-4 hover:ring-neonRed">
              <CardBody className="bg-darkBgColor relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
                <div className="flex items-center justify-start space-x-4">
                  <CardItem translateZ="100" className="mt-4">
                    <div className="flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 rounded-full mb-6 bg-primaryColor text-white">
                      <Settings size={32} />
                    </div>
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-white dark:text-white mb-4"
                  >
                    Automatización a Medida
                  </CardItem>
                </div>
                <CardItem
                  translateZ="50"
                  className="text-base font-bold text-white dark:text-white h-auto md:h-[250px]"
                >
                  Copiar y pegar datos, enviar emails de seguimiento, generar
                  informes... Tu equipo tiene talento, pero lo malgasta en
                  tareas manuales que un sistema automático haría en segundos,
                  sin errores y sin quejarse. Diseñamos automatizaciones a
                  medida que liberan a tus empleados para que se dediquen a
                  vender, a crear y a hablar con clientes, que es donde de
                  verdad aportan valor.
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
          <div className="mt-20 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Tus Plataformas favoritas, ahora más inteligentes
            </h2>
          </div>
        </div>
      </section>
      <div id="testimonios">
        <div
          className="max-w-7xl mx-auto h-[2px] w-full
                bg-[linear-gradient(90deg,transparent,#EF4444,#F97316,transparent)]"
        />
        <ToolCard />
        <div
          className="max-w-7xl mx-auto h-[2px] w-full
                bg-[linear-gradient(90deg,transparent,#EF4444,#F97316,transparent)]"
        />
      </div>
      <section className="px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          {isMobile ? (
            <MobileTestimonialsCarousel />
          ) : (
            <VerticalScrollTestimonials />
          )}
        </div>
      </section>
      <section className="mt-[100px]">
        <div>
          <div
            className="max-w-7xl mx-auto h-[2px] w-full
                bg-[linear-gradient(90deg,transparent,#EF4444,#F97316,transparent)]"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
