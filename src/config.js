// Exporto la variable PORT que obtiene su valor de process.env.PORT (del archivo .env)
// Si no existe en .env, usa el valor por defecto 4002 (temporal para liberar 4000)
// Esta variable se importa en index.js para definir en qué puerto corre el servidor
export const PORT = process.env.PORT || 4002;

// Exporto la variable MONGODB_URI que obtiene su valor de process.env.MONGODB_URI (del archivo .env)
// Contiene la URL de conexión a MongoDB Atlas
// Si no existe en .env, usa una conexión local por defecto: mongodb://localhost/merndb
// Esta variable se importa en db.js para conectarse a la base de datos
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/merndb";

export const TOKEN_SECRET = process.env.TOKEN_SECRET;
