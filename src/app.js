import express from "express";
import morgan from "morgan";

//ejecuto e inicializo express el cual me devuelve un objeto el cual lo cuarto en una variable
// app es el servidor
const app = express();
// exporto app
export default app;

// esta configuración muestra un mensaje corto por consola
app.use(morgan("dev"));
