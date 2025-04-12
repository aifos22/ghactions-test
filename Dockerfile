# Fase 1: Construcción de la aplicación con Node.js
# FROM node:16-alpine AS builder
FROM public.ecr.aws/docker/library/node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Crea el directorio src/assets dentro del directorio de construcción
RUN mkdir -p dist/src && cp -r src/assets dist/src/assets

# Fase 2: Configuración de Nginx
# FROM nginx:alpine
FROM public.ecr.aws/docker/library/nginx:alpine

# Copia los archivos de configuración de Nginx al contenedor
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos estáticos del directorio de construcción al directorio de trabajo de Nginx
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Ajusta los permisos de los archivos copiados
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Cambia el propietario del directorio /var/cache/nginx
RUN chown -R nginx:nginx /var/cache/nginx

# Expone el puerto 8080 para Nginx
EXPOSE 8080

# Expone el puerto 9090 para acceder a las métricas de Prometheus Nginx Exporter
EXPOSE 9090

# Inicia Nginx cuando el contenedor se ejecute
CMD ["nginx", "-g", "daemon off;"]