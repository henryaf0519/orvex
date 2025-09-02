import { useState } from "react";
import ReactDOM from "react-dom";
//import InstagramIcon from "/assets/Iwhite.svg";
//import Whastsapp from "/assets/ww.svg";
import SignupFormDemo from "./form/form";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const primaryColor = "#FF0000"; // Rojo de Orvex

  // Modal JSX
  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-darkBgColor bg-opacity-50"
      onClick={() => setIsModalOpen(false)} // Cerrar modal al hacer clic en el fondo
    >
      <div
        className="relative bg-darkBgColor rounded-3xl shadow-lg p-6 w-full max-w-md h-[90vh] sm:h-[90vh] overflow-auto border-2 border-white"
        onClick={(e) => e.stopPropagation()} // Prevenir que el clic en el modal lo cierre
      >
        {/* Botón de cerrar */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-white hover:text-gray-700 text-2xl leading-none"
        >
          &times;
        </button>

        <SignupFormDemo  closeModal={() => setIsModalOpen(false)}/>
      </div>
    </div>
  );

  return (
    <>
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          {/* Texto legal */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">
              © 2025 Orvex. Todos los derechos reservados.
            </p>
          </div>

          {/* Íconos + botón */}
          <div className="flex flex-col items-center md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            {/* Íconos */}
            <div className="flex space-x-4">
              {/* Botón  <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-pink-600 transition"
              >
                <img
                  src={InstagramIcon}
                  alt="Instagram"
                  className="w-6 h-6 object-contain"
                />
              </a>
              
              
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-green-500 transition"
              >
                <img
                  src={Whastsapp}
                  alt="Whatsapp"
                  className="w-6 h-6 object-contain"
                />
              </a>
                  */
            }
           
            </div>

            {/* Botón 
            <button
              className="mt-4 md:mt-0 px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out"
              style={{
                backgroundColor: primaryColor,
                color: "white",
                boxShadow: `0 4px 15px rgba(255, 0, 0, 0.4)`,
              }}
              onClick={() => setIsModalOpen(true)}
            >
              Agendar Demo
            </button>
            */
            }
          </div>
        </div>
      </footer>

      {/* Mostrar el modal cuando isModalOpen es true */}
      {isModalOpen && ReactDOM.createPortal(modal, document.body)}
    </>
  );
};

export default Footer;
