import React from "react";
import CalendlyEmbed from "../components/CalendlyEmbed";
import { usePageTitle } from "../hooks/usePageTitle";

const AgendarDemo: React.FC = () => {
  usePageTitle("Orvex | Agenda tu Demo");
  return (
    <>
      <section id="contact" className="py-16 sm:py-24 bg-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Agenda tu Demostración Gratuita Ahora
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Elige la fecha y hora que mejor te convenga. En menos de 30 minutos,
            descubrirás cómo nuestros agentes de IA pueden transformar tu
            negocio.
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
    </>
  );
};

export default AgendarDemo;
