# Etapa única: entorno de desarrollo
FROM node:20-alpine

# Instala dependencias necesarias
RUN apk add --no-cache bash

# Crea el directorio de la app
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto del dev server
EXPOSE 4200

# Comando por defecto
CMD ["npm", "run", "start"]