import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../../src/components/DoctorCard/DoctorCard";
import { AppContext } from "../../src/App";
import './EquipoPage.css';
import {doctorDataArchivo} from "../../data/doctors.js";
import { Search } from "@mui/icons-material";

export default function EquipoPage() {
    let navigate = useNavigate();
    const { doctorData, setDoctorData, selectedDoctor, setSelectedDoctor } = useContext(AppContext);

    const [isloading, setIsloading] = useState(true);
    const [specialtyFilter, setSpecialtyFilter] = useState(""); // Para almacenar el valor del select
    const [filteredDoctors, setFilteredDoctors] = useState(doctorData); // Almacena los doctores filtrados

    // Simulación de carga de datos a través de fetch
    useEffect(() => {
        const fetchDoctorsData = async () => {
            try {
                setIsloading(true); // Inicia la carga
                // Aquí puedes simular un fetch
                const response = await new Promise((resolve) =>
                    setTimeout(() => resolve({ json: () => ({ data: doctorDataArchivo }) }), 2000)
                );

                const data = await response.json();
                setDoctorData(data.data); // Asignar los datos obtenidos al contexto
                setFilteredDoctors(data.data); // Establecer los doctores filtrados
                setIsloading(false); // Finaliza la carga
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setIsloading(false);
            }
        };

        fetchDoctorsData(); // Llamada a la función asincrónica para obtener los datos
    }, [setDoctorData]);

    // Función para cambiar la especialidad seleccionada
    const handleSpecialtyChange = (event) => {
        setSpecialtyFilter(event.target.value);
    };

    // Función para aplicar el filtro
    const handleFilterApply = () => {
        // Filtrar los doctores según la especialidad seleccionada
        const filtered = doctorData.filter(doctor =>
            specialtyFilter === "" || doctor.especialidad.toLowerCase().includes(specialtyFilter.toLowerCase())
        );
        setFilteredDoctors(filtered); // Actualizamos los doctores filtrados
    };

    // Función para generar la cita
    const generarCita = (index) => {
        setSelectedDoctor(doctorData[index]);
        navigate('/registro-cita');
    };

    return (
        <>
            <header className="header-equipo">
                <h1>Nuestro <span className="highlight-text-small">Equipo</span></h1>
                <h6>
                    En la Clínica Cuerpo y Alma, estamos comprometidos con la excelencia médica mediante la provisión de atención de calidad...
                </h6>
            </header>

            {/* Filtro por especialidad */}
            <section className="filter-section">
                {console.log("Botón de filtro está renderizándose")} {/* Aquí se verá el log */}

                <label htmlFor="specialtyFilter">Filtrar por especialidad:</label>
                <select
                    id="specialtyFilter"
                    value={specialtyFilter}
                    onChange={handleSpecialtyChange}
                >
                    <option value="">Todas</option>
                    <option value="Cardiología">Cardiología</option>
                    <option value="Dermatología">Dermatología</option>
                    <option value="Pediatría">Pediatría</option>
                    {/* Agrega más especialidades según tus necesidades */}
                </select>
                <button className="btn btn-primary" onClick={handleFilterApply}>Buscar <Search /></button>

            </section>

            {/* Cargando */}
            {isloading ? (
                <div className="text-center">
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div id="cards-doctores">
                    {filteredDoctors.map((dr, index) => (
                        <DoctorCard
                            key={index}
                            index={index}
                            nombre={dr.nombre}
                            img={dr.img}
                            especialidad={dr.especialidad}
                            experiencia={dr.experiencia}
                            horario={dr.horarios}
                            disponibilidad={dr.disponibilidad}
                            generarCita={generarCita}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

