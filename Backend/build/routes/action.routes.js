"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const action_controllers_1 = __importDefault(require("../controllers/action.controllers"));
const router = (0, express_1.Router)();
const { getAction, postAction, } = new action_controllers_1.default();
//get action
router.get("/:id", getAction);
router.options("/:id", getAction);
//post action
router.post("/:id", postAction);
exports.default = router;
