const CACHE_NAME = "hospital-cache-v2";
const DYNAMIC_CACHE = "hospital-dynamic-cache-v1";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/assets/css/styles.css",
    "/assets/js/app.js",
    "/manifest.json",
    "/assets/icons/icon-192x192.png",
    "/assets/icons/icon-512x512.png"
];

// Instalación: Precarga archivos esenciales en caché
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

// Activación: Limpia cachés antiguas
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME && key !== DYNAMIC_CACHE) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Interceptar solicitudes y aplicar estrategias de caché
self.addEventListener("fetch", (event) => {
    const { request } = event;

    // Estrategia Cache-first para archivos estáticos
    if (FILES_TO_CACHE.includes(new URL(request.url).pathname)) {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                return cachedResponse || fetch(request);
            })
        );
        return;
    }

    // Estrategia Stale-While-Revalidate para datos dinámicos (APIs, JSON)
    if (request.url.includes("/api/")) {
        event.respondWith(
            caches.open(DYNAMIC_CACHE).then((cache) => {
                return fetch(request)
                    .then((response) => {
                        cache.put(request, response.clone()); // Actualiza caché en segundo plano
                        return response;
                    })
                    .catch(() => caches.match(request)); // Si falla la red, usa caché
            })
        );
        return;
    }

    // Para cualquier otra solicitud, intenta la red primero
    event.respondWith(
        fetch(request).catch(() => caches.match(request))
    );
});

