import React, { useEffect, useState } from 'react';
import { getDoctors } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await getDoctors();
                setDoctors(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                toast.error('Error al obtener los doctores');
            }
        };

        fetchDoctors();
    }, []);

    if (loading) {
        return <div>Cargando doctores...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Lista de Doctores</h1>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorsList;