# ---- 1. ETAPA BASE ----
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- 2. ETAPA DE DESARROLLO ----
FROM base AS development
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# ---- 3. ETAPA DE CONSTRUCCIÓN (BUILD) ----
FROM base AS builder
RUN npm ci
COPY . .
# Esto genera la carpeta /app/dist con los archivos estáticos de React
RUN npm run build

# ---- 4. ETAPA DE PRODUCCIÓN (NGINX) ----
FROM nginx:alpine AS production
# Copiamos SOLO los archivos estáticos generados al servidor Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]