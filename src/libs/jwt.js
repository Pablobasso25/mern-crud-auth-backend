/*
Este archivo jwt.js explica qué son los JWT y cómo los usamos aquí. Imagina que JWT es como un "pase de acceso" digital.

¿Qué es JWT? JWT significa JSON Web Token. Es una forma segura de enviar información entre dos partes (como tu servidor y el navegador del usuario).
  Es como un ticket que dice "esta persona está autorizada". Se ve como una cadena de texto larga, dividida en partes separadas por puntos.

¿Qué hace esta función createAccessToken? Toma algunos datos (llamados "payload") y crea un JWT firmado.
  "Firmado" significa que agrega una firma secreta para que nadie pueda cambiarlo sin que se note.

¿Para qué sirve? Cuando un usuario se registra o inicia sesión, le damos este token. El usuario lo guarda en su navegador (como una cookie).
  En peticiones futuras, envía el token de vuelta, y nosotros verificamos si es válido. Así, sabemos quién es sin pedir contraseña cada vez.
  Es útil para "recordar" al usuario sin que inicie sesión todo el tiempo.

¿Por qué usamos una promesa (Promise)? Porque crear el token toma un poco de tiempo (es asíncrono, como esperar a que algo termine).
  Usamos Promise para decir "cuando termines, avísame". En el controller, usamos "await" para esperar sin bloquear el resto del código.

¿Qué es el "payload"? Es la información que metemos dentro del token. Por ejemplo, {id: "123"} significa "el usuario con ID 123".
  Cuando alguien envía el token de vuelta, podemos leer el payload para saber quién es, sin ir a la base de datos cada vez.

¿Por qué importamos TOKEN_SECRET? Es una clave secreta, como una contraseña ultra-secreta que solo el servidor conoce.
  Se usa para "firmar" el token. Si alguien intenta cambiar el token, la firma no coincidirá y sabremos que es falso.

¿De dónde viene TOKEN_SECRET? Lo importamos desde config.js. config.js lo toma de una variable de entorno (process.env.TOKEN_SECRET).
  Si no está en el archivo .env, usa un valor por defecto.

¿Qué valor tiene? Actualmente es "some secret key" (una cadena de texto simple). En un sitio real, debería ser algo largo y aleatorio,
  como "mi_clave_super_secreta_123456789", guardado en .env para que no se vea en el código.
*/

import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d", // El token "caduca" después de 1 día, como un ticket que expira
      },
      (err, token) => {
        if (err) reject(err); // Si hay error, rechaza la promesa
        resolve(token); // Si todo bien, resuelve con el token creado
      }
    );
  });
}
