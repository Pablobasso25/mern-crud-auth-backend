import { config } from "dotenv";
config(); // Esto asegura que las variables se carguen ANTES de exportarlas
// Exporto la variable PORT que obtiene su valor de process.env.PORT (del archivo .env)
// Si no existe en .env, usa el valor por defecto 4006 (temporal para liberar 4000)
// Esta variable se importa en index.js para definir en qué puerto corre el servidor
export const PORT = process.env.PORT || 4006;
export const MONGODB_URI = process.env.MONGODB_URI;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
