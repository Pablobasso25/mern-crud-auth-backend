# 🗺️ ROADMAP - Cómo Funciona la Conexión del Proyecto

## 📊 DIAGRAMA GENERAL DE FLUJO

```
┌─────────────────────────────────────────────────────────────┐
│                    INICIO DE LA APLICACIÓN                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
                    ┌─────────────────┐
                    │   index.js      │ ◄── Punto de entrada principal
                    └─────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
    ┌─────────────┐  ┌──────────────┐  ┌─────────────┐
    │   app.js    │  │   db.js      │  │  config.js  │
    │ (servidor)  │  │ (base datos) │  │ (variables) │
    └─────────────┘  └──────────────┘  └─────────────┘
              │               │               │
              │               │               │
              ↓               ↓               ↓
         Express         MongoDB          Variables
         (puerto)         Atlas            de .env
```

---

## 🔄 FLUJO DETALLADO PASO A PASO

### **1️⃣ ARCHIVO: `.env`** (Variables secretas)

```
┌────────────────────────────────────────┐
│           .env                         │
│                                        │
│  MONGODB_URI=mongodb+srv://...        │
│  PORT=4000                             │
└────────────────────────────────────────┘
         │
         │ (dotenv carga estas variables)
         ↓
    process.env.MONGODB_URI
    process.env.PORT
```

**¿Qué hace?**

- Guarda información sensible (contraseña de base de datos)
- **NO se sube a GitHub** (protegido por .gitignore)

---

### **2️⃣ ARCHIVO: `app.js`** (Configuración de Express)

```
┌──────────────────────────────────────────────┐
│            app.js                            │
├──────────────────────────────────────────────┤
│  IMPORTA:                                    │
│  • express (instala servidor web)           │
│  • morgan (registra peticiones HTTP)        │
│  • dotenv/config (carga variables .env)     │
├──────────────────────────────────────────────┤
│  HACE:                                       │
│  1. Crea instancia Express                  │
│  2. Configura middleware morgan             │
├──────────────────────────────────────────────┤
│  EXPORTA:                                    │
│  • app (servidor configurado)               │
└──────────────────────────────────────────────┘
         │
         │ export default app
         ↓
    (se usa en index.js)
```

---

### **3️⃣ ARCHIVO: `config.js`** (Configuración central)

```
┌──────────────────────────────────────────────┐
│            config.js                         │
├──────────────────────────────────────────────┤
│  LEE:                                        │
│  • process.env.PORT                          │
│  • process.env.MONGODB_URI                   │
│    (vienen del .env gracias a dotenv)        │
├──────────────────────────────────────────────┤
│  EXPORTA:                                    │
│  • PORT = 4000                               │
│  • MONGODB_URI = "mongodb+srv://..."         │
└──────────────────────────────────────────────┘
         │
         │ export { PORT, MONGODB_URI }
         ↓
   (se usan en index.js y db.js)
```

---

### **4️⃣ ARCHIVO: `db.js`** (Conexión a MongoDB)

```
┌──────────────────────────────────────────────┐
│              db.js                           │
├──────────────────────────────────────────────┤
│  IMPORTA:                                    │
│  • mongoose (para conectar a MongoDB)       │
│  • MONGODB_URI (desde config.js)            │
├──────────────────────────────────────────────┤
│  HACE:                                       │
│  1. Define función connectDB()              │
│  2. mongoose.connect(MONGODB_URI)           │
│  3. Si conecta: ">>> DB is connected"       │
│  4. Si falla: muestra error                 │
├──────────────────────────────────────────────┤
│  EXPORTA:                                    │
│  • connectDB (función para conectar)        │
└──────────────────────────────────────────────┘
         │
         │ export { connectDB }
         ↓
    (se ejecuta en index.js)
```

---

### **5️⃣ ARCHIVO: `index.js`** (Punto de inicio)

```
┌──────────────────────────────────────────────┐
│            index.js                          │
│         (ORQUESTADOR PRINCIPAL)              │
├──────────────────────────────────────────────┤
│  IMPORTA:                                    │
│  • app (desde app.js)                        │
│  • connectDB (desde db.js)                   │
│  • PORT (desde config.js)                    │
├──────────────────────────────────────────────┤
│  EJECUTA EN ORDEN:                           │
│  1. connectDB()     ← Conecta a MongoDB     │
│  2. app.listen()    ← Inicia servidor       │
│  3. console.log()   ← Muestra mensaje       │
└──────────────────────────────────────────────┘
```

---

## 🎯 FLUJO COMPLETO DE EJECUCIÓN

```
PASO 1: Inicias la aplicación
   │
   │   $ npm run dev
   │
   ↓
PASO 2: Node ejecuta index.js
   │
   ↓
PASO 3: index.js importa app.js
   │      ↓
   │      app.js importa "dotenv/config"
   │      ↓
   │      dotenv lee .env y carga las variables
   │      ↓
   │      process.env.MONGODB_URI = "mongodb+srv://..."
   │      process.env.PORT = 4000
   │
   ↓
PASO 4: index.js importa config.js
   │      ↓
   │      config.js lee process.env y exporta PORT y MONGODB_URI
   │
   ↓
PASO 5: index.js llama a connectDB()
   │      ↓
   │      db.js usa MONGODB_URI para conectar a MongoDB Atlas
   │      ↓
   │      Mensaje: ">>> DB is connected" ✅
   │
   ↓
PASO 6: index.js ejecuta app.listen(PORT)
   │      ↓
   │      Express inicia en el puerto 4000
   │      ↓
   │      Mensaje: "Server on port 4000" ✅
   │
   ↓
✅ APLICACIÓN CORRIENDO
   - Base de datos conectada
   - Servidor escuchando peticiones HTTP
```

---

## 🔗 MAPA DE DEPENDENCIAS

```
         .env (archivo de configuración)
           │
           ↓ (leído por dotenv)
           │
    ┌──────┴──────────────────┐
    │                          │
    ↓                          ↓
app.js                     config.js
    │                          │
    │                          ├──→ PORT
    │                          │
    │                          └──→ MONGODB_URI
    │                               │
    ↓                               ↓
(servidor Express)              db.js
                                   │
                                   ↓
                            (conecta a MongoDB)
                                   │
    ┌──────────────────────────────┼─────────┐
    │                              │         │
    ↓                              ↓         ↓
index.js ◄───────────────────── app + connectDB + PORT
    │
    │ (inicia todo)
    ↓
🚀 APLICACIÓN LISTA
```

---

## 📦 ¿POR QUÉ CADA ARCHIVO?

| Archivo     | Responsabilidad              | Analogía                   |
| ----------- | ---------------------------- | -------------------------- |
| `.env`      | Guarda secretos              | 🔐 Caja fuerte             |
| `config.js` | Lee y organiza configuración | 📋 Menú de opciones        |
| `app.js`    | Configura el servidor web    | 🏗️ Constructor de edificio |
| `db.js`     | Conecta a la base de datos   | 🔌 Enchufe a la BD         |
| `index.js`  | Inicia todo                  | 🎬 Director de orquesta    |

---

## 🧩 RESUMEN SIMPLE

1. **`.env`** → Tiene los datos secretos (contraseña de DB, puerto)
2. **`dotenv`** → Lee el `.env` y lo pone en `process.env`
3. **`config.js`** → Toma `process.env` y exporta variables limpias
4. **`db.js`** → Usa `MONGODB_URI` de config para conectar a Atlas
5. **`app.js`** → Crea y configura Express
6. **`index.js`** → Junta todo: conecta DB + inicia servidor

---

## ✅ VERIFICACIÓN

Cuando ejecutas `npm run dev`, deberías ver:

```bash
>>> DB is connected      ← Señal de db.js (MongoDB conectado)
Server on port 4000      ← Señal de index.js (Express corriendo)
```

Si ves ambos mensajes = **TODO FUNCIONA** 🎉
