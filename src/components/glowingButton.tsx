import React, { useState } from "react";
import ReactDOM from "react-dom";
import SignupFormDemo from "./form/form";
const WHATSAPP_LINK = "https://wa.me/573237407414?text=Hola%20estoy%20interesado%20en%20sus%20servicios";
const GlowingButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  // La función que crea el portal
 const modal = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-darkBgColor bg-opacity-50">
      <div className="relative bg-darkBgColor rounded-3xl shadow-lg p-6 w-full max-w-md h-[90vh] sm:h-[90vh] overflow-auto border-2 border-white">
        {/* Botón de cerrar */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-white hover:text-gray-700 text-2xl leading-none"
        >
          &times;
        </button>

        <SignupFormDemo closeModal={() => setIsModalOpen(false)}/>
      </div>
    </div>
    );

  return (
    <>
      <a
        className="mt-10 relative inline-flex items-center justify-center w-64 h-19 rounded-full p-1 group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Background glow element (no change needed here, it adapts) */}
        <div
          className="
      absolute
      -inset-0.5
      bg-gradient-to-r from-[#FF0000] to-[#EF4444]
      rounded-full
      blur-lg
      opacity-75
      group-hover:opacity-500
      transition
      duration-1000
      group-hover:duration-3000
      animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]
    "
        ></div>

        {/* Button content - THIS IS WHERE THE CHANGE HAPPENS */}
        <div
    className="
      relative
      w-36 h-10      /* Even Smaller Mobile size */
      px-4 py-2      /* Smaller Mobile padding */
      text-sm        /* Smaller Mobile text size */
      md:w-60 md:h-[50px] /* Desktop size: Stays the same */
      md:px-10 md:py-4 /* Desktop padding: Stays the same */
      md:text-lg     /* Desktop text size: Stays the same */
      font-bold
      text-white
      bg-primaryColor
      rounded-full
      leading-none
      flex
      items-center
      justify-center
      transform
      group-hover:scale-105
      transition-transform
      duration-300
      ease-in-out
      cursor-pointer
    "
  >
    Agendar Demo
  </div>
      </a>
      {isModalOpen && ReactDOM.createPortal(modal, document.body)}
    </>
  );
};

export default GlowingButton;
