import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "./AppointmentForm.css";
import { AppContext } from "../../App";
import { UserContext } from "../../App";

function HorariosList({ horarios, onSelect, selectedHorario }) {
    return (
        <div id="contenedor-horarios">
            {horarios.map((horario, index) => (
                <button
                    key={index}
                    className={selectedHorario === horario ? "btn btn-primary" : "btn btn-secondary"}
                    onClick={() => onSelect(horario)}
                >
                    {horario}
                </button>
            ))}
        </div>
    );
}

function AppointmentForm({ doctor }) {
    const { user } = useContext(UserContext);
    const { handleContador } = useContext(AppContext);
    const navigate = useNavigate();
    const nameInputRef = useRef(null);

    const [doctorDetails, setDoctorDetails] = useState(doctor); // 🔹 Nuevo: Estado para guardar detalles del doctor

    const [formData, setFormData] = useState({
        nombre: user ? user.nombre : "",
        email: user ? user.email : "",
        horario: "",
    });

    const [formErrors, setFormErrors] = useState({
        nombre: "",
        email: "",
        horario: "",
    });

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (doctor?.id) {
            fetch(`https://api.hospital.com/doctores/${doctor.id}`) // 🔹 Nuevo: Obtiene más detalles del doctor
                .then((response) => response.json())
                .then((data) => setDoctorDetails(data))
                .catch((error) => console.error("Error al obtener detalles del doctor:", error));
        }
    }, [doctor]); // 🔹 Se ejecuta cada vez que cambia el doctor seleccionado

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleHorarioClick = useCallback((horario) => {
        setFormData((prevState) => ({
            ...prevState,
            horario: horario,
        }));
    }, []);

    const validateForm = useCallback(() => {
        const errors = {};
        if (!formData.nombre) errors.nombre = "Por favor, ingresa tu nombre.";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
            errors.email = "Por favor, ingresa un correo válido.";
        if (!formData.horario)
            errors.horario = "Por favor, selecciona un horario.";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Formulario enviado con éxito:", formData);
            alert(`¡Cita agendada con éxito para el horario: ${formData.horario}!`);
            handleContador("aumentar");
        } else {
            console.log("Formulario con errores");
        }
    };

    useEffect(() => {
        setIsSubmitEnabled(
            formData.nombre && formData.email && formData.horario
        );
    }, [formData]);

    return (
        <React.Fragment>
            <div id="contenedor-general">
                <div id="contenedor-formularios-doctor">
                    <h4>Datos del doctor</h4>
                    <form id="form-datos-doctor">
                        <input type="text" disabled value={doctorDetails.nombre} />
                        <input type="text" disabled value={doctorDetails.especialidad} />
                        <input type="text" disabled value={`${doctorDetails.experiencia} años de experiencia`} />
                    </form>
                    <div id="form-datos-doctor">
                        <h4>Horarios</h4>
                        <HorariosList
                            horarios={doctorDetails.horario}
                            onSelect={handleHorarioClick}
                            selectedHorario={formData.horario}
                        />
                    </div>
                </div>

                <div id="contenedor-formularios-paciente">
                    <h4>Datos del Paciente</h4>

                    {
                        user ? (
                            <form id="form-datos-paciente">
                                <input
                                    ref={nameInputRef}
                                    type="text"
                                    placeholder="Nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                                {formErrors.nombre && <span className="error">{formErrors.nombre}</span>}

                                <input
                                    type="email"
                                    placeholder="Correo"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                                {formErrors.email && <span className="error">{formErrors.email}</span>}

                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={!isSubmitEnabled}
                                    id="btn-submit-appointment"
                                >
                                    <span className="btn-text">Enviar</span>
                                    <ArrowCircleRightIcon />
                                </button>
                            </form>
                        ) : (
                            <p>Debe <a onClick={() => navigate('/login')} className="text-primary pe-auto">iniciar sesión</a> para reservar una hora.</p>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default React.memo(AppointmentForm);
