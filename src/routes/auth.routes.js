// importo Routes desde  express para crear un enrutador
import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

// cuando ejecuro Router me devuelve un objero nuevo, a ese objeto lo guardo en una variable
// esto me permite generar peticiones post, put ,delete , get
const router = Router();
//Aquí se van agregando las diferentes rutas de la aplicación
router.post("/register", register);
router.post("/login", login);

export default router;
