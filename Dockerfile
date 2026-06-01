# ---- 1. ETAPA BASE (Común para ambos entornos) ----
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- 2. ETAPA DE DESARROLLO ----
FROM base AS development
RUN npm install
COPY . .
EXPOSE 4006
CMD ["npm", "run", "dev"]

# ---- 3. ETAPA DE PRODUCCIÓN ----
FROM base AS production
# Instalación limpia ignorando dependencias de desarrollo
RUN npm ci --omit=dev
COPY . .
# Como buena práctica de seguridad en prod, borramos código fuente innecesario si quisiéramos
EXPOSE 4006
CMD ["npm", "start"]

 