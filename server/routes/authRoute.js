import express from 'express';
import { deleteController, getController, loginController, postController, updateController } from '../controllers/routeController.js';

const router = express.Router();
router.get("/",getController);
router.post("/add",postController);
router.post("/login",loginController);
router.put("/update",updateController);
router.delete("/delete",deleteController);

export default router;