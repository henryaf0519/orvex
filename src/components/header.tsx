import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import SignupFormDemo from "./form/form";
import {Link } from "react-router-dom";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Cambiar el estado del menú
  };
  const primaryColor = "#FF0000"; // Rojo de Orvex

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-darkBgColor bg-opacity-50">
      <div className="relative bg-darkBgColor rounded-3xl shadow-lg p-6 w-full max-w-md h-[90vh] sm:h-[90vh] overflow-auto border-2 border-white">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-white hover:text-gray-700 text-2xl leading-none"
        >
          &times;
        </button>

        <SignupFormDemo closeModal={() => setIsModalOpen(false)} />
      </div>
    </div>
  );

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
      <nav className="shadow-md py-4 px-6 flex justify-between items-center w-full z-10 sticky top-0 bg-opacity-90 backdrop-blur-sm bg-darkBgColor">
        <div className="flex items-center">
          {/* Logo de Orvex */}
          <div className=" mr-2">
            <img
              src="/assets/logo.png"
              alt="Orvex Logo"
              className="w-[150px] h-auto md:w-[200px] md:h-[55px] object-contain"
            />
          </div>
        </div>
        {/* Menú de navegación para dispositivos grandes */}
        <div className="space-x-6 hidden md:flex">
          <a
            href="#inicio"
            className="hover:text-gray-400 font-medium transition-colors duration-200"
            style={{ color: "white" }}
          >
            Inicio
          </a>
          <a
            href="#servicios"
            className="hover:text-gray-400 font-medium transition-colors duration-200"
            style={{ color: "white" }}
          >
            Servicios
          </a>
          <a
            href="#testimonios"
            className="hover:text-gray-400 font-medium transition-colors duration-200"
            style={{ color: "white" }}
          >
            Testimonios
          </a>
          <Link
            to="/landing"
            className="hover:text-gray-400 font-medium transition-colors duration-200"
            style={{ color: "white" }}
          >
            Agentes IA
          </Link>
          <button
            className="px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: primaryColor,
              color: "white",
              boxShadow: `0 4px 15px rgba(255, 0, 0, 0.4)`,
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Agendar Demo
          </button>
        </div>

        {/* Botón de menú para móviles */}
        <button
          className="md:hidden text-white hover:text-gray-400"
          onClick={toggleMenu} // Cambia el estado del menú
        >
          {/* Icono de menú (hamburguesa) */}
          <svg
            className={`w-6 h-6 ${isMenuOpen ? "hidden" : "block"}`} // Mostrar solo si el menú está cerrado
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>

          {/* Icono de cerrar menú (X) */}
          <svg
            className={`w-6 h-6 ${isMenuOpen ? "block" : "hidden"}`} // Mostrar solo si el menú está abierto
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </nav>

      {/* Menú desplegable para móviles */}
      {isMenuOpen && (
        <div className="fixed left-0 w-full bg-darkBgColor z-10 md:hidden flex flex-col space-y-4 px-6 pb-6 shadow-md">
          <a
            onClick={toggleMenu}
            href="#inicio"
            className="hover:text-gray-400 font-medium transition-colors duration-200"
            style={{ color: "white" }}
          >
            Inicio
          </a>
          <a
            onClick={toggleMenu}
            href="#servicios"
            className="hover:text-gray-400 font-medium transition-colors duration-200"
            style={{ color: "white" }}
          >
            Servicios
          </a>
          <a
            onClick={toggleMenu}
            href="#testimonios"
            className="hover:text-gray-400 font-medium transition-colors duration-200"
            style={{ color: "white" }}
          >
            Testimonios
          </a>
           <Link
            to="/landing"
            className="hover:text-gray-400 font-medium transition-colors duration-200"
            style={{ color: "white" }}
          >
            Agentes IA
          </Link>
          <button
            className="px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: primaryColor,
              color: "white",
              boxShadow: `0 4px 15px rgba(255, 0, 0, 0.4)`,
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Agendar Demo
          </button>
        </div>
      )}

      {/* Modal de demo */}
      {isModalOpen && ReactDOM.createPortal(modal, document.body)}
    </>
  );
};

export default Header;
