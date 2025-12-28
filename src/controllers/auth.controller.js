// importo el modelo de usuario que cree en user.model.js
import User from "../models/user.model.js";
// modulo que permite encriptar la contraseña
import bcrypt from "bcryptjs";
// importo la función para crear tokens JWT desde libs/jwt.js
import { createAccessToken } from "../libs/jwt.js";

// exporto función de registro hacia auth.routes.js
export const register = async (req, res) => {
  // el request body (son los datos que el usuario envia y esta en formato JSON => clave, valor)
  // extraigo los datos que necesite de req.body (que es un objeto)
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["Este email ya existe"]);
    // hasheo la contraseña con bcrypt para encriptarla antes de guardarla en la DB
    // bcrypt.hash(password, 10) genera un hash seguro con 10 rondas de salting
    const passwordHash = await bcrypt.hash(password, 10);

    // creo un nuevo usuario con la contraseña hasheada
    const newUser = new User({
      username,
      password: passwordHash,
      email,
    });

    // guardo el usuario en la base de datos
    const userSaved = await newUser.save();

    // creo un token JWT con el ID del usuario para autenticación
    const token = await createAccessToken({ id: userSaved._id });

    // envío el token como cookie al cliente
    // las cookies permiten almacenar datos en el navegador del usuario, como tokens de sesión
    // sirven para mantener la autenticación sin necesidad de enviar el token en cada petición manualmente
    res.cookie("token", token);

    // respondo con los datos del usuario (sin la contraseña)
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    // si hay error (ej. email duplicado), respondo con status 500 y el mensaje de error
    res.status(500).json({ message: error.message });
  }
};

// exporto función de login hacia auth.routes.js
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // busco en la base de datos el usuario con su email
    const userFound = await User.findOne({ email });
    // si no lo encuentra, responde con error 400 y mensaje
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });
    // si lo encuentra, compara la contraseña ingresada con la hasheada en la DB usando bcrypt.compare (devuelve true o false)
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    // creo un token JWT con el ID del usuario encontrado
    const token = await createAccessToken({ id: userFound._id });

    // envío el token como cookie al cliente
    // las cookies permiten almacenar datos en el navegador del usuario, como tokens de sesión
    // sirven para mantener la autenticación sin necesidad de enviar el token en cada petición manualmente
    res.cookie("token", token);

    // respondo con los datos del usuario (sin la contraseña)
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    // si hay error, respondo con status 500 y el mensaje de error
    res.status(500).json({ message: error.message });
  }
};

// exporto función de logout hacia auth.routes.js
export const logout = (req, res) => {
  // borro la cookie del token configurándola con un valor vacío y expiración inmediata (fecha 0)
  // esto "cierra la sesión" eliminando el token del navegador del usuario
  res.cookie("token", "", {
    expires: new Date(0),
  });
  // respondo con status 200 (OK) sin contenido
  return res.sendStatus(200);
};

// exporto función de profile hacia auth.routes.js
export const profile = async (req, res) => {
  // busco al usuario en la DB usando el ID que viene del token verificado (req.user.id, agregado por authRequired middleware)
  const userFound = await User.findById(req.user.id);
  // si no encuentra el usuario (por algún error), responde con error 400
  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  // respondo con los datos del usuario (sin contraseña)
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

/*
Este archivo auth.controller.js maneja la lógica de negocio para las rutas de autenticación.
Se lee paso a paso de la siguiente manera:

1. **Imports**:
   - Importo el modelo User para crear y guardar usuarios en la DB.
   - Importo bcrypt para hashear (encriptar) las contraseñas antes de guardarlas y compararlas.
   - Importo createAccessToken para generar tokens JWT de autenticación.

2. **Función register (asíncrona)**:
   - Extrae email, password y username del req.body (datos enviados por el cliente en JSON).
   - Hashea la contraseña con bcrypt.hash() para seguridad (evita guardar contraseñas en texto plano).
   - Crea una nueva instancia de User con los datos, incluyendo la contraseña hasheada.
   - Guarda el usuario en MongoDB con newUser.save().
   - Genera un token JWT con el ID del usuario usando createAccessToken().
   - Envía el token como cookie al cliente con res.cookie() (las cookies almacenan el token en el navegador para sesiones persistentes).
   - Responde con un JSON que incluye los datos del usuario (id, username, email, timestamps), excluyendo la contraseña.
   - Si ocurre un error (ej. validación fallida), captura en catch y responde con error 500.

3. **Función login (asíncrona)**:
   - Extrae email y password del req.body.
   - Busca al usuario en la DB por email usando User.findOne().
   - Si no encuentra el usuario, responde con error 400 "Usuario no encontrado".
   - Si lo encuentra, compara la contraseña ingresada con la hasheada en DB usando bcrypt.compare().
   - Si la contraseña no coincide, responde con error 400 "Contraseña incorrecta".
   - Si coincide, genera un token JWT con el ID del usuario.
   - Envía el token como cookie al cliente.
   - Responde con los datos del usuario en JSON.
   - Maneja errores con try-catch.

4. **Función logout**:
   - Borra la cookie del token configurándola con valor vacío y expiración inmediata (new Date(0)).
   - Esto "cierra la sesión" eliminando el token del navegador.
   - Responde con status 200 (OK).

5. **Función profile (asíncrona)**:
   - Usa req.user.id (proporcionado por el middleware authRequired) para buscar al usuario en la DB.
   - Si no encuentra el usuario, responde con error 400.
   - Responde con los datos del usuario en JSON (sin contraseña).
   - Esta ruta está protegida y requiere un token válido.

Este controlador se importa en auth.routes.js y se asigna a las rutas POST /api/register, /api/login, POST /api/logout y GET /api/profile.
Las cookies sirven para mantener la autenticación del usuario en el frontend sin necesidad de almacenar el token manualmente en localStorage.
*/
