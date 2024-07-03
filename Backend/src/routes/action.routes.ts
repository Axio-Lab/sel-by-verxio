import { Router } from "express";
import ActionController from '../controllers/action.controllers';
const router = Router();
const {
    getAction,
    postAction,
} = new ActionController();

//get action
router.get("/:id", getAction);

//post action
router.post("/", postAction);

export default router;