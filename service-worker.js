// service-worker.js

// const CACHE_NAME = 'hospitalPWA-cache-v1';
// const STATIC_FILES = [
//     '/index.html',
//     '/assets/styles.css',
//     '/assets/script.js',
//     '/assets/logo.png',
//     // Puedes agregar más archivos estáticos que necesiten estar en caché
// ];

// // Instalar el Service Worker
// self.addEventListener('install', (event) => {
//     console.log('Service Worker instalado');
//     // Durante la instalación, abrimos el caché y almacenamos los archivos estáticos
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => {
//             console.log('Archivos en caché durante la instalación');
//             return cache.addAll(STATIC_FILES);
//         })
//     );
// });

// Activar el Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker activado');
    // Limpiar cachés viejos
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Caché antiguo eliminado:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Manejar solicitudes de red y dar soporte offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Si hay una respuesta en caché, la usamos
                return cachedResponse;
            }

            // Si no hay caché, lo buscamos en la red
            return fetch(event.request).then((response) => {
                // Guardar el archivo en caché para usarlo en futuras solicitudes
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

// Guardar datos en el caché utilizando IndexedDB o LocalStorage
self.addEventListener('sync', (event) => {
    if (event.tag === 'save-patient') {
        event.waitUntil(
            // Recuperar los datos de IndexedDB y guardarlos
            // Ejemplo: obtener datos de IndexedDB y enviarlos al servidor
            fetch('/api/save-patient', {
                method: 'POST',
                body: JSON.stringify({ /* Datos del paciente */ }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Datos sincronizados con el servidor:', data);
                })
                .catch((error) => {
                    console.error('Error al sincronizar los datos:', error);
                })
        );
    }
});


