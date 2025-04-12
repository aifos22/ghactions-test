
import { Routes, Route } from "react-router-dom"
import { createContext, useState, useEffect, Profiler } from "react";

import Layout from "../layout/Layout";
import { dataUser } from "../data/user";

import InicioPage from '../pages/InicioPage/InicioPage';
import EquipoPage from '../pages/EquipoPage/EquipoPage';
import ContactoPage from '../pages/ContactoPage/ContactoPage';
import RegistroPage from "../pages/RegistroPage/RegistroPage";
import LoginPage from "../layout/LoginPage";

// Importación del HOC y el portal
import DoctorCardWithModal from "./components/DoctorCard/DoctorCardWithModal";

export const UserContext = createContext();
export const AppContext = createContext();

export default function App() {

  const [user, setUser] = useState(null);

  const [contadorReservas, setContadorReservas] = useState(0);
  const [doctorData, setDoctorData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);


  const handleContador = (string) => {
    if (string === 'aumentar') {
      setContadorReservas(contadorReservas + 1);
    } else if (string === 'disminuir') {
      if (contadorReservas === 0) {
        return;
      }
      setContadorReservas(contadorReservas - 1);
    } else {
      return;
    }
  }


  // Callback del Profiler para capturar el rendimiento de toda la app
  const onRenderCallback = (
    id, // ID del componente
    phase, // Fase de la renderización (mount o update)
    actualDuration, // Duración real de la renderización
    baseDuration, // Duración estimada sin optimizaciones
    startTime, // Momento en que comenzó la renderización
    commitTime, // Momento en que se completó la renderización
    interactions // Interacciones asociadas
  ) => {
    console.log(`Componente: ${id}, Fase: ${phase}, Duración: ${actualDuration}ms`);
  };



  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppContext.Provider value={{ contadorReservas, handleContador, doctorData, setDoctorData, selectedDoctor, setSelectedDoctor }}>

        {/* Envolver el componente App con el Profiler */}
        <Profiler id="App" onRender={onRenderCallback}>

          <Routes>

            <Route
              path='/'
              element={
                <Layout ruta={'inicio'}>
                  <InicioPage />
                </Layout>
              }
            />

            <Route
              path="/login"
              element={
                <LoginPage />
              }
            />


            <Route
              path='/equipo'
              element={
                <Layout ruta={'equipo'}>
                  <EquipoPage />
                  <DoctorCardWithModal />
                </Layout>
              }
            />

            <Route
              path='/contacto'
              element={
                <Layout ruta={'contacto'}>
                  <ContactoPage />
                </Layout>}
            />

            <Route
              path='/registro-cita'
              element={
                <Layout ruta={'equipo'}>
                  <RegistroPage />
                </Layout>
              }
            />
          </Routes>
        </Profiler>

        {/* nuevooo ModalPortal para mostrar detalles */}
        {/* <ModalPortal /> */}

      </AppContext.Provider>
    </UserContext.Provider>

  )
}