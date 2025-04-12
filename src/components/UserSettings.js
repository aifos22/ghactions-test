// src/components/UserSettings.js
import React, { useEffect } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';

const UserSettings = () => {
    // Guardar preferencias del usuario
    const userPreferences = {
        theme: 'dark',
        language: 'es',
    };

    useEffect(() => {
        // Guardar las preferencias cuando el componente se monte
        saveToLocalStorage('userPreferences', userPreferences);

        // Recuperar las preferencias al cargar el componente
        const preferences = getFromLocalStorage('userPreferences');
        if (preferences) {
            console.log('Preferencias del usuario:', preferences);
            document.body.classList.add(preferences.theme); // Cambiar el tema
        } else {
            console.log('No se encontraron preferencias almacenadas.');
        }
    }, []);

    return (
        <div>
            <h1>Configuración de usuario</h1>
            <p>Preferencias guardadas: ¡Todo listo!</p>
        </div>
    );
};

export default UserSettings;
