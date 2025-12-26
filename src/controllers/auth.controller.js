// importo el modelo de usuario que cree en user.model.js
import User from "../models/user.model.js";
// exporto función de registro hacia auth.routes.js
export const register = (req, res) => {
  // el request body (son los datos que el usuario envia y esta en formato JSON => clave, valor)
  // extraigo los datos que necesite de req.body (que es un objeto)
  // creo un nuevo usuario que solo esta guardado en el backen por ahora
  const { email, password, username } = req.body;

  const newUser = new User({
    username,
    password,
    email,
  });
  console.log(newUser);

  res.send("registrando");
};

// exporto función de login hacia auth.routes.js esto se ejecuta cada vez qeu hago una petición en postman o thunder client
export const login = (req, res) => res.send("login");
