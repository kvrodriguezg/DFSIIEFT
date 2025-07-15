# Etapa 1: Construcción de Angular
FROM node:lts-alpine AS build

WORKDIR /app

# Copiar todo el código del proyecto Angular
COPY frontend/ ./

# Instalar dependencias
RUN npm install

# Instalar Angular CLI
RUN npm install -g @angular/cli

# Ejecutar build de producción
RUN ng build --configuration=production

# Etapa 2: Servir con NGINX
FROM nginx:alpine

# Copiar los archivos construidos a NGINX
COPY --from=build /app/dist/frontend /usr/share/nginx/html