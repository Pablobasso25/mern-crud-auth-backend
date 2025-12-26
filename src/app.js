// Importo express desde el paquete "express" instalado con npm
import express from "express";
// Importo morgan desde el paquete "morgan" - es un middleware para registrar peticiones HTTP
import morgan from "morgan";
// Importo y ejecuto dotenv/config - carga las variables del archivo .env al objeto process.env
// Esto permite acceder a MONGODB_URI y PORT mediante process.env.MONGODB_URI y process.env.PORT
import "dotenv/config";
//importo las rutas
// Se importa como authRoutes en lugar de router para mayor claridad y descriptividad,
// indicando que se trata de las rutas relacionadas con la autenticación
import authRoutes from "./routes/auth.routes.js";

//ejecuto e inicializo express el cual me devuelve un objeto que lo guardo en una variable
// app es el servidor
const app = express();

// esta configuración muestra un mensaje corto por consola cada vez que se hace una petición HTTP
// "dev" es el formato que usa morgan (muestra: método, url, status, tiempo de respuesta)
app.use(morgan("dev"));

// le digo a la aplicación que utilice authRoutes
app.use(authRoutes);
// exporto app para poder usarlo en index.js
export default app;
