import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTask, deleteTask, getAllTask, updateTask } from "../controller/task.controller.js";

const router = Router();

router.get("/" , authMiddleware , getAllTask);
router.post("/" , authMiddleware , createTask);
router.put("/:id" , authMiddleware , updateTask);
router.delete("/:id" , authMiddleware , deleteTask);

export default router;