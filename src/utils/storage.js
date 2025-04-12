// src/utils/storage.js

// Guardar datos en localStorage
export const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data)); // Almacenamos los datos en formato JSON
};

// Recuperar datos de localStorage
export const getFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null; // Si no existe, retornamos null
};
