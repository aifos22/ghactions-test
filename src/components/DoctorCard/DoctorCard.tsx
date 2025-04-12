import React, { useEffect, useState } from "react";
import "./DoctorCard.css";
import withModal from "../WithModal/withModal";

import { doctorDataArchivo } from "../../../data/doctors"; // Asegúrate de que la ruta sea correcta

interface Doctor {
    id: number;
    nombre: string;
    img: string;
    especialidad: string;
    experiencia: number;
    disponibilidad: string;
    horario: string[];
}

interface DoctorCardProps {
    generarCita: (index: number) => void;
}

/*
{ 
            "img": "doc1.jpg",
            "nombre": "Dra. Ana María Campos",
            "especialidad": "Pediatría",
            "experiencia": 6,
            "disponibilidad": true,
            "contacto": {
                "telefono": "123456789",
                "email": "juan.perez@hospital.com"
            },
            "horarios": ["Lunes 9-12", "Miércoles 10-14"],
            "servicios": [1,3]
        }
*/

type DoctorObject = {
    id: number;
    nombre: string;
    img: string;
    especialidad: string;
    experiencia: number;
    disponibilidad: boolean;
    contacto: {
        telefono: string;
        email: string;
    };
    horario: string[];
    servicios: number[]; // IDs de los servicios
};

const DoctorCard: React.FC<DoctorCardProps> = ({ generarCita }: DoctorCardProps) => {
    const [doctores, setDoctores] = useState < DoctorObject[] > ([]);
    const [loading, setLoading] = useState < boolean > (true);
    const [error, setError] = useState < string | null > (null);

    useEffect(() => {
        // Simulación de carga de datos desde una API
        
        // const fetchDoctores = async (): Promise<void> => {
        //     try {
        //         const response = await fetch("https://tu-api.com/doctores"); // Reemplaza con la URL real
        //         if (!response.ok) {
        //             throw new Error("Error al obtener los datos de los doctores");
        //         }
        //         const data: Doctor[] = await response.json();
        //         setDoctores(data);
        //     } catch (error) {
        //         setError((error as Error).message);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchDoctores();

        // Simulación de carga de datos desde un archivo local
        setDoctores(doctorDataArchivo);
        setLoading(false);
    }, []);

    if (loading) return (<p>Cargando doctores...</p>);
    if (error) return (<p>Error: {error}</p>);

    return (
        <div className="equipo__container">
            {doctores.map((doctor, index) => (
                <div className="equipo__card" key={doctor.id || index}>
                    <div className="equipo__card__foto">
                        <img src={`./src/assets/${doctor.img}`} alt={doctor.nombre} />
                    </div>

                    <div className="equipo__card__text">
                        <h3>{doctor.nombre}</h3>
                        <h5>{doctor.especialidad}</h5>
                        <h6>Años de experiencia: {doctor.experiencia}</h6>
                        <h6>Disponibilidad: {doctor.disponibilidad}</h6>
                        <div>
                            <h6>Horarios:</h6>
                            <ul>
                                {doctor.horario.map((hor, i) => (
                                    <li key={i}>{hor}</li>
                                ))}
                            </ul>
                        </div>

                        <button className="equipo__card__text__more" onClick={() => generarCita(index)}>
                            Reserva tu hora aquí
                        </button>
                        <button className="equipo__card__text__more">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default withModal(DoctorCard);
