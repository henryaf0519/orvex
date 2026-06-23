"use client";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
//import AgentesIA from "./pages/agentes-ia";
import FinishPage from "./pages/finish";
import AgendarDemo from "./pages/agendarDemo";
import AnalyticsTracker from "./components/AnalyticsTracker";
import ConferenciaIA from "./pages/conferenciaIA";
import Cotizador from "./pages/cotizador";

const App: React.FC = () => {
  return (
    <>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Ruta principal carga Home */}
          <Route index element={<Home />} />
          {/* Rutas secundarias */}
          <Route path="landing" element={<ConferenciaIA />} />
          <Route path="finish" element={<FinishPage />} />
          <Route path="schedule" element={<AgendarDemo />} />
          <Route path="conferenciaIA" element={<ConferenciaIA />} />
          <Route path="cotizador" element={<Cotizador />} />
          
          {/* 404 */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
