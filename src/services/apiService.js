import axios from "axios";

const API_URL = "https://tu-api.com"; // Reemplaza con la URL real de tu backend

// Obtener todos los doctores
export const getDoctores = async () => {
    try {
        const response = await axios.get(`${API_URL}/doctores`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener doctores:", error);
        throw new Error("No se pudieron cargar los doctores.");
    }
};

// Crear un doctor
export const createDoctor = async (doctorData) => {
    try {
        const response = await axios.post(`${API_URL}/doctores`, doctorData);
        return response.data;
    } catch (error) {
        console.error("Error al crear doctor:", error);
        throw new Error("No se pudo crear el doctor.");
    }
};

// Actualizar un doctor
export const updateDoctor = async (id, doctorData) => {
    try {
        const response = await axios.put(`${API_URL}/doctores/${id}`, doctorData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar doctor:", error);
        throw new Error("No se pudo actualizar el doctor.");
    }
};

// Eliminar un doctor
export const deleteDoctor = async (id) => {
    try {
        await axios.delete(`${API_URL}/doctores/${id}`);
    } catch (error) {
        console.error("Error al eliminar doctor:", error);
        throw new Error("No se pudo eliminar el doctor.");
    }
};
