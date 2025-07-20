# Etapa 1: Construcción de la aplicación Angular
FROM node:lts-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json si existe)
COPY frontend/package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el código fuente del proyecto Angular
COPY frontend/ ./

# Instala el CLI de Angular globalmente (necesario para ng build)
RUN npm install -g @angular/cli

# Ejecuta el build de producción
RUN ng build --configuration=production

# Etapa 2: Servir la app usando NGINX
FROM nginx:alpine

# Elimina los archivos HTML por defecto de NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos construidos desde la etapa de build
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando por defecto para correr nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]