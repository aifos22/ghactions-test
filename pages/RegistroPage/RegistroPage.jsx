import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AppointmentForm from "../../src/components/AppointmentForm/AppointmentForm";
import { ArrowCircleLeft } from "@mui/icons-material";
import './RegistroPage.css';
import { AppContext } from "../../src/App";

export default function RegistroPage() {
    const { selectedDoctor, setSelectedDoctor } = useContext(AppContext);
    const navigate = useNavigate();

    console.log(selectedDoctor);

    useEffect(() => {
        // 🔹 Nuevo: Función para obtener los doctores desde la API
        // const fetchDoctors = () => {
        //     fetch("https://api.hospital.com/doctores") // Reemplaza con tu API real
        //         .then((response) => response.json())
        //         .then((data) => {
        //             if (data.length > 0 && !selectedDoctor) {
        //                 setSelectedDoctor(data[0]); // 🔹 Nuevo: Asigna el primer doctor disponible
        //             }
        //         })
        //         .catch((error) => console.error("Error al obtener doctores:", error));
        // };

        // fetchDoctors(); // 🔹 Nuevo: Llamada inicial para cargar los doctores

        // 🔹 Nuevo: Intervalo para actualizar los doctores cada 60 segundos
        // const interval = setInterval(fetchDoctors, 60000);

        // return () => clearInterval(interval); // 🔹 Nuevo: Limpieza del intervalo al desmontar
    }, [selectedDoctor, setSelectedDoctor]);

    return (
        <>
            <div id="cont-boton-registro">
                <button className="equipo__card__text__more" onClick={() => navigate(-1)}>
                    <ArrowCircleLeft /> Volver Atrás
                </button>
            </div>
            {selectedDoctor && <AppointmentForm doctor={selectedDoctor} />}
        </>
    );
}

