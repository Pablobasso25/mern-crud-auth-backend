/*
Este archivo jwt.js maneja la creación de tokens JWT (JSON Web Tokens) para autenticación.

¿Qué hace? Crea un token de acceso firmado con JWT.
¿Para qué sirve? Los tokens JWT permiten verificar la identidad del usuario en peticiones posteriores sin necesidad de credenciales repetidas.
  Se usan para mantener sesiones de usuario seguras en aplicaciones web.

¿Por qué una promesa? jwt.sign() es asíncrono por defecto, así que envolvemos en una Promise para manejar resolve/reject y usar async/await en el controller.

¿Qué es payload? Es el objeto de datos que se incluye en el token (ej. {id: userId}). Se puede decodificar luego para identificar al usuario.

¿Por qué importo TOKEN_SECRET? Es la clave secreta para firmar el token, asegurando que no pueda ser falsificado.
¿De dónde viene? Se importa desde config.js, que lo obtiene de process.env.TOKEN_SECRET o un valor por defecto.
¿Qué valor tiene? Actualmente es "some secret key" (hardcodeado en config.js), pero en producción debería ser una clave segura y única desde .env.
*/

import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d", // El token expira en 1 día
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
