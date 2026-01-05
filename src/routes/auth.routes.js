// importo Routes desde  express para crear un enrutador
import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

// cuando ejecuro Router me devuelve un objero nuevo, a ese objeto lo guardo en una variable
// esto me permite generar peticiones post, put ,delete , get
const router = Router();
//Aquí se van agregando las diferentes rutas de la aplicación
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);

export default router;
