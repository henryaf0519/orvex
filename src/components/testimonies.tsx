import React, { useRef, useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonies } from "../../utils/utils"

declare global {
    interface Window {
        gsap: any;
        ScrollTrigger: any;
    }
}
interface CardProps {
    className?: string;
    title: string;
    description: string;
    children?: React.ReactNode;
    img: string;
    author:string;
}

const Card: React.FC<CardProps> = ({ className, title, description, children, img, author }) => (
  <div
    className={`w-full bg-white rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 md:p-8 
                flex flex-col justify-between 
                transition-all duration-300 transform hover:scale-105 
                md:h-[425px] min-h-[380px] ${className}`} // Añadido md:h-[425px] para desktop
  >

    {/* Título y descripción */}
    <div className="flex flex-col items-center space-y-2 text-center">
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 break-words">
        {title}
      </h3>
      <p className="text-base sm:text-lg text-gray-600 opacity-90 break-words">
        {description}
      </p>
    </div>

    {/* Imagen + children */}
    <div className="flex items-center gap-4 mt-6 flex-wrap">
       <h1 className='text-gray-600'>{author}.</h1>
      
      <div className="flex-grow break-words text-sm sm:text-base">
        {children}
      </div>
    </div>
  </div>
);









export const VerticalScrollTestimonials: React.FC = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardsData = testimonies();

  useEffect(() => {
    if (gsap && ScrollTrigger && mainContainerRef.current) {
        gsap.registerPlugin(ScrollTrigger);

        const pinElement = pinContainerRef.current;
        // Animar todas las tarjetas excepto la primera
        const cardsToAnimate = cardRefs.current.slice(1);

        if (!pinElement || cardsToAnimate.some(card => !card)) return;

        // Establecer el estado inicial de las tarjetas que se animarán
        gsap.set(cardsToAnimate, {
            y: 100,
            scale: 0.9,
            opacity: 0,
            transformOrigin: 'top center',
        });

        // Crear una línea de tiempo de GSAP controlada por el desplazamiento
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: pinElement,
                pin: true,
                start: "top top",
                end: `+=${cardsToAnimate.length * 500}`, 
                scrub: 2, 
            },
        });

        // Animación para cada tarjeta
        cardsToAnimate.forEach((card, index) => {
            const rotationDeg = -4 + index; // Inicia en -4 y se incrementa
            tl.to(card, {
                y: 0,
                scale: 1,
                opacity: 1,
                rotation: rotationDeg, // Aplica la rotación incremental
                ease: "power2.inOut",
            });
        });
    }

    // Función de limpieza para evitar fugas de memoria al eliminar ScrollTriggers
    return () => {
        ScrollTrigger?.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main ref={mainContainerRef}>
  <section
    ref={pinContainerRef}
    className="min-h-[700px] flex items-center justify-center flex-col px-4"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-white">
      Lo que dicen de nosotros
    </h2>

    <div
      className="
        relative 
        w-full 
        max-w-[600px] 
        aspect-[3/2] 
        md:h-[350px] 
        md:aspect-auto
      "
    >
      {cardsData.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => (cardRefs.current[index] = el)}
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: card.zIndex }}
        >
          <Card
            className={`bg-gradient-to-br ${card.color} border-2 border-black`}
            title={card.title}
            description={card.description}
            img={card.img}
            author= {card.author}
          >
            <div className="text-sm opacity-60">{card.author}</div>
          </Card>
        </div>
      ))}
    </div>
  </section>
</main>

  );
};

export default VerticalScrollTestimonials;