/*
Este archivo validateToken.js contiene middlewares para verificar autenticación.
Los middlewares son funciones que se ejecutan antes de llegar a una ruta, como "guardias" de seguridad.

¿Qué hace authRequired? Verifica si el usuario tiene un token válido en las cookies.
¿Para qué sirve? Protege rutas que requieren login, asegurando que solo usuarios autenticados accedan.
¿Payload en JWT? El token decodificado incluye datos como el ID del usuario, que se agrega a req.user.

TOKEN_SECRET: La clave secreta para verificar el token, debe coincidir con la usada para crearlo.
*/

import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  // obtengo el token de las cookies del navegador
  const { token } = req.cookies;
  // si no hay token, respondo con error 401 (no autorizado)
  if (!token)
    return res
      .status(401)
      .json({ message: "No existe token, autorización denegada" });

  // verifico el token usando jwt.verify con la clave secreta
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    // si hay error (token expirado o inválido), respondo con error 403 (prohibido)
    if (err) return res.status(403).json({ message: "Token inválido" });
    // si es válido, agrego los datos del usuario (del payload) a req.user
    req.user = user;
    // llamo a next() para continuar con la siguiente función (la ruta protegida)
    next();
  });
};
