# Fase 1: Construcción
FROM public.ecr.aws/docker/library/node:20-alpine AS builder
WORKDIR /app

# 1. Copia el package.json 
COPY package*.json ./
RUN npm ci 

# 2. Copia el resto y construye
COPY . .
RUN npm run build && \
    mkdir -p dist/src && \
    cp -r src/assets dist/src/assets

# ---

# Fase 2: Producción
FROM public.ecr.aws/docker/library/nginx:alpine

# Copia configuración de Nginx (asegúrate de que el puerto sea 8080)
COPY nginx.conf /etc/nginx/nginx.conf

# Copia archivos construidos
COPY --from=builder /app/dist /usr/share/nginx/html

# Unifica comandos de permisos en un solo RUN (mejor práctica)
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]