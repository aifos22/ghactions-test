import { getGeolocation } from '../components/Geolocation';

export default function GeolocationPage() {
    return (
        <div>
            <button onClick={getGeolocation}>Obtener Ubicación</button>
        </div>
    );
}