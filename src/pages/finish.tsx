// src/pages/finish.tsx
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";

const FinishPage: React.FC = () => {
  usePageTitle("Orvex | Demo Confirmado");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkBgColor text-white text-center px-4 overflow-hidden">
      <div className="relative bg-gray-900/50 p-8 md:p-12 rounded-2xl border border-primaryColor/30 shadow-2xl max-w-2xl w-full">
        {/* Icono de check animado */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>

        <img
          src="/assets/logo.png"
          alt="Orvex Logo"
          className="w-40 md:w-56 mb-8 mx-auto"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ¡Tu demo ha sido confirmado!
        </h1>
        <p className="text-md md:text-lg text-gray-400 leading-relaxed mb-10">
          Has dado el primer paso para transformar tu negocio. Hemos enviado
          todos los detalles de la reunión a tu correo electrónico. Prepárate
          para impulsar el crecimiento de tu negocio.
        </p>
        <Link
          to="/landing"
          className="bg-primaryColor hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-primaryColor/50 text-lg"
        >
          Inicio
        </Link>
      </div>
    </div>
  );
};

export default FinishPage;