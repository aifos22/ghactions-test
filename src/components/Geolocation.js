export function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitud: " + latitude);
            console.log("Longitud: " + longitude);
        }, function (error) {
            console.error("Error al obtener la geolocalización:", error);
        });
    } else {
        console.error("La geolocalización no está soportada.");
    }
}