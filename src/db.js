// Importo mongoose desde el paquete "mongoose" - es como un traductor que convierte objetos JavaScript en documentos de MongoDB y viceversa.
import mongoose from "mongoose";
// Importo MONGODB_URI desde config.js - contiene la URL de conexión a MongoDB Atlas
import { MONGODB_URI } from "./config.js";

// Esta función asíncrona se encarga de conectar la aplicación a la base de datos MongoDB
// Se exporta para ser llamada desde index.js cuando inicia la aplicación
/* export const connectDB = async () => {
  try {
    // mongoose.connect() intenta conectarse a MongoDB usando la URI de Atlas
    // await espera a que la conexión se complete antes de continuar
    await mongoose.connect(MONGODB_URI);
    //si todo sale bien le digo que me muestre un mensaje de que la conxión fue exitosa
    console.log(">>> DB is connected");
  } catch (error) {
    // Si hay un error en la conexión (ej: URL incorrecta, internet caído), lo muestra
    console.log(error);
  }
}; */
/* export const connectDB = async () => {
  try {
    // Usamos process.env directamente para asegurar que tome la de Render
    const uri = process.env.MONGODB_URI || MONGODB_URI;
    await mongoose.connect(uri);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log("Error de conexión a la DB:", error);
  }
}; */
export const connectDB = async () => {
  try {
    // Forzamos la lectura de la variable de entorno
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error("La variable MONGODB_URI no está definida en el entorno");
    }

    await mongoose.connect(mongoURI);
    console.log(">>> DB is connected to Atlas");
  } catch (error) {
    console.error("Error connecting to DB:", error.message);
  }
};