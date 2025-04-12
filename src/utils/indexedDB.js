// src/utils/indexedDB.js

const DB_NAME = 'Clínica Cuerpo y Mente';
const DB_VERSION = 1; // Versión de la base de datos
const DB_STORE_NAME = 'patients'; // Almacén de datos

// Abrir o crear la base de datos
const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // Si la base de datos no existe o la versión cambia, se crea o actualiza
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
                // Crear un almacén de objetos para almacenar información de pacientes
                db.createObjectStore(DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result); // Devuelve la base de datos abierta
        };

        request.onerror = (event) => {
            reject('Error al abrir la base de datos');
        };
    });
};

// Función para guardar datos de pacientes en IndexedDB
const savePatient = async (patientData) => {
    const db = await openDatabase(); // Abre la base de datos
    const transaction = db.transaction(DB_STORE_NAME, 'readwrite'); // Crea una transacción de escritura
    const store = transaction.objectStore(DB_STORE_NAME);

    const request = store.add(patientData); // Guarda el paciente

    request.onsuccess = () => {
        console.log('Paciente guardado exitosamente');
    };

    request.onerror = () => {
        console.log('Error al guardar el paciente');
    };
};

// Función para obtener todos los pacientes almacenados
const getPatients = async () => {
    const db = await openDatabase(); // Abre la base de datos
    const transaction = db.transaction(DB_STORE_NAME, 'readonly'); // Crea una transacción de solo lectura
    const store = transaction.objectStore(DB_STORE_NAME);

    const request = store.getAll(); // Recupera todos los pacientes

    request.onsuccess = (event) => {
        console.log('Pacientes recuperados:', event.target.result);
    };

    request.onerror = (event) => {
        console.log('Error al recuperar los pacientes', event.target.error);
    };
};

// Eliminar un paciente por ID
const deletePatient = async (id) => {
    const db = await openDatabase(); // Abre la base de datos
    const transaction = db.transaction(DB_STORE_NAME, 'readwrite'); // Crea una transacción de escritura
    const store = transaction.objectStore(DB_STORE_NAME);

    const request = store.delete(id); // Elimina el paciente por ID

    request.onsuccess = () => {
        console.log('Paciente eliminado');
    };

    request.onerror = (event) => {
        console.log('Error al eliminar el paciente', event.target.error);
    };
};

// Para borrar la base de datos completamente
const deleteDatabase = () => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => {
        console.log('Base de datos eliminada');
    };
    request.onerror = (event) => {
        console.log('Error al eliminar la base de datos');
    };
};

export { savePatient, getPatients, deletePatient, deleteDatabase };
