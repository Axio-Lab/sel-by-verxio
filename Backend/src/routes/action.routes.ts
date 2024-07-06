import { Router } from "express";
import ActionController from '../controllers/action.controllers';
const router = Router();
const {
    getAction,
    postAction,
} = new ActionController();

//get action
router.get("/:id", getAction);
router.options("/:id", getAction);

//post action
router.post("/:id", postAction);

export default router;