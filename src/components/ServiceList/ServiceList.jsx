import ServiceCard from "../ServiceCard/ServiceCard";
import { dataService } from "../../../data/services";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import './ServiceList.css';
import { Profiler } from 'react';  // Importando Profiler para medir rendimiento
import debounce from "lodash.debounce";  // Importando debounce para optimizar las búsquedas

export default function ServiceList() {
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);  // Estado para almacenar los servicios
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");  // Estado para la búsqueda de servicios
    const [filteredServices, setFilteredServices] = useState(dataService);  // Estado para servicios filtrados

    // Efecto para simular la obtención de datos de una API
    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                // Simulamos un retraso de 2 segundos como si estuviéramos haciendo una llamada API
                setTimeout(() => {
                    setServices(dataService);  // Simulamos la respuesta de la API
                    setIsLoading(false);  // Terminamos la carga
                    setFilteredServices(dataService);  // Establecemos los servicios al inicio
                }, 2000);
            } catch (error) {
                setError('Error al obtener los datos');
                setIsLoading(false);
            }
        };

        fetchServicesData();  // Llamamos a la función para simular la obtención de datos
    }, []);  // Solo se ejecuta una vez al montar el componente

    // Función para manejar el cambio en el campo de búsqueda con debounce
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);  // Actualizamos la consulta de búsqueda
    };

    // Función debounced para filtrar los servicios
    const debouncedFilter = debounce((query) => {
        const filtered = services.filter(service =>
            service.title.toLowerCase().includes(query.toLowerCase())  // Filtramos servicios según el título
        );
        setFilteredServices(filtered);  // Actualizamos los servicios filtrados
    }, 300);  // 300 ms de retraso

    // Efecto para aplicar el filtro de búsqueda
    useEffect(() => {
        if (searchQuery) {
            debouncedFilter(searchQuery);  // Llamamos a la función debounced cuando la consulta cambia
        } else {
            setFilteredServices(services);  // Si no hay búsqueda, mostramos todos los servicios
        }

        // Cleanup del debouncing
        return () => debouncedFilter.cancel();
    }, [searchQuery, services]);  // Efecto que depende de searchQuery y services

    // Si estamos cargando, mostramos un spinner
    if (isLoading) {
        return (
            <div className="text-center">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Si hay un error, mostramos el mensaje
    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    // Medición del rendimiento de renderizado con Profiler
    const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
        console.log(`Component ${id} rendered in ${actualDuration}ms during ${phase}`);
    };

    return (
        <>
            <Profiler id="ServiceList" onRender={onRenderCallback}>
                <div id="service-container">

                    <input
                        id="search-input"
                        type="text"
                        value={searchQuery}  // Vinculamos la consulta de búsqueda al estado
                        onChange={handleSearchChange}  // Llamamos a la función cuando cambia el input
                        placeholder="Buscar servicio..."
                    />
                    
                    <div id="service-list">
                        {filteredServices.map((serv, index) => (
                            <ServiceCard
                                key={index}
                                img={serv.image}
                                title={serv.title}
                                description={serv.description}
                            />
                        ))}
                    </div>

                </div>
                
                
                
                
                
                {/* <List
                    id="service-list"  // ID para identificar la lista
                    
                    height={400} // Alto del contenedor visible
                    itemCount={filteredServices.length} // Número total de elementos
                    itemSize={150} // Alto de cada item
                    width={1200} // Ancho del contenedor
                >
                    {({ index, style }) => {
                        const serv = filteredServices[index];  // Obtenemos el servicio filtrado por el índice
                        return (
                            <div style={style} key={index}>
                                <ServiceCard
                                    img={serv.image}
                                    title={serv.title}
                                    description={serv.description}
                                />
                            </div>
                        );
                    }}
                </List> */}

            </Profiler>
        </>
    );
};

ServiceList.propTypes = {
    dataService: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ),
};
