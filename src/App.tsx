"use client";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import AgentesIA from "./pages/agentes-ia";
import FinishPage from "./pages/finish";



const App: React.FC = () => {
  
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      {/* Ruta principal carga Home */}
      <Route index element={<Home />} />
      {/* Rutas secundarias */}
      <Route path="landing" element={<AgentesIA />} />
      <Route path="finish" element={<FinishPage />} />
      {/* 404 */}
    </Route>
  </Routes>
  );
};

export default App;
