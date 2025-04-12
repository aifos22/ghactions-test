export const getDoctors = async () => {
    try {
        const response = await fetch('https://api.ejemplo.com/doctors');
        if (!response.ok) {
            throw new Error('No se pudo obtener la información de los doctores.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw new Error('No se pudo obtener la información de los doctores.');
    }
};