import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deteleTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post("/tasks", authRequired, createTask);
router.delete("/tasks/:id", authRequired, deteleTask);
router.put("/tasks/:id", authRequired, updateTask);

export default router;
