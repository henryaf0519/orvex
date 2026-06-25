import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Monitor, Video } from 'lucide-react';
interface Option {
    label: string;
    price: number;
    details: string[];
    flow?: 'landing' | 'ecommerce'; // '?' significa que es opcional
}

// Define la estructura de un paso
interface Step {
    id: string;
    title: string;
    flow?: 'landing' | 'ecommerce'; // '?' significa que es opcional
    options: Option[];
}

// --- CONFIGURACIÓN MAESTRA ---
const DATA: Record<string, { steps: Step[] }> = {
    web: {
        steps: [
            // Paso 0: El selector de camino
            {
                id: 'tipo', title: 'Tipo de sitio', options: [
                    { label: 'Landing', price: 600000, details: ['Diseño', 'WhatsApp + formulario', 'Email'], flow: 'landing' },
                    { label: 'E-commerce', price: 800000, details: ['Diseño', 'Carrito', 'Checkout', 'Pasarela de Pagos', 'Menú Administrativo', 'Subes los productos y gestionas el inventario', 'Nosotros', 'Preguntas Frecuentes'], flow: 'ecommerce' }
                ]
            },
            {
                id: 'pagos', title: 'Pasarela de Pagos', flow: 'ecommerce', options: [
                    { label: 'Sí, quiero pasarela', price: 300000, details: ['Wompi, Stripe', 'Débito/crédito', 'Nequi, bre-B, Daviplata'] },
                    { label: 'Sin pasarela', price: 0, details: ['Checkout enviado a WhatsApp'] }
                ]
            },
            {
                id: 'admin', title: 'Menú Administrativo', flow: 'ecommerce', options: [
                    { label: 'Sí, quiero menú', price: 200000, details: ['Creación de inventarios', 'Gestión de productos', 'Gestión de pedidos', 'Gestión de usuarios', 'Facturación electrónica'] },
                    { label: 'Sin menú administrativo', price: 0, details: [] }
                ]
            },
            {
                id: 'descuentos', title: 'Descuentos', flow: 'ecommerce', options: [
                    { label: 'Sí, quiero descuentos', price: 100000, details: ['Mostrar descuentos en el sitio', 'Código de descuento'] },
                    { label: 'Sin descuentos', price: 0, details: [] }
                ]
            },
            // --- CAMINO LANDING ---
            {
                id: 'pagos_landing', title: 'Pasarela de Pagos', flow: 'landing', options: [
                    { label: 'Pasarela de pagos', price: 200000, details: ['Wompi, Stripe', 'Débito/crédito', 'Nequi, bre-B, Daviplata'] },
                    { label: 'Sin pasarela', price: 0, details: [] },
                ]
            },
            {
                id: 'estructura', title: 'Estructura Landing', flow: 'landing', options: [
                    { label: '1 página', price: 0, details: ['Estructura básica'] },
                    { label: '3 páginas', price: 100000, details: ['Home', 'Nosotros', 'Contacto y Preguntas Frecuentes'] },
                    { label: '5 páginas', price: 200000, details: ['Personalización total'] }
                ]
            },
            // --- PASOS GENERALES (Sin 'flow', aparecen en ambos) ---
            {
                id: 'dominio', title: 'Dominio y Hosting', options: [
                    { label: 'Lo pagas tú', price: 0, details: ['Te ayudamos para que te salga lo mas económico posible'] }
                ]
            },
            {
                id: 'entrega', title: 'Entrega', options: [
                    { label: 'Urgente (1 sem)', price: 200000, details: ['Prioridad máxima', 'Ideal para lanzamientos'] },
                    { label: 'Estándar (2 sem)', price: 0, details: ['No tengo afán'] },
                ]
            }
        ]
    },
    video: {
        steps: [
            {
                id: 'pack', title: 'Selecciona tu Pack', options: [
                    { label: 'Video Individual', price: 160000, details: ['Hasta 60 seg', 'Edición', 'Subtítulos', 'Música', 'Formato vertical 9:16'] },
                    { label: 'Pack 4', price: 560000, details: ['Hasta 60 seg', 'Edición', 'Subtítulos', 'Música', 'Formato vertical 9:16'] },
                    { label: 'Pack 8', price: 960000, details: ['Hasta 60 seg', 'Edición', 'Subtítulos', 'Música', 'Formato vertical 9:16'] },
                    { label: 'Pack 12', price: 1320000, details: ['Hasta 60 seg', 'Edición', 'Subtítulos', 'Música', 'Formato vertical 9:16'] },
                    { label: 'Pack 20', price: 2000000, details: ['Hasta 60 seg', 'Edición', 'Subtítulos', 'Música', 'Formato vertical 9:16'] }
                ]
            },
            {
                id: 'modalidad', title: 'Modalidad de Video', options: [
                    { label: 'Video Sencillo', price: 0, details: ['Edición estándar', 'Sin IA'] },
                    { label: 'Avatar o Clon IA', price: 50000, details: ['Avatar personalizado'] },
                ]
            }
        ]
    }
};

const CotizadorPro: React.FC = () => {
    const [service, setService] = useState<'web' | 'video' | null>(null);
    const [step, setStep] = useState(0);
    const [selection, setSelection] = useState<Record<number, any>>({});

    // Función de filtrado definida antes del uso en useMemo
    const getFilteredSteps = (currentService: 'web' | 'video' | null, currentSelection: Record<number, any>) => {
        if (!currentService) return [];

        // Obtener la selección del paso 0 (Tipo de sitio)
        const selectedType = currentSelection[0];

        // Si no han seleccionado el primer paso aún, mostramos solo el primer paso
        if (!selectedType) return [DATA[currentService].steps[0]];

        return DATA[currentService].steps.filter(step => {
            // 2. Aquí el filtro usa 'step.flow' (asegúrate de que tu interfaz lo permita)
            return !step.flow || step.flow === selectedType.flow;
        });
    };

    // Se usa la función dentro del useMemo
    const steps = useMemo(() => getFilteredSteps(service, selection), [service, selection]);

    const total = useMemo(() =>
        Object.values(selection).reduce((acc, curr) => acc + (curr.price || 0), 0),
        [selection]);

    const prev = () => {
        if (step > 0) {
            setStep(s => s - 1);
        } else {
            // Si está en el primer paso, lo devolvemos a la pantalla principal
            resetSelection();
        }
    };

    const resetSelection = () => {
        setService(null); // Quita el servicio seleccionado (web o video)
        setStep(0);       // Reinicia el contador de pasos a 0
        setSelection({}); // Borra todo el historial de botones que el usuario había presionado
    };

    const next = () => {
        // Validar que el paso actual tenga una selección antes de avanzar
        if (!selection[step]) {
            alert("Por favor, selecciona una opción para continuar.");
            return;
        }

        if (step < steps.length - 1) {
            setStep(s => s + 1);
        } else {
            finalize();
        }
    };

    const formatLandingMessage = (selection: Record<number, any>, total: number) => {
        // Cambiamos s.id por s.stepId
        const get = (id: string) => Object.values(selection).find(s => s.stepId === id)?.label || "No";
        return `*Cotización E-commerce Orvex*\n\n*Proyecto:* Landing\n*Pasarela:* ${get('pagos_landing')}\n*Estructura:* ${get('estructura')}\n*Dominio:* ${get('dominio')}\n*Entrega:* ${get('entrega')}\n\n*Subtotal:* $${total.toLocaleString()}\n*Descuento (10%):* -$${(total * 0.1).toLocaleString()}\n*Total final:* $${(total * 0.9).toLocaleString()}\n\nQuiero contratar hoy y agendar el inicio.`;
    };

    const formatEcommerceMessage = (selection: Record<number, any>, total: number) => {
        // Cambiamos s.id por s.stepId
        const get = (id: string) => Object.values(selection).find(s => s.stepId === id)?.label || "No";
        return `*Cotización E-commerce Orvex*\n\n*Proyecto:* E-commerce\n*Pasarela:* ${get('pagos')}\n*Admin:* ${get('admin')}\n*Descuentos:* ${get('descuentos')}\n*Entrega:* ${get('entrega')}\n\n*Subtotal:* $${total.toLocaleString()}\n*Descuento (10%):* -$${(total * 0.1).toLocaleString()}\n*Total final:* $${(total * 0.9).toLocaleString()}\n\nQuiero contratar hoy y agendar el inicio.`;
    };

    const formatVideoMessage = (selection: Record<number, any>, total: number) => {
        // Cambiamos s.id por s.stepId
        const get = (id: string) => Object.values(selection).find(s => s.stepId === id)?.label || "No";
        return `*Cotización Video Orvex*\n\n*Pack:* ${get('pack')}\n*Modalidad:* ${get('modalidad')}\n\n*Total:* $${total.toLocaleString()}\n\nQuiero contratar hoy y agendar el inicio.`;
    };



    const finalize = () => {
        let message = "";
        const serviceType = selection[0]?.flow || (service === 'video' ? 'video' : 'landing');

        if (service === 'video') {
            message = formatVideoMessage(selection, total);
        } else if (serviceType === 'ecommerce') {
            message = formatEcommerceMessage(selection, total);
        } else {
            message = formatLandingMessage(selection, total);
        }

        window.open(`https://wa.me/573227596729?text=${encodeURIComponent(message)}`, '_blank');
    };

    if (!service) return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-8">
                <img src="/assets/logo.png" alt="Orvex Logo" className="h-24 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Cotizador <span className="text-red-600">Orvex</span></h1>
                <p className="text-gray-500 text-lg">Selecciona el servicio que quieres escalar hoy</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-xl">
                {[{ id: 'web', title: 'Desarrollo Web', icon: <Monitor size={40} /> }, { id: 'video', title: 'Contenido IA', icon: <Video size={40} /> }].map((s) => (
                    <button key={s.id} onClick={() => setService(s.id as any)} className="group relative p-8 border border-gray-800 rounded-3xl hover:border-red-600 transition-all bg-[#111111] hover:bg-gray-900 flex flex-col items-center gap-4">
                        <div className="text-gray-400 group-hover:text-red-500">{s.icon}</div>
                        <span className="font-bold text-xl text-white">{s.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-40">
            <div className="max-w-3xl mx-auto p-4 md:p-20">

                {/* --- CABECERA (Ahora con scroll horizontal para móvil) --- */}
                <div className="text-center mb-10 pt-10">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6">¿Qué vamos a crear hoy?</h1>
                    <div className="flex justify-center gap-3 overflow-x-auto pb-4 px-2 scrollbar-hide">
                        {[
                            { id: 'web', title: 'Desarrollo Web', icon: <Monitor size={20} /> },
                            { id: 'video', title: 'Contenido IA', icon: <Video size={20} /> }
                        ].map((s) => (
                            <button
                                key={s.id}
                                onClick={() => { setService(s.id as any); setStep(0); setSelection({}); }}
                                className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full border transition-all text-sm font-medium ${service === s.id ? 'border-red-600 bg-red-600/20' : 'border-gray-800 bg-[#111111]'
                                    }`}
                            >
                                {s.icon} {s.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- CONTENIDO DINÁMICO --- */}
                {service && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#111111] p-6 md:p-10 rounded-3xl border border-gray-800 mx-auto"
                        >
                            <h2 className="text-xl md:text-3xl font-bold mb-6">{steps[step].title}</h2>
                            <div className="grid grid-cols-1 gap-3">
                                {steps[step].options.map(opt => (
                                    <button
                                        key={opt.label}
                                        onClick={() => setSelection({ ...selection, [step]: { ...opt, stepId: steps[step].id } })}
                                        className={`p-4 md:p-6 border rounded-2xl text-left transition-all ${selection[step]?.label === opt.label ? 'border-red-600 bg-red-600/10' : 'border-gray-800 hover:border-red-500/30'}`}
                                    >
                                        <div className="font-bold flex justify-between mb-2 text-sm md:text-base">
                                            <span>{opt.label}</span>
                                            <span className="text-red-500">$ {opt.price.toLocaleString()}</span>
                                        </div>
                                        <ul className="text-gray-400 text-[11px] md:text-sm">
                                            {opt.details.filter(d => d !== "").map(d => <li key={d} className="flex items-center gap-2 mb-1"><Check size={12} className="text-red-600 shrink-0" /> {d}</li>)}
                                        </ul>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            {/* --- STEPPER FIJO MOBILE-FIRST --- */}
            {service && (
                <div className="fixed bottom-0 left-0 w-full p-4 md:p-6 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-gray-800 z-50">
                    <div className="max-w-3xl mx-auto flex justify-between items-center gap-4">
                        <div className="flex gap-1.5">
                            {steps.map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-red-600' : 'w-1.5 bg-gray-700'}`} />
                            ))}
                        </div>
                        <div className="flex items-center gap-2 md:gap-4">
                            <span className="text-sm md:text-xl font-mono hidden md:block">Total: </span>
                            <b className="text-red-500 text-lg md:text-2xl md:mr-2">$ {total.toLocaleString()}</b>

                            {/* Botón Anterior */}
                            <button
                                onClick={prev}
                                className="p-3 md:px-5 md:py-3 border border-gray-700 rounded-full font-bold text-sm flex items-center justify-center hover:bg-gray-800 hover:text-white text-gray-400 transition-all"
                                aria-label="Paso anterior"
                            >
                                <ChevronLeft size={18} className="md:mr-1" />
                                <span className="hidden md:inline">Anterior</span>
                            </button>

                            {/* Botón Siguiente */}
                            <button
                                onClick={next}
                                className="px-5 py-3 md:px-6 bg-red-600 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all"
                            >
                                {step === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                {step !== steps.length - 1 && <ChevronRight size={18} />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CotizadorPro;