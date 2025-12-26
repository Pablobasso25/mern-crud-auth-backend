// importo el modelo de usuario que cree en user.model.js
import User from "../models/user.model.js";
// modulo que permite encriptar la contraseña
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

// exporto función de registro hacia auth.routes.js
export const register = async (req, res) => {
  // el request body (son los datos que el usuario envia y esta en formato JSON => clave, valor)
  // extraigo los datos que necesite de req.body (que es un objeto)
  // creo un nuevo usuario que solo esta guardado en el backen por ahora
  const { email, password, username } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: passwordHash,
      email,
    });

    //una vez creado el usuario en el backend, lo tengo que guardar en la base de datos
    const userSaved = await newUser.save();
    const token = await createAccessToken({id: userSaved._id});
    res.cookie ("token", token);
   
    //ahora le digo que me devuelva solo los datos que necesito en el frontend
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

// exporto función de login hacia auth.routes.js esto se ejecuta cada vez qeu hago una petición en postman o thunder client
export const login = (req, res) => res.send("login");

/*
Este archivo auth.controller.js maneja la lógica  para las rutas de autenticación.
Se lee de la siguiente manera:
1. Primero, importo el modelo User desde user.model.js para poder crear instancias de usuarios.
2. La función register es asíncrona (async) porque interactúa con la base de datos.
   - Extrae los datos (email, password, username) del body de la petición (req.body), que viene en JSON gracias al middleware express.json() en app.js.
   - Crea una nueva instancia de User con esos datos.
   - Guarda el usuario en la base de datos con await newUser.save(), esperando la respuesta.
   - Si todo sale bien, responde con el usuario guardado en formato JSON.
   - Si hay error (ej. email duplicado), lo captura en el catch y lo muestra en consola (por ahora, sin respuesta al cliente).
3. La función login está básica por ahora: solo responde con "login" al hacer una petición POST a /login.
Este controlador se importa en auth.routes.js y se asigna a las rutas correspondientes.
*/
