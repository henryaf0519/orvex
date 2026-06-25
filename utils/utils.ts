import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

  export function testimonies (){
    const cardsData = [
    {
      id: 1,
      title: "Orvex logró algo que creíamos imposible: una experiencia impecable tanto en nuestra web como en WhatsApp.",
      description:
        "“Orvex transformó nuestra operatividad al integrar nuestra web y WhatsApp en un solo motor comercial. Ahora, los clientes pueden cotizar y elegir planes con la misma fluidez, ya sea navegando en nuestra web o mediante nuestra automatización en WhatsApp. Gracias a su desarrollo 100% digital, logramos una experiencia impecable y automatizada que no descansa. Orvex no solo entregó software, nos entregó una verdadera máquina de ventas.”",
      color: "bg-white",
      zIndex: 10,
      author: "Arriendy",
      img: "/assets/arriendy.webp",
    },
    {
      id: 2,
      title: "Orvex logró lo que parecía imposible: un e-commerce unificado para dos mercados, con métodos de pago y logística local adaptados",
      description:
        "“Orvex escaló nuestro negocio al crear un e-commerce unificado para Colombia y EE. UU., integrando soluciones logísticas y de pago locales como Wompi, Stripe y Shippo. Lo mejor es que nos entregaron un panel administrativo intuitivo, permitiéndonos gestionar todo el inventario de forma autónoma, sin depender de ellos. Orvex simplificó una operación técnica compleja y nos dio el control total para vender globalmente.”",
      color: "bg-white",
      zIndex: 10,
      author: "Root & Cane - Ecommerce",
      img: "/assets/arriendy.webp",
    },
     {
      id: 3,
      title: "De la gestión manual a las ventas automáticas por WhatsApp.",
      description:
        "“Orvex transformó nuestra forma de vender al automatizar completamente nuestro WhatsApp para la gestión de planes de seguridad social. Gracias a su implementación, ahora el sistema se encarga de ofrecer y cerrar los planes de forma autónoma, eliminando cuellos de botella operativos. Orvex no solo optimizó nuestro canal principal, sino que nos permitió escalar las ventas de manera eficiente y sin intervención manual constante.”",
      color: "bg-white",
      zIndex: 10,
      author: "Afiliamos – Seguridad Social",
      img: "/assets/arriendy.webp",
    },
    {
      id: 4,
      title: "Estábamos perdiendo pacientes porque éramos incapaces de responder a los emails",
      description:
        "“Antes, los pacientes nos escribían para pedir cita, pero esos correos quedaban sin respuesta, perdiendo oportunidades constantemente. Orvex optimizó nuestra web e implementó un sistema que responde y agenda automáticamente, transformando nuestra frustración en una agenda gestionada sola, ofreciendo finalmente la experiencia profesional que nuestros pacientes merecen.”",
      color: "bg-white",
      zIndex: 10,
      author: "Appodium – Consultorio de Psicología",
      img: "/assets/appodium.webp",
    },
    {
      id: 5,
      title:
        "Son el único equipo de diseño al que le confiamos el trabajo de nuestros propios clientes",
      description:
        "“Como empresa audiovisual, nuestro estándar de calidad es todo. Orvex ha demostrado un nivel de compromiso y talento que nos da la total tranquilidad de delegarles proyectos para nuestros clientes más importantes. Entienden nuestra visión y siempre entregan un trabajo que podemos presentar con orgullo en el diseño web y otros.”",
      color: "bg-white",
      zIndex: 20,
      author: "Cuwo Creativo",
      img: "/assets/cuwo.webp",
    },
    {
      id: 4,
      title: "Crearon el hogar digital perfecto para nuestra comunidad de bienestar",
      description:
        "“Lo que más valoramos de Orvex fue su increíble atención al detalle. Les pedimos una web interactiva y llamativa, y superaron nuestras expectativas. El resultado es una plataforma que no solo funciona a la perfección, sino que ofrece una experiencia visual que ha encantado a nuestra comunidad.”",
      color: "bg-white",
      zIndex: 30,
      author: "Holiment - Comunidad de Bienesta",
      img: "/assets/holiment.webp",
    },
    {
      id: 6,
      title: "Un apoyo clave",
      description:
        "“Me sorprendió la capacidad de Orvex para entender las necesidades de nuestro negocio. A lo largo de nuestra colaboración, demostraron un gran profesionalismo y compromiso. Sin duda, su apoyo ha sido un factor clave para nuestro éxito.”",
      color: "bg-white",
      zIndex: 50,
      author: "Milena García - Asesora de Créditos Hipotecarios",
      img: "/assets/milena.webp",
    },
    {
      id: 7,
      title: "Supieron traducir mi marca personal en una landing page que vende",
      description:
        "“Lo que más me gustó de trabajar con Orvex fue cómo unieron la creatividad con la tecnología. Usaron la IA para crear elementos de diseño únicos y construyeron una landing page que no solo respeta mi marca personal, sino que está perfectamente optimizada para alcanzar mis objetivos comerciales.”",
      color: "bg-white",
      zIndex: 60,
      author: "Sherina - Mentora",
      img: "/assets/sherina.webp",
    }
  ];
    return cardsData

  }



