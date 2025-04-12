import { useState } from "react";
import { createDoctor } from "../services/apiService";

const DoctorForm = () => {
    const [nombre, setNombre] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre || !especialidad) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            await createDoctor({ nombre, especialidad });
            alert("Doctor creado exitosamente");
            setNombre("");
            setEspecialidad("");
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Agregar Doctor</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Especialidad"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
            />
            <button type="submit">Crear</button>
        </form>
    );
};

export default DoctorForm;
